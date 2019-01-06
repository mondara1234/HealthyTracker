import { SEARCH_ALLFODEUSER, SEARCH_FODEUSER, ONE_FODEUSER } from './constants';

export const AllFoodUser = () => ({
    type: SEARCH_ALLFODEUSER
});

export const getSearchFoofUser = (data) => ({
    type: SEARCH_FODEUSER,
    payload: data
});

export const getOneFoodUser = (data) => ({
    type: ONE_FODEUSER,
    json: data
});
