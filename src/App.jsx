import './styles/main.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ListService from './components/service/ListService';
import FormService from './components/service/FormService';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ListService />} />
          <Route path="/servicio/lista/" element={<ListService />} />
          <Route path="/servicio/nuevo/" element={<FormService />} />
          <Route path="/servicio/editar/:id" element={<FormService />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
