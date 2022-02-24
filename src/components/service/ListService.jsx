import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { dateFormat, newDate } from '../../services/date';
import { filterDuplicates, filterServices } from '../../services/utils';

import { Button, Table, Form } from 'react-bootstrap';
import '../../styles/main.css';
import './service.css';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

const ListService = (props) => {
    const navigate = useNavigate();

    const today = newDate();

    const [startDate, setStartDate] = useState(newDate(new Date(today.getFullYear(), today.getMonth(), 1)));
    const [endDate, setEndDate] = useState(newDate(new Date(today.getFullYear(), today.getMonth() + 1, 0)));
    const [client, setClient] = useState([]);

    const [services, setServices] = useState([]);
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3000/services`).then((response) => {
            setServices(filterServices(response.data, startDate, endDate));
        });
        axios.get(`http://localhost:3000/services`).then((response) => {
            setCustomers(filterDuplicates(response.data));
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
            filterClient = `?clientName=${client.clientName}`;
        }

        axios.get(`http://localhost:3000/services` + filterClient).then((response) => {
            setServices(filterServices(response.data, startDate, endDate));
        });
    };

    const edit = (id) => {
        navigate(`/servicio/editar/${id}`);
    }

    const newService = () => {
        navigate(`/servicio/nuevo/`);
    }

    const removeClientData = () => {
        setClient([]);
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
                            labelKey={option => `${option.clientName}`}
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
                                <td>{dateFormat(e.date, 'DD/MM/YYYY')}</td>
                                <td>{e.clientName}</td>
                                <td>{e.carModel}</td>
                                <td className="row-repair">{e.repair}</td>
                                <td>{e.amount}</td>
                                <td className="table-button"><Button onClick={() => edit(e.id)}>Editar</Button></td>
                            </tr>
                        ))}
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>{services.reduce((total, e) => { return total + Number(e.amount) }, 0)}</td>
                            <td></td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default ListService;
