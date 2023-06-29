import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./stores/auth";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/navbar";
import Comptability from "./pages/Comptability";
import TransactionsHistory from "./pages/TransactionsHistory";
import EmployeesAdmin from "./pages/EmployeesAdmin";
import EmployeesList from "./pages/EmployeesList";
import NewTicket from "./pages/NewTicket";
import Tickets from "./pages/Tickets";
import Marketing from "./pages/Marketing";
import CompanyList from "./pages/CompanyList";
import SchoolList from "./pages/SchoolList";
import Article from "./pages/Article";
import Protected from "./components/Protected";
import { useMemo } from 'react';

function App() {
  const [isLogged, fetchMe] = useAuthStore(state => [state.isLogged, state.fetchMe]);

  // Fetch user data on app start
  useMemo(() => {
    fetchMe();
  }, [fetchMe]);

  const makePage = (page) => (
    <Protected isLoggedIn={isLogged()}>
      <Navbar>
        {page}
      </Navbar>
    </Protected>
  );

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={makePage(<Home />)} />
          <Route path="/login" element={
            isLogged()
              ? <Navigate to="/" replace />
              : <Login />
          } />
          <Route path="/comptability" element={makePage(<Comptability />)} />
          <Route path="/TransactionsHistory" element={makePage(<TransactionsHistory />)} />
          <Route path="/EmployeesAdmin" element={makePage(<EmployeesAdmin />)} />
          <Route path="/EmployeesList" element={makePage(<EmployeesList />)} />
          <Route path="/NewTicket" element={makePage(<NewTicket />)} />
          <Route path="/Tickets" element={makePage(<Tickets />)} />
          <Route path="/Marketing" element={makePage(<Marketing />)} />
          <Route path="/CompanyList" element={makePage(<CompanyList />)} />
          <Route path="/Article/:id" element={makePage(<Article/>)} />
          <Route path="/SchoolList" element={makePage(<SchoolList />)} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
