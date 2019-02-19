import { SEARCH_ALLFODEUSER, SEARCH_FODEUSER, ALL_METABOLIC, CALORIE_CHECK } from './constants';

export const AllFoodUser = (data) => ({
    type: SEARCH_ALLFODEUSER,
    json: data
});

export const AllMetabolic = (data) => ({
    type: ALL_METABOLIC,
    payload: data
});

export const getSearchFoodUser = (data) => ({
    type: SEARCH_FODEUSER,
    payload: data
});

export const getCalorieCheck = (data) => ({
    type: CALORIE_CHECK,
    payload: data
});

