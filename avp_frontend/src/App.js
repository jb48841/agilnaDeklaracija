import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import BaseRouter from "./routes";

const App = () => {
  return (
    <div>
      <Router basename={process.env.PUBLIC_URL}>
        <BaseRouter />
      </Router>
    </div>
  );
}
export default App;