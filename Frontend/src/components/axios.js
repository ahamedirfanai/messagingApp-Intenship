import axios from 'axios';

const instance = axios.create({
    baseURL: "https://messaging-app-intenship-2k2p.vercel.app/",
    // Remove the httpsAgent configuration
});


export default instance;
