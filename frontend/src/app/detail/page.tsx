import { Button, Col, Row } from "react-bootstrap";
import UserTable from "../../components/usersTable"

export default function Home() {
    return (
        <Row >
            <Col className="d-flex justify-content-center">
                {/* <Button variant="info">Something</Button> */}
                <UserTable />
            </Col>
        </Row>
    );
}
