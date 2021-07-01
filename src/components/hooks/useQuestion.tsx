import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Option, Question, QuestionsCheckedListProps } from "../../assets/types";
import { database } from "../../services/firebase";
import { useAuth } from "./useAuth";

type QuestionProviderProps = { children: ReactNode}

interface QuestionContextProps {
    question: Question,
    answerCheckedList: QuestionsCheckedListProps[],
    getQuestionById: (id: number) =>  void,
    checkAnswer: (question:Question, answer: string) => void,
}

export const QuestionContext = createContext({} as QuestionContextProps);    

export const QuestionProvider = ({children}: QuestionProviderProps) => {
    const { updateGamePointsOfUser, user } = useAuth();
    const [ question, setQuestion ] = useState<Question>({} as Question);
    const [ answerCheckedList, setAnswerCheckedList ] = useState<QuestionsCheckedListProps[]>([])

    useEffect(() => {
        getAnswerListFromUser();
    }, [user])

    async function getAnswerListFromUser(){
        database.ref(`answers/${user?.id}`).on('value', (data) => { 
            const firebaseAnswer:QuestionsCheckedListProps[] = data.val() || [];
            const parsedAnswer = Object.entries(firebaseAnswer).map(([key, value]) => {
                return {
                    idPokemon: value.idPokemon,
                    isCorrect: value.isCorrect
                }
            })
            setAnswerCheckedList(parsedAnswer)
        });
    }

    async function getQuestionById(id: number){
        await database.ref(`lessons/${id}`).once('value', (lesson) => 
            setQuestion(lesson.val())
        )
    }

    function checkAnswer(question:Question, answer: string){
        if(question){
            const result = question.activities.options.find((element:Option) => element.option === answer);
            const idPokemon = question.id;
            const isCorrect = !!result?.isCorrect;
            const points = question.points;

            database.ref(`answers/${user?.id}`).push({idPokemon, isCorrect});
            setAnswerCheckedList([...answerCheckedList, {idPokemon, isCorrect}]);
            updateGamePointsOfUser(points, isCorrect);
        }
    }

    return (
        <QuestionContext.Provider value={{
            question,
            answerCheckedList,
            getQuestionById,
            checkAnswer
        }}>
            {children}
        </QuestionContext.Provider>
    )
}

export const useQuestion = () => useContext(QuestionContext);