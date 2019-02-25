import { SEAECH_TRICKALL, SEAECH_TRICKNEW, SEAECH_TRICKRANK } from './constants'

export const seaech_TrickAll = (data) => ({
    type: SEAECH_TRICKALL,
    json: data
});

export const seaech_TrickNew = (data) => ({
    type: SEAECH_TRICKNEW,
    json: data
});

export const seaech_TrickRank = (data) => ({
    type: SEAECH_TRICKRANK,
    json: data
});


