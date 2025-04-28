import { useEffect, useState } from 'react';
import './favoritos.css';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';

function Favoritos(){
  const [filmes, setFilmes] = useState([])

  useEffect(()=>{
    const minhaLista = localStorage.getItem("@filmeflix");
    setFilmes(JSON.parse(minhaLista) || [])
  }, [])

  function excluirFilme(id) {
    let filtroFilmes = filmes.filter((item) => item.id !== id); // remove o item da lista
    
    
    setFilmes(filtroFilmes); // atualiza o state
    localStorage.setItem("@filmeflix", JSON.stringify(filtroFilmes))
toast.success("Filme removido com sucesso")
  }

  return(
    <div className="meus-filmes">
      <h1>Meus filmes</h1>

      {filmes.length === 0 && <span>Você não possui nenhum filme salvo 😢</span>}

      <ul>
        {filmes.map((item) => {
          return(
            <li key={item.id}>
              <span>{item.title}</span>

              <div>
                <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                <button onClick={() => excluirFilme(item.id)}>Excluir</button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Favoritos;
