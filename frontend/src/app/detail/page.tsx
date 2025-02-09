import { Col, Row } from "react-bootstrap";
import UserTable from "@/components/usersTable";
import { getAllUsers } from "@/ApiS/userApi";


export default async function Home({ searchParams }: { searchParams: { perPage?: string; page?: string } }) {
    const perPage = searchParams?.perPage || "10";
    const page = searchParams?.page || "1";

    const resp = await getAllUsers(Number(perPage), Number(page));
    // console.log(resp);

    return (
        <Row>
            <Col className="d-flex justify-content-center">
                <UserTable metaData={resp?.data?.meta} users={resp?.data?.users} />
            </Col>
        </Row>
    );
}
