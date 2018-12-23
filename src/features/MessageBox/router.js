import messageBoxScreen from "./screen/messageBoxScreen";
import messageDetailScreen from "./screen/messageDetailScreen";

export const MESSAGEBOX_SCREEN = 'MESSAGEBOX_SCREEN';
export const MESSAGEDETAIL_SCREEN = 'MESSAGEDETAIL_SCREEN';

export const messageboxRouter = {
    [MESSAGEBOX_SCREEN]: {
        screen: messageBoxScreen
    },
    [MESSAGEDETAIL_SCREEN]: {
        screen: messageDetailScreen
    }
};
