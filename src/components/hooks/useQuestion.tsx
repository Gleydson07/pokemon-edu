import { createContext, ReactNode, useContext, useState } from "react";
import { Question } from "../../assets/types";
import { database } from "../../services/firebase";

type QuestionProvider = { children: ReactNode}

interface QuestionContextProps {
    question: Question,
    getQuestionById: (id: number) =>  void
}

export const QuestionContext = createContext({} as QuestionContextProps);    

export const QuestionProvider = ({children}: QuestionProvider) => {
    const [ question, setQuestion ] = useState<Question>({} as Question)

    function getQuestionById(id: number){
        database.ref(`lessons/${id}`).once('value', (lesson) => 
            setQuestion(lesson.val())
        )
    }

    return (
        <QuestionContext.Provider value={{
            question,
            getQuestionById
        }}>
            {children}
        </QuestionContext.Provider>
    )
}

export const useQuestion = () => useContext(QuestionContext);