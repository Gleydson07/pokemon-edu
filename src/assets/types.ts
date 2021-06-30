export type UserAnswer = {
    id: number; 
    name: string;
    image: string;
    points: number;
    isCorrect: boolean;
} | undefined;

export type Option = {
    option: string,
    isCorrect: boolean
}


export type Activities = {
    enunciation: string;
    question: string;
    options: [
        {
            option: string,
            isCorrect: boolean
        }
    ]    
};

export type Question = {
    id: number;
    points: number;
    fase: number;
    matter: string;
    matterShow: string;
    activities: Activities;    
}

export type Pokemon = {
    id: number;
    name: string;
    image: string;
    type: string;
    weight: number;
    hp: number;
    attack: number;
    defense: number;
}

///           USER           ///

export type User = {
    id: string;
    name: string;
    avatar: string;
    points: number;
    life: number;
    pokemons?: number[];
}