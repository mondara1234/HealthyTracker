import { SEARCH_ALLFODEUSER, SEARCH_FODEUSER, ALL_METABOLIC } from './constants';

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

