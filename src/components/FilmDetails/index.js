import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";

const FilmDetails = () => {
  const [details, setDetails] = useState([]);
  const [film, setFilm] = useState([]);
  const [vehicle, setVehicle] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(null);
  const location = useLocation();
  const history = useHistory();

  const fetchData = async () => {
    setLoading(true);
    const movieId = location.pathname;

    let characterNames = [];
    let planetsNames = [];
    let speciesNames = [];
    let starshipsNames = [];
    let vehiclesNames = [];

    const movie = await axios.get(`https://swapi.dev/api${movieId}`);
    const { data } = movie;

    // This set all details in state

    // This is character action
    const charactersLinks = [...data.characters];
    const charactersData = await charactersLinks.map((link) => axios.get(link));
    axios.all(charactersData).then((value) =>
      value.forEach((val) => {
        characterNames.push(val.data.name);
      })
    );
    // This is planets action
    const planetsLinks = [...data.planets];
    const planetsData = await planetsLinks.map((link) => axios.get(link));
    axios.all(planetsData).then((value) =>
      value.forEach((val) => {
        // let temp = val.data.name.slice();
        planetsNames.push(val.data.name);
      })
    );
    // This is species action
    const speciesLinks = [...data.species];
    const speciesData = await speciesLinks.map((link) => axios.get(link));
    axios.all(speciesData).then((value) =>
      value.forEach((val) => {
        speciesNames.push(val.data.name);
      })
    );
    // This is starship action
    const starshipsLinks = [...data.starships];
    const starshipsData = await starshipsLinks.map((link) => axios.get(link));
    axios.all(starshipsData).then((value) =>
      value.forEach((val) => {
        starshipsNames.push(val.data.name);
      })
    );
    // This is vehicles action
    const vehiclesLinks = [...data.vehicles];
    const vehiclesData = await vehiclesLinks.map((link) => axios.get(link));
    axios.all(vehiclesData).then((value) =>
      value.forEach((val) => {
        vehiclesNames.push(val.data.name);
      })
    );
    setFilm({
      speciesNames,
      vehiclesNames,
      starshipsNames,
      characterNames,
      planetsNames,
    });
    setVehicle(vehiclesNames);
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
  // console.log(film["characterNames"]);

  // console.log(film);

  //  if(!isLoading) {
  //   character.map((movie, index) => (
  //   console.log(movie.episode_id)
  // ))
  // }
  if (!isLoading) {

    Object.values(film).map((value) =>
      value.forEach(function (val) {
        console.log(val)
      })
    );
  }
  return (
    <Container fluid>
      <Row>
        <Col>
          <div>
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <div>
                {Object.values(film).map((value) =>
                  value.forEach(function (val) {
                    <p>{val}</p>;
                  })
                )}
                <Button color="primary" onClick={() => history.goBack()}>
                  Back
                </Button>

                <Card>
                  <Card.Body>
                    <Card.Title>{details.title}</Card.Title>
                    <Card.Text>Producer: {details.producer}</Card.Text>
                    <Card.Text>Director: {details.director}</Card.Text>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>Cras justo odio</ListGroupItem>
                    <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
                    <ListGroupItem>Vestibulum at eros</ListGroupItem>
                  </ListGroup>
                </Card>
              </div>
            )}
            {/* { Object.values(film).map((value, index) => (
                <div key={index}>{value}</div>
              )) } */}

            {isError && <div>Somethin went wrong{isError}</div>}

            {/* {film && film["characterNames"].map ((person, id) => (
    <p key={id}>{person}</p>
  ))}    */}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default FilmDetails;
