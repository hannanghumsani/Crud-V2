"use client";

import { useState } from "react";
import { Table, Dropdown, DropdownButton, Pagination, Form, Container, Row, Col } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";

const data = [
    {
        "id": 1,
        "firstName": "Amit",
        "lastName": "Sharma",
        "email": "amit.sharma@example.com",
        "city": "Delhi",
        "gender": "Male",
        "dateAdded": "2024-02-01"
    },
    {
        "id": 2,
        "firstName": "Priya",
        "lastName": "Verma",
        "email": "priya.verma@example.com",
        "city": "Mumbai",
        "gender": "Female",
        "dateAdded": "2024-02-02"
    },
    {
        "id": 3,
        "firstName": "Rahul",
        "lastName": "Yadav",
        "email": "rahul.yadav@example.com",
        "city": "Bangalore",
        "gender": "Male",
        "dateAdded": "2024-02-03"
    },
    {
        "id": 4,
        "firstName": "Sneha",
        "lastName": "Gupta",
        "email": "sneha.gupta@example.com",
        "city": "Hyderabad",
        "gender": "Female",
        "dateAdded": "2024-02-04"
    },
    {
        "id": 5,
        "firstName": "Vikram",
        "lastName": "Singh",
        "email": "vikram.singh@example.com",
        "city": "Chennai",
        "gender": "Male",
        "dateAdded": "2024-02-05"
    },
    {
        "id": 6,
        "firstName": "Neha",
        "lastName": "Chopra",
        "email": "neha.chopra@example.com",
        "city": "Kolkata",
        "gender": "Female",
        "dateAdded": "2024-02-06"
    },
    {
        "id": 7,
        "firstName": "Arjun",
        "lastName": "Mehta",
        "email": "arjun.mehta@example.com",
        "city": "Pune",
        "gender": "Male",
        "dateAdded": "2024-02-07"
    },
    {
        "id": 8,
        "firstName": "Pooja",
        "lastName": "Rao",
        "email": "pooja.rao@example.com",
        "city": "Jaipur",
        "gender": "Female",
        "dateAdded": "2024-02-08"
    },
    {
        "id": 9,
        "firstName": "Ravi",
        "lastName": "Patel",
        "email": "ravi.patel@example.com",
        "city": "Ahmedabad",
        "gender": "Male",
        "dateAdded": "2024-02-09"
    },
    {
        "id": 10,
        "firstName": "Kavita",
        "lastName": "Malhotra",
        "email": "kavita.malhotra@example.com",
        "city": "Lucknow",
        "gender": "Female",
        "dateAdded": "2024-02-10"
    },
    {
        "id": 11,
        "firstName": "Manoj",
        "lastName": "Joshi",
        "email": "manoj.joshi@example.com",
        "city": "Bhopal",
        "gender": "Male",
        "dateAdded": "2024-02-11"
    },
    {
        "id": 12,
        "firstName": "Sonia",
        "lastName": "Dewan",
        "email": "sonia.dewan@example.com",
        "city": "Chandigarh",
        "gender": "Female",
        "dateAdded": "2024-02-12"
    },
    {
        "id": 13,
        "firstName": "Deepak",
        "lastName": "Kapoor",
        "email": "deepak.kapoor@example.com",
        "city": "Indore",
        "gender": "Male",
        "dateAdded": "2024-02-13"
    },
    {
        "id": 14,
        "firstName": "Ritu",
        "lastName": "Arora",
        "email": "ritu.arora@example.com",
        "city": "Nagpur",
        "gender": "Female",
        "dateAdded": "2024-02-14"
    },
    {
        "id": 15,
        "firstName": "Suresh",
        "lastName": "Deshmukh",
        "email": "suresh.deshmukh@example.com",
        "city": "Patna",
        "gender": "Male",
        "dateAdded": "2024-02-15"
    },
    {
        "id": 16,
        "firstName": "Ankita",
        "lastName": "Jain",
        "email": "ankita.jain@example.com",
        "city": "Surat",
        "gender": "Female",
        "dateAdded": "2024-02-16"
    },
    {
        "id": 17,
        "firstName": "Naveen",
        "lastName": "Bansal",
        "email": "naveen.bansal@example.com",
        "city": "Kanpur",
        "gender": "Male",
        "dateAdded": "2024-02-17"
    },
    {
        "id": 18,
        "firstName": "Megha",
        "lastName": "Srivastava",
        "email": "megha.srivastava@example.com",
        "city": "Coimbatore",
        "gender": "Female",
        "dateAdded": "2024-02-18"
    },
    {
        "id": 19,
        "firstName": "Rohan",
        "lastName": "Tripathi",
        "email": "rohan.tripathi@example.com",
        "city": "Vijayawada",
        "gender": "Male",
        "dateAdded": "2024-02-19"
    },
    {
        "id": 20,
        "firstName": "Swati",
        "lastName": "Bhattacharya",
        "email": "swati.bhattacharya@example.com",
        "city": "Guwahati",
        "gender": "Female",
        "dateAdded": "2024-02-20"
    }
]


export default function TableComponent() {
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(data.length / perPage);

    const getData = () => {
        const startIndex = (currentPage - 1) * perPage;
        return data.slice(startIndex, startIndex + perPage);
    };

    const renderTableRows = () => {
        return getData().map((user) => (
            <tr key={user.id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.city}</td>
                <td>{user.gender}</td>
                <td>{user.dateAdded}</td>
                <td className="text-center">
                    <DropdownButton
                        variant="secondary"
                        title={""}
                    >
                        <Dropdown.Item href="#" className="d-flex align-items-center">
                            <FaEdit className="me-2" /> Update
                        </Dropdown.Item>
                        <Dropdown.Item href="#" className="d-flex align-items-center text-danger">
                            <FaTrash className="me-2" /> Delete
                        </Dropdown.Item>
                    </DropdownButton>

                </td>
            </tr>
        ));
    };

    return (
        <div className="container">
            <h2 className="text-center text-info mb-4">User List</h2>

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
                    <tbody>{renderTableRows()}</tbody>
                </Table>
            </div>

            <Row className="justify-content-between align-items-center mt-3">
                <Col xs={12} md="auto" className="mb-2 mb-md-0">
                    <Form.Select
                        value={perPage}
                        onChange={(e) => {
                            setPerPage(parseInt(e.target.value));
                            setCurrentPage(1);
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
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}
                        />
                        {Array.from({ length: totalPages }, (_, i) => (
                            <Pagination.Item
                                key={i + 1}
                                active={i + 1 === currentPage}
                                onClick={() => setCurrentPage(i + 1)}
                            >
                                {i + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(currentPage + 1)}
                        />
                    </Pagination>
                </Col>
            </Row>
        </div>
    );
}
