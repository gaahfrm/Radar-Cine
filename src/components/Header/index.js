import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './header.css';

function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const toggleSearch = () => {
    setShowSearch(prevState => !prevState);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/busca/${searchTerm}`); // Redireciona para a página de busca com o termo pesquisado
      setShowSearch(false);  // Esconde o campo de pesquisa após a pesquisa ser feita
      setSearchTerm(''); // Limpa o campo de pesquisa
    }
  };

  return (
    <header>
      <div className="logo">
        <Link to="/">Radar Cine</Link>
      </div>

      <div className="header-nav">
        <Link to="/favoritos" className="favoritos">Meus Filmes</Link>

        <div className="dropdown">
          <button className="dropdown-btn">Gêneros</button>
          <div className="dropdown-content">
          <Link to="/acao">Ação</Link>
          <Link to="/animacao">Animação</Link>
          <Link to="/comedia">Comédia</Link>
          <Link to="/drama">Drama</Link>
          <Link to="/romance">Romance</Link>
          <Link to="/suspense">Suspense</Link>
          <Link to="/terror">Terror</Link>
          </div>
        </div>

        <button className="search-toggle-btn" onClick={toggleSearch}>
          Buscar
        </button>
      </div>

      {/* Apenas exibe a pesquisa se a flag 'showSearch' for verdadeira */}
      <div className={`search-form ${showSearch ? 'show' : ''}`}>
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Buscar filmes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Buscar</button>
        </form>
      </div>
    </header>
  );
}

export default Header;
