import axios from "axios";

//URL DA API:https://api.themoviedb.org/3/
//URL https://api.themoviedb.org/3/movie/now_playing?_key=0837eb79fabcecf3642300c7f8dd820f&language=pt-BR

const api = axios.create(
{

baseURL:'https://api.themoviedb.org/3/'


});

export default api;
