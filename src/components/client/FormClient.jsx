import { Form } from 'react-bootstrap';

const FormClient = props => (
    <Form>
        <Form.Group className="mb-3" controlId="formBasicCarModel">
            <Form.Label>Marca Auto</Form.Label>
            <Form.Control
                type="text"
                onChange={(e) => props.setCarModel(e.target.value)}
                value={props.carModel}
            />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCarPatent">
            <Form.Label>Patente</Form.Label>
            <Form.Control
                type="text"
                onChange={(e) => props.setCarPatent(e.target.value)}
                value={props.carPatent}
            />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCarKilometers">
            <Form.Label>Kilometraje</Form.Label>
            <Form.Control
                type="number"
                onChange={(e) => props.setCarKilometers(e.target.value)}
                value={props.carKilometers}
                onWheel={(e) => e.target.blur()}
            />
        </Form.Group>
    </Form>

);

export default FormClient;
