import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';  // Certifique-se de que o caminho está correto
import './home.css';

function Home() {
  const [filmes, setFilmes] = useState([]);
  const [generos, setGeneros] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      const responseGeneros = await api.get("genre/movie/list", {
        params: {
          api_key: "0837eb79fabcecf3642300c7f8dd820f",
          language: "pt-BR",
        },
      });

      const mapaGeneros = {};
      responseGeneros.data.genres.forEach((genero) => {
        mapaGeneros[genero.id] = genero.name;
      });
      setGeneros(mapaGeneros);

      const responseFilmes = await api.get("/trending/movie/day", {
        params: {
          api_key: "0837eb79fabcecf3642300c7f8dd820f",
          language: "pt-BR",
          page: 1,
        },
      });

      setFilmes(responseFilmes.data.results.slice(0, 20));
      setLoading(false);
    }

    carregarDados();
  }, []);

  // Função para salvar a posição do scroll
  const handleMovieClick = () => {
    const scrollPosition = window.scrollY;
    localStorage.setItem('scrollPosition', scrollPosition);
  };

  if (loading) {
    return (
      <div>
        <h2 className='loading'>Carregando filmes...</h2>
      </div>
    );
  }

  return (
    <div className='container'>
      <h1 className='titulo'>TOP 20🎥
      </h1>
      <div className='lista-filmes'>
        {filmes.map((filme) => (
          <article key={filme.id}>
            <strong>{filme.title}</strong>
            <p className='generos'>
              {filme.genre_ids.map((id, index) => (
                <span key={id}>
                  {generos[id]}
                  {index < filme.genre_ids.length - 1 && ', '}
                </span>
              ))}
            </p>
            <img
              src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
              alt={filme.title}
            />
            <Link to={`/filme/${filme.id}`} onClick={handleMovieClick}>
              Acessar
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Home;
