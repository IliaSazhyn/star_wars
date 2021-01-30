import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Spinner,
  InputGroup,
  FormControl,
  ListGroupItem,
} from "react-bootstrap";
import "./index.css";

const Main = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterText, setFilterText] = useState("");
  const history = useHistory();
  const getMovies = async () => {
    setLoading(true);

    try {
      const response = await axios.get("https://swapi.dev/api/films/");
      let sortFilms = response.data.results.map((i) => ({ ...i }));
      sortFilms.sort((a, b) => a.title.localeCompare(b.title));

      setMovies(sortFilms);
      setLoading(false);

      return response.data.results;
    } catch (error) {
      alert(`Throwing ${error}`);
      throw error;
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  const filteredItems = movies.filter((item) =>
    item.title.toLocaleLowerCase().includes(filterText)
  );

  const itemsShow = filterText ? filteredItems : movies;

  console.log(movies);

  const onClickHandler = (url, id) => {
    localStorage.setItem("url", JSON.stringify(url));
    history.push("/films/" + id);
  };
  return (
    <Container fluid className="Main_wrapper">
      <Col>
        <Row>
          {loading && (
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          )}
        </Row>
        <Row className="Main_search_wrapper">
          <InputGroup className="m-5 Main_search">
            <FormControl
              placeholder="Enter keyword to filter"
              type="text"
              value={filterText}
              onChange={(e) =>
                setFilterText(e.target.value.toLocaleLowerCase())
              }
            />
          </InputGroup>
        </Row>
        <Row>
        {itemsShow.map((movie, index) => (

          <Col   md="6" key={index}>
            <ListGroupItem action
              onClick={() => {
                onClickHandler(movie.url, movie.episode_id);
              }}
            >
              <h3>{movie.title}</h3>
            </ListGroupItem>
            <p>{movie.opening_crawl}</p>
          </Col>
        ))}
        </Row>
      </Col>
    </Container>
  );
};

export default Main;
