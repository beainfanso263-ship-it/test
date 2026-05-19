import { createContext, useContext, useState, ReactNode } from 'react';
import { User, Order, Machine, OrderStatus, MachineStatus } from '../types';
import { mockUsers, mockOrders, mockMachines } from '../data';

interface DataContextType {
  users: User[];
  orders: Order[];
  machines: Machine[];
  addCustomer: (user: Omit<User, 'id' | 'role'>) => void;
  addOrder: (order: Omit<Order, 'id' | 'status' | 'date'>) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  updateMachineStatus: (machineId: string, status: MachineStatus) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [machines, setMachines] = useState<Machine[]>(mockMachines);

  const addCustomer = (user: Omit<User, 'id' | 'role'>) => {
    const newUser: User = {
      ...user,
      id: Math.random().toString(36).substring(7),
      role: 'customer',
    };
    setUsers([...users, newUser]);
  };

  const addOrder = (orderData: Omit<Order, 'id' | 'status' | 'date'>) => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
    };
    setOrders([newOrder, ...orders]);
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const updateMachineStatus = (machineId: string, status: MachineStatus) => {
    setMachines(machines.map(m => m.id === machineId ? { ...m, status, timeRemaining: status === 'in_use' ? 60 : undefined } : m));
  };

  return (
    <DataContext.Provider value={{ users, orders, machines, addCustomer, addOrder, updateOrderStatus, updateMachineStatus }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
