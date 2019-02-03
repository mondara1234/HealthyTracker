import {StyleSheet} from "react-native";
import ProfileScreen from "../../ProfileUser/screen/ProfileScreen";


const styles = StyleSheet.create({
    containeCard: {
        marginTop: 20,
        marginLeft: 5,
        marginRight: 5
    },
    bodyCard: {
        margin: -10,
        marginTop: 1
    },
    fontTitleName: {
        fontSize: 16,
        color: '#020202',
        marginTop: 3,
        fontWeight: 'bold'
    },
    containerHeart: {
        width: '100%',
        height: 35,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        marginBottom: 2
    },
    sizeHeart: {
        marginHorizontal: 5,
        width: 30,
        height: 25
    },
    containerCardTwo: {
        marginLeft: 10,
        marginRight: 10
    },
    viewHeartTwo: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    containeCardALL: {
        flex: 1,
        width: '93%',
        marginLeft: 10
    },
    containerFlasList: {
        flex: 1,
        width: '100%'
    },
    containerFlasListTwo: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
});