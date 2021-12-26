import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { dateFormat, newDate } from '../../services/date';

import { Button, Form } from 'react-bootstrap';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

function NewService(props) {
    const navigate = useNavigate();
    const params = useParams();

    const [date, setDate] = useState(newDate());
    const [client, setClient] = useState([]);
    const [repair, setRepair] = useState('');
    const [amount, setAmount] = useState(0);
    const [carKilometersUpdated, setCarKilometersUpdated] = useState(0);

    let carKilometers;

    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3000/customers`).then((response) => {
            setCustomers(response.data);
        });
        if (params.id) {
            axios.get(`http://localhost:3000/services/${params.id}?_expand=customers`).then((response) => {
                const service = response.data;
                setDate(newDate(service.date));
                setClient(service.customers);
                setRepair(service.repair);
                setAmount(service.amount);
                carKilometers = service.customers.carKilometers;
                setCarKilometersUpdated(service.customers.carKilometers);
            });
        }
    }, [])

    const removeClientData = () => {
        setClient({ carModel: "", carPatent: "", carKilometers: 0 });
        setCarKilometersUpdated(0);
    }

    const completeClientData = (clientData) => {
        const data = clientData[0];
        if (data) {
            setClient(data);
            setCarKilometersUpdated(data.carKilometers);
        }
    }

    const submit = () => {
        if (carKilometers !== carKilometersUpdated) {
            axios.put(`http://localhost:3000/customers/${client.id}`, {
                name: client.name,
                carModel: client.carModel,
                carPatent: client.carPatent,
                carKilometers: Number(carKilometersUpdated)
            }).then((response) => {
                console.log(response);
            });
        }

        if (params.id) {
            axios.put(`http://localhost:3000/services/${params.id}`, {
                customersId: client.id,
                date: newDate(date),
                repair: repair,
                amount: Number(amount)
            }).then((response) => {
                console.log(response);
            });
        }
        else {
            axios.post(`http://localhost:3000/services`, {
                customersId: client.id,
                date: newDate(date),
                repair: repair,
                amount: Number(amount)
            }).then((response) => {
                console.log(response);
            });
        }
    }

    const goBack = () => {
        navigate(`/servicio/lista/`);
    }

    return (
        <>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicDate">
                    <Form.Label>Fecha</Form.Label>
                    <DatePicker
                        selected={date}
                        onChange={(e) => setDate(e)}
                        dateFormat='dd/MM/yyyy'
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicClient">
                    <Form.Label>Cliente</Form.Label>
                    <Typeahead
                        id="basic-example"
                        emptyLabel="Sin resultados"
                        labelKey={option => `${option.name}`}
                        placeholder={client.name}
                        onInputChange={removeClientData}
                        onChange={(e) => completeClientData(e)}
                        options={customers}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCarModel">
                    <Form.Label>Marca Auto</Form.Label>
                    <Form.Control
                        type="text"
                        disabled
                        value={client.carModel}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCarPatent">
                    <Form.Label>Patente</Form.Label>
                    <Form.Control
                        type="text"
                        disabled
                        value={client.carPatent}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCarKilometers">
                    <Form.Label>Kilometraje</Form.Label>
                    <Form.Control
                        type="number"
                        onChange={(e) => setCarKilometersUpdated(e.target.value)}
                        value={carKilometersUpdated}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicRepair">
                    <Form.Label>Reparacion</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={1}
                        onChange={(e) => setRepair(e.target.value)}
                        value={repair}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicAmount">
                    <Form.Label>Monto</Form.Label>
                    <Form.Control
                        type="number"
                        onChange={(e) => setAmount(e.target.value)}
                        value={amount}
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

export default NewService;
