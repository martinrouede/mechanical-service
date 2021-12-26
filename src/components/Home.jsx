import { useNavigate } from "react-router-dom";

import { Button } from 'react-bootstrap';

function Home(props) {
    const navigate = useNavigate();

    const listClient = () => {
        navigate(`/cliente/lista/`);
    };

    const listService = () => {
        navigate(`/servicio/lista/`);
    };

    return (
        <div className="home">
            <Button variant="primary" onClick={listClient}>Clientes</Button>
            <Button variant="primary" onClick={listService}>Servicios</Button>
        </div>
    );
}

export default Home;
