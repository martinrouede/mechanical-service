import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { dateFormat, newDate } from '../../services/date';

import { Button, Table, Form } from 'react-bootstrap';
import '../../styles/main.css';
import './service.css';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

function Search(props) {
    const navigate = useNavigate();

    const today = newDate();
    const [startDate, setStartDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
    const [endDate, setEndDate] = useState(new Date(today.getFullYear(), today.getMonth() + 1, 0));
    const [client, setClient] = useState([]);

    const [services, setServices] = useState([]);
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3000/services?_expand=customers&_sort=date&_order=desc&date_gte=${dateFormat(startDate)}&date_lte=${dateFormat(endDate)}`).then((response) => {
            setServices(response.data);
        });
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
        if (client.id) {
            filterClient = `&customersId=${client.id}`;
        }
        axios.get(`http://localhost:3000/services?_expand=customers&_sort=date&_order=desc&date_gte=${dateFormat(startDate)}&date_lte=${dateFormat(endDate)}` + filterClient).then((response) => {
            setServices(response.data);
        });
    };

    const edit = (id) => {
        navigate(`/servicio/editar/${id}`);
    }

    const newService = () => {
        navigate(`/servicio/nuevo/`);
    }

    const remove = (id) => {
        axios.delete(`http://localhost:3000/services/${id}`).then((response) => {
            console.log(response);
            axios.get(`http://localhost:3000/services?_expand=customers`).then((res) => {
                setServices(res.data);
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
            <div className="header-service">
                <Form className="header-dates-container">
                    <Form.Label className="label-datepicker">Fecha Desde</Form.Label>
                    <div className="container-datepicker">
                        <DatePicker
                            className="date-picker"
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            dateFormat='dd/MM/yyyy'
                        />
                    </div>
                    <Form.Label className="label-datepicker">Fecha Hasta</Form.Label>
                    <div className="container-datepicker">
                        <DatePicker
                            className="date-picker"
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                            dateFormat='dd/MM/yyyy'
                        />
                    </div>
                </Form>
                <div className="subheader">
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
                    <Button variant="primary" onClick={newService}>
                        Nuevo Servicio
                    </Button>
                </div>
            </div>
            <div className="table">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Cliente</th>
                            <th>Auto</th>
                            <th>Reparacion</th>
                            <th>Monto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map(e => (
                            <tr>
                                <td>{dateFormat(e.date)}</td>
                                <td>{e.customers.name}</td>
                                <td>{e.customers.carModel}</td>
                                <td className="row-repair">{e.repair}</td>
                                <td>{e.amount}</td>
                                <td className="table-button"><Button onClick={() => edit(e.id)}>Editar</Button></td>
                                <td className="table-button"><Button onClick={() => remove(e.id)}>Eliminar</Button></td>
                            </tr>
                        ))}
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>{services.reduce((total, e) => { return total + Number(e.amount) }, 0)}</td>
                            <td></td>
                            <td></td>
                        </tr>
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
