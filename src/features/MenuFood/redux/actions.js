import { ALL_MENUFOOD, ALL_FOODTYPE } from './constants';

export const AllMenuFood = (data) => ({
    type: ALL_MENUFOOD,
    json: data
});

export const AllFoodType = (data) => ({
    type: ALL_FOODTYPE,
    json: data
});

