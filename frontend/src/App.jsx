//import "./styles/App.css";
import { Button, MantineProvider } from "@mantine/core";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/navbar";
import Comptability from "./pages/Comptability";
import TransactionsHistory from "./pages/TransactionsHistory";
import EmployeesAdmin from "./pages/EmployeesAdmin";
import EmployeesList from "./pages/EmployeesList";
import NewTicket from "./pages/NewTicket";
import Tickets from "./pages/Tickets";

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar><Home /></Navbar>}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/comptability" element={<Navbar><Comptability /></Navbar>}></Route>
          <Route path="/TransactionsHistory" element={<Navbar><TransactionsHistory /></Navbar>}></Route>
          <Route path="/EmployeesAdmin" element={<Navbar><EmployeesAdmin /></Navbar>}></Route>
          <Route path="/EmployeesList" element={<Navbar><EmployeesList /></Navbar>}></Route>
          <Route path="/NewTicket" element={<Navbar><NewTicket /></Navbar>}></Route>
          <Route path="/Tickets" element={<Navbar><Tickets /></Navbar>}></Route>
        </Routes>


      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
