import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../services/api';
import './busca.css';
import { useNavigate } from 'react-router-dom';




function Busca() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { termo } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (termo) {
      setSearchTerm(termo);
      buscarFilmes(termo);
    }
  }, [termo]);

  const buscarFilmes = async (query) => {
    setLoading(true);
    try {
      const response = await api.get('/search/movie', {
        params: {
          api_key: '0837eb79fabcecf3642300c7f8dd820f',
          query: query,
          language: 'pt-BR',
        },
      });
      setFilmes(response.data.results);
    } catch (error) {
      console.error('Erro ao buscar filmes:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pagina-busca">
      <h1>Resultados para: {searchTerm}</h1>

      <form
        className="formulario-busca"
        onSubmit={(e) => {
          e.preventDefault();
          buscarFilmes(searchTerm);
        }}
      >
        <input
          type="text"
          placeholder="Buscar filme ou gênero..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      {loading ? (
        <p>Carregando...</p>
      ) : filmes.length > 0 ? (
        <div className="container-cards">
          {filmes.map((filme) => (
            <div className="card-filme-item" src="filmes" key={filme.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${filme.poster_path}`}
                alt={filme.title}
              />
              <h4>{filme.title}</h4>
              <Link target="_blank" rel="external" className='detalhes' to={`/filme/${filme.id}`}>
              <div className="detalhes">Ver Detalhes</div>
            </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>Nenhum filme encontrado.</p>
      )}
    </div>
  );
}

export default Busca;
