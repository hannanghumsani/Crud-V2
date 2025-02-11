"use client";
import { Table, Dropdown, DropdownButton, Pagination, Form, Row, Col, Spinner, Button } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
interface TableComponentProps {
    meta: any;
    // showToast: boolean;
    // toastMessage: string;
    userData: any[];
    loading: boolean;
    updatePage: (newPage: number) => void;
    updatePerPage: (newPerPage: number) => void;
    userDelete: (id: string) => void;
}
export default function TableComponent({ meta, userData, loading, updatePage, updatePerPage, userDelete }: TableComponentProps) {
    const searchParams = useSearchParams();
    // const navigate = useNavigate()


    // Default values from URL or fallback
    // const queryPage = searchParams.get("page") || 1;
    // const queryPerPage = searchParams.get("perPage") || 10;

    // const [perPage, updatePerPage] = useState(queryPerPage);
    // const [currentPage, updatePage] = useState(queryPage);
    const totalPages = meta?.totalPages;

    // useEffect(() => {
    //     router.push(
    //         {
    //             pathname: router.pathname,
    //             query: { ...router.query, page: currentPage, perPage: perPage },
    //         },
    //         undefined,
    //         { shallow: true }
    //     );
    // }, [currentPage, perPage]);

    return (
        <>

            {loading ? (
                <div className="container">
                    <div className="d-flex justify-content-center align-items-center vh-100">
                        <Spinner variant="light" />
                    </div>
                </div>
            ) : (
                <div className="container">

                    <div className="d-flex justify-content-between text-light">
                        <h2 className="text-center text-info mb-4">User List</h2>
                        <h2>
                            <Link href="/create" passHref>
                                <Button> Create User </Button>
                            </Link>
                        </h2>
                    </div>

                    <div className="table-responsive">
                        <Table striped bordered hover variant="dark" className="text-white">
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>City</th>
                                    <th>Gender</th>
                                    <th>Date Added</th>
                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userData.map((user) => (
                                    <tr key={user?._id}>
                                        <td>{user?.firstName}</td>
                                        <td>{user?.lastName}</td>
                                        <td>{user?.email}</td>
                                        <td>{user?.city}</td>
                                        <td>{user?.gender}</td>
                                        <td>{user?.createdAt}</td>
                                        <td className="text-center">
                                            <DropdownButton variant="secondary" title="">
                                                <Dropdown.Item as={Link} href={`/create?userId=${user?._id}`}
                                                    className="d-flex align-items-center">
                                                    <FaEdit className="me-2" /> Update
                                                </Dropdown.Item>
                                                <Dropdown.Item onClick={() => userDelete(user?._id)} className="d-flex align-items-center text-danger">
                                                    <FaTrash className="me-2" /> Delete
                                                </Dropdown.Item>
                                            </DropdownButton>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>

                    <Row className="justify-content-between align-items-center mt-3">
                        <Col xs={12} md="auto" className="mb-2 mb-md-0">
                            <Form.Select
                                value={searchParams.get("perPage")?.toString()}
                                onChange={(e) => {
                                    updatePerPage(parseInt(e.target.value, 10));
                                }}
                                className="w-auto"
                            >
                                <option value="10">10 per page</option>
                                <option value="15">15 per page</option>
                                <option value="20">20 per page</option>
                            </Form.Select>
                        </Col>

                        <Col xs={12} md="auto">
                            <Pagination className="mb-0">
                                <Pagination.Prev
                                    disabled={Number(searchParams.get("page") || 1) <= 1}
                                    onClick={() => updatePage(Number(searchParams.get("page") || 1) - 1)}
                                />
                                {Array.from({ length: totalPages }, (_, i) => {
                                    const pageNumber = i + 1;
                                    return (
                                        <Pagination.Item
                                            key={pageNumber}
                                            active={pageNumber === Number(searchParams.get("page") || 1)}
                                            onClick={() => updatePage(pageNumber)}
                                        >
                                            {pageNumber}
                                        </Pagination.Item>
                                    );
                                })}
                                <Pagination.Next
                                    disabled={Number(searchParams.get("page") || 1) >= totalPages}
                                    onClick={() => updatePage(Number(searchParams.get("page") || 1) + 1)}
                                />
                            </Pagination>
                        </Col>

                    </Row>
                </div >
            )
            }
        </>
    );
}
