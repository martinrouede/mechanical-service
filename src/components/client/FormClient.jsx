import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

import { Button, Form } from 'react-bootstrap';

function NewClient(props) {
    const navigate = useNavigate();
    const params = useParams();

    const [clientName, setClientName] = useState('');
    const [carModel, setCarModel] = useState('');
    const [carPatent, setCarPatent] = useState('');
    const [carKilometers, setCarKilometers] = useState(0);

    useEffect(() => {
        if (params.id) {
            axios.get(`http://localhost:3000/customers/${params.id}`).then((response) => {
                const client = response.data;
                setClientName(client.name);
                setCarModel(client.carModel);
                setCarPatent(client.carPatent);
                setCarKilometers(client.carKilometers);
            });
        }
    }, [])


    const submit = () => {
        if (params.id) {
            axios.put(`http://localhost:3000/customers/${params.id}`, {
                name: clientName,
                carModel: carModel,
                carPatent: carPatent,
                carKilometers: Number(carKilometers)
            }).then((response) => {
                console.log(response);
            });
        }
        else {
            axios.post(`http://localhost:3000/customers/`, {
                name: clientName,
                carModel: carModel,
                carPatent: carPatent,
                carKilometers: Number(carKilometers)
            }).then((response) => {
                console.log(response);
            });
        }
    }

    const goBack = () => {
        navigate(`/cliente/lista/`);
    }

    return (
        <>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicClient">
                    <Form.Label>Cliente</Form.Label>
                    <Form.Control
                        type="text"
                        onChange={(e) => setClientName(e.target.value)}
                        value={clientName}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCarModel">
                    <Form.Label>Marca Auto</Form.Label>
                    <Form.Control
                        type="text"
                        onChange={(e) => setCarModel(e.target.value)}
                        value={carModel}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCarPatent">
                    <Form.Label>Patente</Form.Label>
                    <Form.Control
                        type="text"
                        onChange={(e) => setCarPatent(e.target.value)}
                        value={carPatent}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCarKilometers">
                    <Form.Label>Kilometraje</Form.Label>
                    <Form.Control
                        type="number"
                        onChange={(e) => setCarKilometers(e.target.value)}
                        value={carKilometers}
                    />
                </Form.Group>
            </Form>
            <div className="button-container">
                <Button variant="outline-primary" onClick={goBack}>
                    Volver
                </Button>
                <Button variant="primary" onClick={submit}>
                    Guardar
                </Button>
            </div>
        </>
    );
}

export default NewClient;
