import { createContext, ReactNode, useContext, useState } from "react";
import { Option, Question } from "../../assets/types";
import { database } from "../../services/firebase";
import { useAuth } from "./useAuth";

type QuestionProvider = { children: ReactNode}

interface QuestionContextProps {
    question: Question,
    getQuestionById: (id: number) =>  void,
    checkAnswer: (question:Question, answer: string) => void
}

export const QuestionContext = createContext({} as QuestionContextProps);    

export const QuestionProvider = ({children}: QuestionProvider) => {
    const { updateGamePointsOfUser } = useAuth();
    const [ question, setQuestion ] = useState<Question>({} as Question);

    function getQuestionById(id: number){
        database.ref(`lessons/${id}`).once('value', (lesson) => 
            setQuestion(lesson.val())
        )
    }

    function checkAnswer(question:Question, answer: string){
        if(question){
            const response = question.activities.options.find((element:Option) => element.option === answer);
            const isCorrect = !!response?.isCorrect;
            const points = question.points; 

            console.log(isCorrect)
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