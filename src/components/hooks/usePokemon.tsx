import axios from "axios";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

import { Pokemon, Question } from '../../assets/types'
import { database } from "../../services/firebase";

type PokemonProvidersProps = {
    children: ReactNode;
}

interface PokemonContextData {
    pokemons: Pokemon[];
}

export const PokemonContext = createContext({} as PokemonContextData);

export const PokemonProvider = ({children}:PokemonProvidersProps) => {
    const [questions, setQuestions] = useState([] as Question[]);
    const [pokemons, setPokemons] = useState([] as Pokemon[]);

    useEffect(() => {        
        loadQuestionsList();
        loadPokemonsList();
    }, [])

    function loadQuestionsList(){
        database.ref(`lessons`).on('value', (lesson) => {
            setQuestions(shuffle(lesson.val()))
        })
    }

    async function loadPokemonsList(){
        
        let list = [] as Pokemon[];
        for(let count = 0; count < 50; count++ ){
            await axios.get(`https://pokeapi.co/api/v2/pokemon/${count+1}/`)
            .then(response => response.data)
            .then(data => {
                list.push({                       
                    id: data.id,
                    name: data.name,
                    image: data.sprites.other['dream_world']['front_default'],
                    type: data.types[0].type.name,
                    weight: data.weight,
                    hp: data.stats[0]['base_stat'],
                    attack: data.stats[1]['base_stat'],
                    defense: data.stats[2]['base_stat'],
                    question: questions && questions[count+1]
                })
            })             
        }
        setPokemons(shuffle(list).slice(0, 15))
    }

    function shuffle(array: Array<any>) {
        let copy = [];
        let n = array.length; 
        let i = 0;
      
        while (n) {  
          i = Math.floor(Math.random() * array.length);  
          if (i in array) {
            copy.push(array[i]);
            delete array[i];
            n--;
          }
        }  
        return copy;
    }

    return (
        <PokemonContext.Provider value={{
            pokemons,
        }}>
            {children}
        </PokemonContext.Provider>
    )
}

export const usePokemon = () => useContext(PokemonContext)
