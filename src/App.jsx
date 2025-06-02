

import React from "react";
import ToDos from "./components/ToDos";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <div className="bg-light min-vh-100 d-flex flex-column align-items-center justify-content-start py-5">
      <h1 className="mb-4">🗒️ ToDo List con API - martanvcs</h1>
      <ToDos />
    </div>
  );
};

export default App;


