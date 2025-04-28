import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import "./comedia.css";

function Comedia() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarFilmes() {
      try {
        let filmesTemp = [];
        for (let page = 1; page <= 10; page++) {
          const response = await api.get("/discover/movie", {
            params: {
              api_key: "0837eb79fabcecf3642300c7f8dd820f",
              with_genres: 35, // Gênero: Comédia
              language: "pt-BR",
              page: page,
            },
          });
          filmesTemp = [...filmesTemp, ...response.data.results];
        }
        setFilmes(filmesTemp);
      } catch (error) {
        console.error("Erro ao carregar filmes de comédia:", error);
      } finally {
        setLoading(false);
      }
    }

    carregarFilmes();
  }, []);

  if (loading) {
    return <div className="carregando">Carregando filmes de comédia...</div>;
  }

  return (
    <div className="pagina-comedia">
    <h1>Filmes de Comédia</h1>
    <div className="lista-comedia">
      {filmes.map((filme) => (
        <div className="card-filme" key={filme.id}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${filme.poster_path}`}
            alt={filme.title}
          />
          <h4>{filme.title}</h4>
          <Link to={`/filme/${filme.id}`}>
            <div className="detalhes">Ver Detalhes</div>
          </Link>
        </div>
      ))}
    </div>
  </div>
  );
}

export default Comedia;
