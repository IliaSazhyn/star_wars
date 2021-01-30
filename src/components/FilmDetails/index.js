import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./index.css";
import { Container, Row, Col, Button, Card, Accordion, ListGroup, ListGroupItem, Spinner } from "react-bootstrap";

const FilmDetails = () => {
  const [details, setDetails] = useState([]);

  const [vehicles, setVehicles] = useState([]);
  const [starships, setStarships] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [species, setSpecies] = useState([]);

  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(null);
  const history = useHistory();

  const fetchData = async () => {
    setLoading(true);
    const movieId = await JSON.parse(localStorage.getItem("url"));

    const movie = await axios.get(`${movieId}`);
    const { data } = movie;

    // This set all details in state

    // This is character action
    const charactersLinks = [...data.characters];
    fetchCharacters(charactersLinks);
// This is planet action
    const planetsLinks = [...data.planets];
    fetchPlanets(planetsLinks);
    // This is species action
    const speciesLinks = [...data.species];
    fetchSpecies(speciesLinks);

    // This is starship action
    const starshipsLinks = [...data.starships];
    fetchStarships(starshipsLinks);

    // This is vehicles action
    const vehiclesLinks = [...data.vehicles];
    fetchVehicles(vehiclesLinks);

    setDetails(data);
  };
  useEffect(() => {
    // This fetch data from API
    fetchData()
      .then(() => {
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
      });
  }, []);

  function fetchCharacters(charactersLinks) {
    Promise.all(charactersLinks.map((url) => fetch(url)))
      .then((responses) => Promise.all(responses.map((res) => res.text())))
      .then((texts) => {
        setCharacters(texts.map(JSON.parse));
      });
  }
  function fetchVehicles(vehiclesLinks) {
    Promise.all(vehiclesLinks.map((url) => fetch(url)))
      .then((responses) => Promise.all(responses.map((res) => res.text())))
      .then((texts) => {
        setVehicles(texts.map(JSON.parse));
      });
  }
  function fetchPlanets(planetsLinks) {
    Promise.all(planetsLinks.map((url) => fetch(url)))
      .then((responses) => Promise.all(responses.map((res) => res.text())))
      .then((texts) => {
        setPlanets(texts.map(JSON.parse));
      });
  }
  function fetchSpecies(speciesLinks) {
    Promise.all(speciesLinks.map((url) => fetch(url)))
      .then((responses) => Promise.all(responses.map((res) => res.text())))
      .then((texts) => {
        setSpecies(texts.map(JSON.parse));
      });
  }
  function fetchStarships(starshipsLinks) {
    Promise.all(starshipsLinks.map((url) => fetch(url)))
      .then((responses) => Promise.all(responses.map((res) => res.text())))
      .then((texts) => {
        setStarships(texts.map(JSON.parse));
      });
  }

  return (
    <Container fluid>
      <Row className="Details_wrapper">
        <Col>
          <div className="Details_card_container">
            {isLoading ? (
              <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
            ) : (
              <div className="Details_card_body">
                <Button className="Details_button" color="primary" onClick={() => history.goBack()}>
                  Back
                </Button>

                <Card>
                  <Card.Body>
                    <Card.Title>{details.title}</Card.Title>
                    <Card.Text>Producer: {details.producer}</Card.Text>
                    <Card.Text>Director: {details.director}</Card.Text>
                  </Card.Body>

                  <Accordion defaultActiveKey="0">
                    <Card>
                      <Card.Header>
                        <Accordion.Toggle
                          as={Button}
                          variant="link"
                          eventKey="1"
                        >
                          Characters:
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="1">
                      <ListGroup>
                          {characters &&
                            characters.map((person, id) => (
                              <ListGroupItem key={id}>{person.name}</ListGroupItem>
                            ))}
                        </ListGroup>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>

                  <Accordion defaultActiveKey="0">
                    <Card>
                      <Card.Header>
                        <Accordion.Toggle
                          as={Button}
                          variant="link"
                          eventKey="2"
                        >
                          Planets:
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="2">
                        <ListGroup>
                          {planets &&
                            planets.map((item, id) => (
                              <ListGroupItem key={id}>{item.name}</ListGroupItem>
                            ))}
                        </ListGroup>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>

                  <Accordion defaultActiveKey="0">
                    <Card>
                      <Card.Header>
                        <Accordion.Toggle
                          as={Button}
                          variant="link"
                          eventKey="3"
                        >
                          Vehicles:
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="3">
                        <ListGroup>
                          {vehicles &&
                            vehicles.map((item, id) => (
                              <ListGroupItem key={id}>{item.name}</ListGroupItem>
                            ))}
                        </ListGroup>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>

                  <Accordion defaultActiveKey="0">
                    <Card>
                      <Card.Header>
                        <Accordion.Toggle
                          as={Button}
                          variant="link"
                          eventKey="4"
                        >
                          Starships:
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="4">
                        <ListGroup>
                          {starships &&
                            starships.map((item, id) => (
                              <ListGroupItem key={id}>{item.name}</ListGroupItem>
                            ))}
                        </ListGroup>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>

                  <Accordion defaultActiveKey="0">
                    <Card>
                      <Card.Header>
                        <Accordion.Toggle
                          as={Button}
                          variant="link"
                          eventKey="5"
                        >
                          Species:
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="5">
                        <ListGroup>
                          {species &&
                            species.map((item, id) => (
                              <ListGroupItem key={id}>{item.name}</ListGroupItem>
                            ))}
                        </ListGroup>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>

                </Card>
              </div>
            )}

            {isError && <div>Somethin went wrong{isError}</div>}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default FilmDetails;
