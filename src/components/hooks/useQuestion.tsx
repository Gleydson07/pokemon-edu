import { createContext, ReactNode, useContext, useState } from "react";
import { Option, Question } from "../../assets/types";
import { database } from "../../services/firebase";
import { useAuth } from "./useAuth";

type QuestionProviderProps = { children: ReactNode}

interface QuestionContextProps {
    question: Question,
    getQuestionById: (id: number) =>  void,
    checkAnswer: (question:Question, answer: string) => void
}

export const QuestionContext = createContext({} as QuestionContextProps);    

export const QuestionProvider = ({children}: QuestionProviderProps) => {
    const { updateGamePointsOfUser } = useAuth();
    const [ question, setQuestion ] = useState<Question>({} as Question);

    async function getQuestionById(id: number){
        await database.ref(`lessons/${id}`).once('value', (lesson) => 
            setQuestion(lesson.val())
        )
    }

    function checkAnswer(question:Question, answer: string){
        if(question){
            const response = question.activities.options.find((element:Option) => element.option === answer);
            const isCorrect = !!response?.isCorrect;
            const points = question.points; 

            updateGamePointsOfUser(points, isCorrect);
        }
    }

    return (
        <QuestionContext.Provider value={{
            question,
            getQuestionById,
            checkAnswer
        }}>
            {children}
        </QuestionContext.Provider>
    )
}

export const useQuestion = () => useContext(QuestionContext);