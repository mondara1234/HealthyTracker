import { SEARCH_ALLFODEUSER, SEARCH_FODEUSER, ONE_FODEUSER } from './constants';

export const AllFoodUser = (data) => ({
    type: SEARCH_ALLFODEUSER,
    json: data
});

export const getSearchFoodUser = (data) => ({
    type: SEARCH_FODEUSER,
    payload: data
});

