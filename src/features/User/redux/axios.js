import axios from 'axios';
import { URL_DATABASE } from "../../../common/constants"

const instance = axios.create({
    baseURL: `${URL_DATABASE}/My_SQL/ShowAllDataList.php`,
    headers: {
        headerType: 'example header type'
    }
});

export default instance;