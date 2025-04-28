import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import './filmes-info.css';
import { toast } from "react-toastify";

function Filmes() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() =>
    async function loadFilme() {
      await api.get(`/movie/${id}`, {
        params: {
          api_key: "0837eb79fabcecf3642300c7f8dd820f",
          language: "pt-BR",
        }
      })
        .then((response) => {
          setFilme(response.data);
          setLoading(false);
        })
        .catch(() => {
          console.log("FILME NÃO ENCONTRADO");
          navigate("/", { replace: true });
          return;
        });

      return () => {
        console.log("COMPONENTE FOI DESMONTADO");
      };
    }, [navigate, id]
  );

  function salvarFilmes() {
    const minhaLista = localStorage.getItem("@filmeflix");
    let filmesSalvos = JSON.parse(minhaLista) || [];

    const hasFilme = filmesSalvos.some((filmesSalvo) => filmesSalvo.id === filme.id);

    if (hasFilme) {
      toast.warn("ESSE FILME JÁ ESTÁ NA LISTA");
      return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem("@filmeflix", JSON.stringify(filmesSalvos));
    toast.success("Filme salvo com sucesso");
  }

  // Função para salvar a posição de rolagem ao acessar a página de detalhes
  const saveScrollPosition = () => {
    const scrollPosition = window.scrollY;
    sessionStorage.setItem("scrollPosition", scrollPosition); // Salva a posição de rolagem
  };

  // Função para restaurar a rolagem ao voltar
  const restoreScrollPosition = () => {
    const savedPosition = sessionStorage.getItem("scrollPosition");
    if (savedPosition) {
      window.scrollTo(0, savedPosition); // Restaura a posição de rolagem
      sessionStorage.removeItem("scrollPosition"); // Limpa a posição salva
    }
  };

  // Ao clicar no botão de voltar
  const handleVoltar = () => {
    // Restaurando a rolagem ao voltar
    restoreScrollPosition();

    if (window.history.length > 2) {
      navigate(-1); // Volta para a página anterior
    } else {
      navigate('/'); // Caso contrário, vai para a página inicial
    }
  };

  useEffect(() => {
    // Salva a posição de rolagem ao acessar a página
    saveScrollPosition();

    // Se a posição de rolagem estiver salva, restaura ao carregar a página
    restoreScrollPosition();
  }, []);

  if (loading) {
    return (
      <div className="filme-info">
        <h1>Carregando detalhes...</h1>
      </div>
    );
  }

  return (
    <div className="filme-info">
      <button
        className="botao-voltar"
        onClick={handleVoltar} 
      >
        ⬅ Voltar
      </button>

      <h1>{filme.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
        alt={filme.title}
      />
      <h3>Sinopse</h3>
      <span>{filme.overview}</span>
      <strong>🌟 Avaliação: {filme.vote_average} / 10</strong>

      <div className="area-buttons">
        <button onClick={salvarFilmes}>Salvar</button>
        <button>
          <a
            target="_blank"
            rel="external"
            href={`https://youtube.com/results?search_query=${filme.title} Trailer`}
          >
            Trailer
          </a>
        </button>
      </div>
    </div>
  );
}

export default Filmes;
