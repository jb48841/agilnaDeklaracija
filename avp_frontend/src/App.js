import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import BaseRouter from "./routes";

const App = () => {
  return (
    <div>
      <Router>
        <BaseRouter />
      </Router>
    </div>
  );
}
export default App;