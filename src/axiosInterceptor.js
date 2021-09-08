import Axios from 'axios';

const instance = Axios.create({
    baseURL: 'http://localhost:3000/api/syllabus/'
});
const token = sessionStorage.getItem("token");
instance.defaults.headers.common['Authorization'] = token;

export default instance;