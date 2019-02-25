import foodDiaryScreen from "./screen/foodDiaryScreen";
import metabolic_ListScreen from "./screen/metabolicListScreen";

export const FOODDIARY_SCREEN = 'FOODDIARY_SCREEN';
export const METABOLIC_SCREEN = 'METABOLIC_SCREEN';

export const foodDiaryRouter = {
    [FOODDIARY_SCREEN]: {
        screen: foodDiaryScreen
    },
    [METABOLIC_SCREEN]: {
        screen: metabolic_ListScreen
    }
};
