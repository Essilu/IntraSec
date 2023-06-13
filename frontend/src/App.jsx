//import "./styles/App.css";
import { Button, MantineProvider } from "@mantine/core";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/navbar";
import Comptability from "./pages/Comptability";
import TransactionsHistory from "./pages/TransactionsHistory";


function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar><Home /></Navbar>}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/comptability" element={<Navbar><Comptability /></Navbar>}></Route>
          <Route path="/TransactionsHistory" element={<Navbar><TransactionsHistory /></Navbar>}></Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
