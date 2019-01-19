import exerciseScreen from "./screen/exerciseScreen";
import DetailExerciseScreen from "./screen/DetailExerciseScreen";

export const EXERCISE_SCREEN = 'EXERCISE_SCREEN';
export const DETAILEXERCISE_SCREEN = 'DETAILEXERCISE_SCREEN';

export const exerciseRouter = {
    [EXERCISE_SCREEN]: {
        screen: exerciseScreen
    },
    [DETAILEXERCISE_SCREEN]: {
        screen: DetailExerciseScreen
    }
};