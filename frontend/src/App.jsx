import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/auth';
import Home from './pages/Home';
import Login from './pages/Login';
import Navbar from './components/navbar';
import Comptability from './pages/Comptability';
import TransactionsHistory from './pages/TransactionsHistory';
import EmployeesAdmin from './pages/EmployeesAdmin';
import EmployeesList from './pages/EmployeesList';
import NewTicket from './pages/NewTicket';
import Tickets from './pages/Tickets';
import Marketing from './pages/Marketing';
import CompanyList from './pages/CompanyList';
import SchoolList from './pages/SchoolList';
import Article from './pages/Article';
import Protected from './components/Protected';
import { useMemo } from 'react';
import Roles from './pages/Roles';

function App() {
  const [isLogged, fetchMe] = useAuthStore((state) => [
    state.isLogged,
    state.fetchMe,
  ]);

  // Fetch user data on app start
  useMemo(() => {
    fetchMe();
  }, [fetchMe]);

  const makePage = (page) => (
    <Protected isLoggedIn={isLogged()}>
      <Navbar>{page}</Navbar>
    </Protected>
  );

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Notifications />
      <ModalsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={makePage(<Home />)} />
            <Route
              path="/login"
              element={isLogged() ? <Navigate to="/" replace /> : <Login />}
            />
            <Route path="/comptability" element={makePage(<Comptability />)} />
            <Route
              path="/comptability/history"
              element={makePage(<TransactionsHistory />)}
            />
            <Route path="/articles" element={makePage(<Marketing />)} />
            <Route path="/articles/:id" element={makePage(<Article />)} />
            <Route path="/partners/companies" element={makePage(<CompanyList />)} />
            <Route path="/partners/schools" element={makePage(<SchoolList />)} />
            <Route
              path="/employees"
              element={makePage(<EmployeesList />)}
            />
            <Route path="/support" element={makePage(<Tickets />)} />
            <Route path="/support/new" element={makePage(<NewTicket />)} />
            <Route path="/manage/roles" element={makePage(<Roles />)} />
            <Route
              path="/manage/employees"
              element={makePage(<EmployeesAdmin />)}
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ModalsProvider>
    </MantineProvider>
  );
}

export default App;
