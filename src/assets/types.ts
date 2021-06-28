// export type Activities = {
//     enunciation: string;
//     question: string;
//     options: [
//         {
//             option: string,
//             isCorrect: boolean
//         }
//     ]
    
// };

// export type UserAnswer = {
//     id: number; 
//     show: boolean; 
//     isCorrect: boolean
// }

// export type Question = {
//     id: number;
//     points: number;
//     fase: number;
//     matter: string;
//     matterShow: string;
//     activities: Activities;    
// }

// export type Pokemon = {
//     id: number;
//     name: string;
//     image: string;
//     type: string;
//     weight: number;
//     hp: number;
//     attack: number;
//     defense: number;
//     question: Question;
// }

///           USER           ///

export type UserAuth = {
    id: string;
    name: string;
    avatar: string;
}

export type User = {
    id: string;
    name: string | null;
    avatar: string | null;
    points: number;
    life: number;
    pokemons?: number[];
}