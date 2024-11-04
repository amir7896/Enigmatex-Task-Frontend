import React from "react";
import Routing from "./routing/Routing";
import { ProvideStates } from "./hooks/useStates";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ProvideStates>
        <Routing />
      </ProvideStates>
      <ToastContainer />
    </>
  );
};

export default App;
