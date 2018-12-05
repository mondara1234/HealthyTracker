import { NavigationActions } from 'react-navigation';
import { RootNavigator } from '../../../common/rootNavigation';

const initialState = {
    nav: RootNavigator.router.getStateForAction(NavigationActions.navigate({})),
};

export default initialState;
