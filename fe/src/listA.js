import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";

import { Link } from "react-router-dom";
const ListA = () => {
  const [listA, setListA] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:9999/tutorials")
      .then((response) => {
        const data = Array.isArray(response.data) ? response.data : [];
        setListA(data);
        setFilter(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching listA:", error);
        setListA([]);
        setFilter([]);
      });
  }, []);
  useEffect(() => {
    let filtered = listA;

    // Lọc theo search term
    if (searchTerm) {
      filtered = filtered.filter((project) =>
        project.title.charAt(0).toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilter(filtered);
  }, [searchTerm, listA]);

  return (
    <Container>
      <Row className="my-3">
        <Col>
          <h2 className="text-center">Tutorial Online Courses</h2>
        </Col>
        <Link to="/">Home page</Link>
      </Row>
      <Row className="mb-3">
        <Col md={12}>
          <Form.Control
            placeholder="Enter title to search Tutorials"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Row>
            {filter.length > 0 ? (
              filter.map((project) => (
                <Col md={3}>
                  <Card className="mb-3" key={project._id}>
                    <Card.Img
                      variant="top"
                      src={project.images[0].url}
                      alt={project.name}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <Card.Body>
                      <Card.Title>{project.title}</Card.Title>
                      <Card.Text className="mb-2">
                        Author: {project.author}
                      </Card.Text>
                      <Card.Text>Category:{project.category.name}</Card.Text>
                    </Card.Body>
                    <Card.Body className="text-center">
                      <Link
                        style={{ textDecoration: "none" }}
                        to={`tutorial/${project._id}/comments`}
                      >
                        Comments: {project.comments.length}
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p className="text-center">No listA available</p>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ListA;
