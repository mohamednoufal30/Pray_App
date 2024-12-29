import axios from "axios";
// import { Platform } from "react-native";
// import { NetworkInfo } from 'react-native-network-info';

export const ip='192.168.92.83';

// const localhost=Platform.OS==='android' ? 'http://192.168.97.83:8085' : 'http://localhost:8085';

export const api=axios.create({
    baseURL:'http:localhost:3000',
    timeout:10000,
    headers: {
        'Content-Type': 'application/json',
        },

}

);




// });

export default api;
