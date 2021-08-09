import { Route, Switch } from "react-router-dom";
import ConfigurationPage from "./components/configuration/ConfigurationPage";
import Navigation from "./components/nav/nav";
import TODOPage from "./components/TODO";

function App() {
  return (
    <div>
      <Navigation />
      <Switch>
          <Route path="/Conf" exact>
            <ConfigurationPage />
          </Route>
          <Route path="/TODO" exact>
            <TODOPage />
          </Route>
      </Switch>
    </div>
  );
}

export default App;
