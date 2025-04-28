import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from  './pages/Home';
import Filmes from './pages/Filmes';
import Favoritos from "./pages/Favoritos";
import Header from './components/Header';
import Erro from './pages/Erro';
import Acao from "./pages/Acao";
import Terror from './pages/Terror';
import Suspense from './pages/Suspense';
import Comedia from './pages/Comedia'; 
import Animacao from "./pages/Animacao"; 
import Romance from "./pages/Romance"; 
import Drama from "./pages/Drama"; 
import Busca from "./pages/Busca";

function RouteApp(){

    return(
<BrowserRouter>
<Header/>
<Routes>
<Route path="/busca/:termo" element={<Busca />} />
<Route path="/romance" element={<Romance />} />
<Route path="/drama" element={<Drama />} />

<Route path="/acao" element={<Acao />} />
<Route path="/terror" element={<Terror />} />
<Route path="/suspense" element={<Suspense />} />
<Route path="/comedia" element={<Comedia />} />
<Route path="/animacao" element={<Animacao />} />

<Route path="/" element={ <Home/>}/>
<Route path="/filme/:id" element={<Filmes/>} />
<Route path="/favoritos" element={ <Favoritos/>} />
<Route path="*" element={ <Erro/>  } />
</Routes>


</BrowserRouter>

    )


}

export default RouteApp;