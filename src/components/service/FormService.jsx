import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { dateFormat, newDate } from '../../services/date';
import FormClient from '../client/FormClient';
import { filterDuplicates } from '../../services/utils';

import { Button, Form } from 'react-bootstrap';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

const NewService = (props) => {
    const navigate = useNavigate();
    const params = useParams();

    const [client, setClient] = useState([]);
    const [clientNameNoEdit, setClientNameNoEdit] = useState('');

    const [date, setDate] = useState(newDate());
    const [clientName, setClientName] = useState('');
    const [carModel, setCarModel] = useState('');
    const [carPatent, setCarPatent] = useState('');
    const [carKilometers, setCarKilometers] = useState(0);
    const [repair, setRepair] = useState('');
    const [amount, setAmount] = useState(0);

    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3000/services`).then((response) => {
            setCustomers(filterDuplicates(response.data));
        }); if (params.id) {
            axios.get(`http://localhost:3000/services/${params.id}`).then((response) => {
                const service = response.data;
                setDate(newDate(service.date));
                setClientName(service.clientName);
                setClientNameNoEdit(service.clientName);
                setCarModel(service.carModel);
                setCarPatent(service.carPatent);
                setCarKilometers(service.carKilometers);
                setRepair(service.repair);
                setAmount(service.amount);
            });
        }
    }, [])

    const removeClientData = (clientData) => {
        setClient([]);
        setClientName(clientData);
        setCarModel("");
        setCarPatent("");
        setCarKilometers(0);
    }

    const completeClientData = (clientData) => {
        const data = clientData[0];
        if (data) {
            setClient(data);
            setCarModel(data.carModel);
            setCarPatent(data.carPatent);
            setCarKilometers(data.carKilometers);
        }
    }

    const submit = () => {
        const payload = {
            date: dateFormat(date, 'YYYY-MM-DD'),
            clientName: client.id ? client.clientName.toUpperCase() : clientName.toUpperCase(),
            carModel: carModel.toUpperCase(),
            carKilometers: Number(carKilometers),
            carPatent: carPatent.toUpperCase(),
            repair: repair.toUpperCase(),
            amount: Number(amount)
        }
        if (params.id) {
            if (clientNameNoEdit !== payload.clientName) {
                axios.get(`http://localhost:3000/services?clientName=${clientNameNoEdit}`).then((response) => {
                    response.data.forEach(e => {
                        if (Number(params.id) === e.id) {
                            axios.put(`http://localhost:3000/services/${params.id}`, payload).then((res) => {
                                console.log(res);
                            });
                        }
                        else {
                            axios.put(`http://localhost:3000/services/${e.id}`, { ...e, clientName: payload.clientName }).then((res) => {
                                console.log(res);
                            });
                        }
                    });
                    goBack();
                });
            }
            else {
                axios.put(`http://localhost:3000/services/${params.id}`, payload).then((response) => {
                    console.log(response);
                    goBack();
                });
            }

        }
        else {
            axios.post(`http://localhost:3000/services`, payload).then((response) => {
                console.log(response);
                goBack();
            });
        }
    }

    const remove = (id) => {
        axios.delete(`http://localhost:3000/services/${id}`).then((response) => {
            console.log(response);
            goBack();
        });
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
                    {params.id ?
                        <Form.Control
                            type="text"
                            onChange={(e) => setClientName(e.target.value)}
                            value={clientName}
                        />
                        : <Typeahead
                            id="basic-example"
                            emptyLabel="Sin resultados"
                            labelKey={option => `${option.clientName}`}
                            placeholder={client.clientName}
                            onInputChange={(e) => removeClientData(e)}
                            onChange={(e) => completeClientData(e)}
                            options={customers}
                        />
                    }
                </Form.Group>
                <FormClient
                    carModel={carModel}
                    setCarModel={setCarModel}
                    carPatent={carPatent}
                    setCarPatent={setCarPatent}
                    carKilometers={carKilometers}
                    setCarKilometers={setCarKilometers}
                />
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
                        onWheel={(e) => e.target.blur()}
                    />
                </Form.Group>
            </Form>
            <div className="button-container">
                <Button variant="outline-primary" onClick={goBack}>
                    Volver
                </Button>
                <Button variant="danger" onClick={() => remove(params.id)}>
                    Eliminar
                </Button>
                <Button variant="primary" onClick={submit}>
                    Guardar
                </Button>
            </div>
        </>
    );
}

export default NewService;
