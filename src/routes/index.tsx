import { createBrowserRouter, Navigate } from 'react-router-dom';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { AdminDashboard } from '@/pages/admin/Dashboard';
import { AdminUsersPage } from '@/pages/admin/Users';
import { ManagerDashboard } from '@/pages/manager/Dashboard';
import { OperatorDashboard } from '@/pages/operator/Dashboard';
import { Clients } from '@/pages/shared/Clients';
import { NewClient } from '@/pages/shared/NewClient';
import { ServiceOrders } from '@/pages/shared/ServiceOrders';
import { Notifications } from '@/pages/shared/Notifications';
import { Budgets } from '@/pages/shared/Budgets';
import { Login } from '@/pages/auth/Login';
import { AuthGuard } from '@/components/AuthGuard';
import { CustomerPortal } from '@/pages/customer/CustomerPortal';
import { CustomerLogin } from '@/pages/customer/CustomerLogin';
import { CustomerProposals } from '@/pages/customer/CustomerProposals';
import { CustomerAppointments } from '@/pages/customer/CustomerAppointments';
import { CustomerDocuments } from '@/pages/customer/CustomerDocuments';
import { CustomerDashboard } from '@/pages/customer/CustomerDashboard';
import { CustomerSettings } from '@/pages/customer/CustomerSettings';
import { CustomerHelp } from '@/pages/customer/CustomerHelp';
import CustomerServiceOrders from '@/pages/customer/CustomerServiceOrders';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/admin',
    element: (
      <AuthGuard allowedRoles={['admin']}>
        <DashboardLayout role="admin" />
      </AuthGuard>
    ),
    children: [
      {
        path: '',
        element: <AdminDashboard />,
      },
      {
        path: 'users',
        element: <AdminUsersPage />,
      },
      {
        path: 'budgets',
        element: <Budgets />,
      },
    ],
  },
  {
    path: '/manager',
    element: (
      <AuthGuard allowedRoles={['manager']}>
        <DashboardLayout role="manager" />
      </AuthGuard>
    ),
    children: [
      {
        path: '',
        element: <ManagerDashboard />,
      },
      {
        path: 'clients',
        element: <Clients />,
      },
      {
        path: 'clients/new',
        element: <NewClient />,
      },
      {
        path: 'budgets',
        element: <Budgets />,
      },
      {
        path: 'orders',
        element: <ServiceOrders />,
      },
      {
        path: 'notifications',
        element: <Notifications />,
      },
    ],
  },
  {
    path: '/operator',
    element: (
      <AuthGuard allowedRoles={['operator']}>
        <DashboardLayout role="operator" />
      </AuthGuard>
    ),
    children: [
      {
        path: '',
        element: <OperatorDashboard />,
      },
      {
        path: 'clients',
        element: <Clients />,
      },
      {
        path: 'clients/new',
        element: <NewClient />,
      },
      {
        path: 'budgets',
        element: <Budgets />,
      },
      {
        path: 'orders',
        element: <ServiceOrders />,
      },
      {
        path: 'notifications',
        element: <Notifications />,
      },
    ],
  },
  {
    path: '/customer',
    children: [
      {
        path: 'login',
        element: <CustomerLogin />,
      },
      {
        path: '',
        element: <CustomerPortal />,
        children: [
          {
            path: '',
            element: <CustomerDashboard />,
          },
          {
            path: 'proposals',
            element: <CustomerProposals />,
          },
          {
            path: 'appointments',
            element: <CustomerAppointments />,
          },
          {
            path: 'documents',
            element: <CustomerDocuments />,
          },
          {
            path: 'orders',
            element: <CustomerServiceOrders />,
          },
          {
            path: 'settings',
            element: <CustomerSettings />,
          },
          {
            path: 'help',
            element: <CustomerHelp />,
          },
        ],
      },
    ],
  },
]);
