import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import { Button, Table } from 'react-bootstrap';
import './client.css';
import '../../styles/main.css';

import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

function Search(props) {
    const navigate = useNavigate();

    const [client, setClient] = useState([]);
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3000/customers`).then((response) => {
            setCustomers(response.data);
        });
    }, [])

    const handleClient = (clientData) => {
        const data = clientData[0];
        if (data) {
            setClient(data);
        }
    }

    const search = () => {
        let filterClient = "";
        if (client.name) {
            filterClient = `?name=${client.name}`;
        }
        axios.get(`http://localhost:3000/customers` + filterClient).then((response) => {
            setCustomers(response.data);
        });
    };

    const edit = (id) => {
        navigate(`/cliente/editar/${id}`);
    }

    const newClient = () => {
        navigate(`/cliente/nuevo/`);
    }

    const remove = (id) => {
        axios.delete(`http://localhost:3000/customers/${id}`).then((response) => {
            console.log(response);
            axios.get(`http://localhost:3000/customers`).then((res) => {
                setCustomers(res.data);
            });
        });
    }

    const removeClientData = () => {
        setClient([]);
    }

    const goBack = () => {
        navigate(`/`);
    }

    return (
        <>
            <div className="header-client">
                <div className="header-typeahead">
                    <Typeahead
                        id="basic-example"
                        labelKey={option => `${option.name}`}
                        onInputChange={removeClientData}
                        onChange={handleClient}
                        options={customers}
                    />
                    <Button variant="primary" onClick={search}>
                        Buscar
                    </Button>
                </div>
                <Button variant="primary" onClick={newClient}>
                    Nuevo Cliente
                </Button>
            </div>
            <div className="table">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Cliente</th>
                            <th>Auto</th>
                            <th>Patente</th>
                            <th>Kilometraje</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map(e => (
                            <tr>
                                <td>{e.name}</td>
                                <td>{e.carModel}</td>
                                <td>{e.carPatent}</td>
                                <td>{e.carKilometers}</td>
                                <td className="table-button"><Button onClick={() => edit(e.id)}>Editar</Button></td>
                                <td className="table-button"><Button onClick={() => remove(e.id)}>Eliminar</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <Button variant="outline-primary" onClick={goBack}>
                Volver
            </Button>
        </>
    );
}

export default Search;
