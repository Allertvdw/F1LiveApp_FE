import { BrowserRouter, Routes, Route } from "react-router-dom";
import DriverOverview from "./components/DriverOverview";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/driverOverview" element={<DriverOverview />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
