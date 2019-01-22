import React, { Component } from "react";
import "./App.css";
import Navigation from "./containers/Navigation";
import Page from "./containers/Page";
import { Provider } from "react-redux";

import store from "./store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
        <Page />
      </Provider>
    );
  }
}

export default App;