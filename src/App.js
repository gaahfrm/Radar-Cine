import RouteApp
 from './router';
import './App.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <ToastContainer autoClose={3000}/>
    
  <RouteApp/>
    </div>
  );
}

export default App;
