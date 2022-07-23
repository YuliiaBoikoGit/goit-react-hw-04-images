import axios from "axios";

axios.defaults.baseURL = 'https://pixabay.com/api/';

const API_KEY = '27533830-30fc9ccf4273747a8d0d8a9f2';

export const fetchImages = async (query, page) => {
    const res = await axios.get(`https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`);

    return res.data;
};