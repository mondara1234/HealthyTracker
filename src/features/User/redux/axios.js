import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost/My_SQL/ShowAllDataList.php',
    headers: {
        headerType: 'example header type'
    }
});

export default instance;