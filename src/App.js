import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Main from "./components/Main/index";
const FilmDetails = React.lazy(() => import("./components/FilmDetails/index"));
const Page404 = () => <h1> Error 404, Not found... </h1>;

function App() {
  return (
    <div className="App">
      <Switch>
      <Suspense fallback={<div>Загрузка...</div>}>
        <Route exact path="/" component={Main} />
        <Route exact path="/films/:id" component={FilmDetails} />
        
        </Suspense>  
        <Route component={Page404} />
      </Switch>
     
    </div>
  );
}

export default App;
