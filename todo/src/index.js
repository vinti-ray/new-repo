import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Home from "./component/homepage";
import UpdateTask from "./component/updateTask";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>

  <BrowserRouter>

    <Routes >
<Route path="/" element={<Home/>}/>
<Route path="/update" element={<UpdateTask/>}/>

    </Routes>
  </BrowserRouter>

  </>
);