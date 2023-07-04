import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useMemo } from 'react';
import { useAuthStore } from './stores/auth';
import Layout from './components/Layout';
import ComptabilityDashboard from './pages/ComptabilityDashboard';
import ComptabilityHistory from './pages/ComptabilityHistory';
import EmployeeList from './pages/EmployeeList';
import Home from './pages/Home';
import Login from './pages/Login';
import ManageEmployees from './pages/ManageEmployees';
import ManageRoles from './pages/ManageRoles';
import MarketingArticle from './pages/MarketingArticle';
import MarketingArticleList from './pages/MarketingArticleList';
import PartnerList from './pages/PartnerList';
import SupportTicketList from './pages/SupportTicketList';
import SupportTicketNew from './pages/SupportTicketNew';
import Protected from './components/Authorization/Protected';

function App() {
  const [isLogged, fetchMe] = useAuthStore((state) => [state.isLogged, state.fetchMe]);

  // Fetch user data on app start
  useMemo(() => {
    fetchMe();
  }, [fetchMe]);

  const makePage = (page) => (
    <Protected isLoggedIn={isLogged()}>
      <Layout>{page}</Layout>
    </Protected>
  );

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Notifications />
      <ModalsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={makePage(<Home />)} />
            <Route path="/login" element={isLogged() ? <Navigate to="/" replace /> : <Login />} />
            <Route path="/comptability" element={makePage(<ComptabilityDashboard />)} />
            <Route path="/comptability/history" element={makePage(<ComptabilityHistory />)} />
            <Route path="/articles" element={makePage(<MarketingArticleList />)} />
            <Route path="/articles/:id" element={makePage(<MarketingArticle />)} />
            <Route path="/partners/:kind" element={makePage(<PartnerList />)} />
            <Route path="/employees" element={makePage(<EmployeeList />)} />
            <Route path="/support" element={makePage(<SupportTicketList />)} />
            <Route path="/support/new" element={makePage(<SupportTicketNew />)} />
            <Route path="/manage/roles" element={makePage(<ManageRoles />)} />
            <Route path="/manage/employees" element={makePage(<ManageEmployees />)} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ModalsProvider>
    </MantineProvider>
  );
}

export default App;
