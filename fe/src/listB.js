import axios from "axios";
import React, { useState, useEffect } from "react";
import { Table, Container, Row, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

const ListB = () => {
  const [listB, setListB] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:9999/tutorial/${id}/comments`)
      .then((response) => {
        const data = Array.isArray(response.data) ? response.data : [];
        setListB(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
        setListB([]);
      });
  }, []);

  return (
    <Container>
      <Row className="my-3">
        <Col>
          <h2 className="text-center">Tutorials Online Courses</h2>
        </Col>
        <Link to="/">Home page</Link>
      </Row>

      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Username</th>
                <th>Text</th>
                <th>Create At</th>
              </tr>
            </thead>
            <tbody>
              {listB.length > 0 ? (
                listB.map((e) => (
                  <tr key={e._id}>
                    <td>{e._id}</td>
                    <td>{e.username}</td>
                    <td>{e.text}</td>
                    <td>{e.createAt}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No courses available
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default ListB;
