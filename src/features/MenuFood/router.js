import menuFoodScreen from "./screen/MenuFoodScreen";
import FoodTypeScreen from "./screen/FoodTypeScreen";
import FoodSearchScreen from "./screen/FoodSearchScreen";
import FoodDetailScreen from "./screen/FoodDetailScreen"

export const MENUFOOD_SCREEN = 'MENUFOOD_SCREEN';
export const FOODSEARCH_SCREEN = 'FOODSEARCH_SCREEN';
export const FOODSTYPE_SCREEN = 'FOODSTYPE_SCREEN';
export const FOODDETAIL_SCREEN = 'FOODDETAIL_SCREEN';

export const menuFoodRouter = {
    [MENUFOOD_SCREEN]: {
        screen: menuFoodScreen
    },
    [FOODSEARCH_SCREEN]: {
        screen: FoodSearchScreen
    },
    [FOODSTYPE_SCREEN]: {
        screen: FoodTypeScreen
    },
    [FOODDETAIL_SCREEN]: {
        screen: FoodDetailScreen
    }
};
