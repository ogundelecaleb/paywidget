import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import WidgetHome from "./widgetHome";
import CardDetails from "./scene/cardDetails";
import Otp from "./scene/otp";
import Success from "./success";
import FailedTransaction from "./failedTransaction";
import Failed from "./scene/failed";
import Successfull from "./scene/sucess";
import CardPin from "./scene/cardPin";
import Transfer from "./scene/transfer";
import CardPin2 from "./scene/cardPin2";


const App = () => {
  return (
    <div>
        <Router>
          <Routes>
            <Route element={<WidgetHome />}>
              <Route index element={<CardDetails />} />
              <Route path="/index/otp" element={<Otp />} />
              <Route path="/index/failed" element={<Failed />} />
              <Route path="/index/success" element={<Successfull />} />
              <Route path="/index/cardpin" element={<CardPin />} />
              <Route path="/index/cardpin2" element={<CardPin2 />} />
              <Route path="/index/transfer" element={<Transfer />} />
            </Route>{" "}
            <Route path="/success" element={<Success />} />
            <Route path="/failed" element={<FailedTransaction />} />
          </Routes>
        </Router>
    </div>
  );
};

export default App;
