import { User, Order, Machine } from './types';

export const mockUsers: User[] = [
  { id: '1', name: 'Admin Staff', email: 'admin@washmate.com', role: 'admin' },
  { id: '2', name: 'John Doe', email: 'john@example.com', role: 'customer' },
  { id: '3', name: 'Jane Smith', email: 'jane@example.com', role: 'customer' },
];

export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    customerId: '2',
    customerName: 'John Doe',
    serviceType: 'Wash & Fold',
    weight: 5,
    status: 'washing',
    date: '2023-10-25',
    price: 15.0,
  },
  {
    id: 'ORD-002',
    customerId: '3',
    customerName: 'Jane Smith',
    serviceType: 'Dry Cleaning',
    weight: 2,
    status: 'ready',
    date: '2023-10-24',
    price: 25.0,
  },
  {
    id: 'ORD-003',
    customerId: '2',
    customerName: 'John Doe',
    serviceType: 'Wash & Iron',
    weight: 3,
    status: 'pending',
    date: '2023-10-26',
    price: 18.0,
  },
];

export const mockMachines: Machine[] = [
  { id: 'W1', name: 'Washer 01', type: 'washer', status: 'in_use', timeRemaining: 15 },
  { id: 'W2', name: 'Washer 02', type: 'washer', status: 'available' },
  { id: 'W3', name: 'Washer 03', type: 'washer', status: 'maintenance' },
  { id: 'D1', name: 'Dryer 01', type: 'dryer', status: 'in_use', timeRemaining: 45 },
  { id: 'D2', name: 'Dryer 02', type: 'dryer', status: 'available' },
];
