import React from "react";
import { Route, Switch } from "react-router-dom";
import Main from "./components/Main/index";
import FilmDetails from "./components/FilmDetails/index";
const Page404 = () => (
  <h1 style={{ textAlign: "center" }}> Error 404, Not found... </h1>
);

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/films/:id" component={FilmDetails} />
        <Route component={Page404} />
      </Switch>
    </div>
  );
}

export default App;
