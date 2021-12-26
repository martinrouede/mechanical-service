import './styles/main.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import ListClient from './components/client/ListClient';
import FormClient from './components/client/FormClient';
import ListService from './components/service/ListService';
import FormService from './components/service/FormService';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cliente/lista/" element={<ListClient />} />
          <Route path="/cliente/nuevo/" element={<FormClient />} />
          <Route path="/cliente/editar/:id" element={<FormClient />} />
          <Route path="/servicio/lista/" element={<ListService />} />
          <Route path="/servicio/nuevo/" element={<FormService />} />
          <Route path="/servicio/editar/:id" element={<FormService />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
