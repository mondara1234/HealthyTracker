import TrickScreen from "./screen/TrickScreen";
import DetailTrickScreen from "./screen/DetailTrickScreen";
import AllTab from "./screen/Tab/AllTab";
import NewTab from "./screen/Tab/NewTab";
import RankTab from "./screen/Tab/RankTab";

export const TRICK_SCREEN = 'TRICK_SCREEN';
export const DETAILTRICK_SCREEN = 'DETAILTRICK_SCREEN';
export const ALLTAB = 'ALLTAB';
export const NEWTAB = 'NEWTAB';
export const RANKTAB = 'RANKTAB';

export const trickRouter = {
    [TRICK_SCREEN]: {
        screen: TrickScreen
    },
    [DETAILTRICK_SCREEN]: {
        screen: DetailTrickScreen
    },
    [ALLTAB]: {
        screen: AllTab
    },
    [NEWTAB]: {
        screen: NewTab
    },
    [RANKTAB]: {
        screen: RankTab
    }
};
