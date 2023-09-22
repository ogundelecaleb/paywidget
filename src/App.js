import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import WidgetHome from "./widgetHome";
import CardDetails from "./scene/cardDetails";
import Otp from "./scene/otp";
import Success from "./success";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FailedTransaction from "./failedTransaction";
import Failed from "./scene/failed";
import Successfull from "./scene/sucess";
import CardPin from "./scene/cardPin";
import Transfer from "./scene/transfer";

const queryClient = new QueryClient();

const App = () => {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<WidgetHome />}>
              <Route index element={<CardDetails />} />
              <Route path="/index/cardDetails" element={<CardDetails />} />
              <Route path="/index/otp" element={<Otp />} />
              <Route path="/index/failed" element={<Failed />} />
              <Route path="/index/success" element={<Successfull />} />
              <Route path="/index/cardpin" element={<CardPin />} />
              <Route path="/index/transfer" element={<Transfer />} />
            </Route>{" "}
            <Route path="/success" element={<Success />} />
            <Route path="/failed" element={<FailedTransaction />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  );
};

export default App;
