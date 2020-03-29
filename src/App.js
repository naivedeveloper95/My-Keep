import React from "react";
import { Navigation, Footer } from "./components";
import { Home, Notes } from "./containers";
import { AppContainer } from "./UI/theme";
import { Provider } from "react-redux";
import { store } from "./redux/storeConfig";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContainer>
          <Navigation />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/notes" component={Notes} />
          </Switch>
          <Footer />
        </AppContainer>
      </Router>
    </Provider>
  );
}

export default App;
