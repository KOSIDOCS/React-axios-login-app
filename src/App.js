import React from "react";
import "./App.scss";

import SignUp from "./components/SignUp";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="main-container d-table position-absolute m-auto">
          <SignUp />
        </div>
      </header>
    </div>
  );
}

export default App;
