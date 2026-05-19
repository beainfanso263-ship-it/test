export type Role = 'customer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export type OrderStatus = 'pending' | 'washing' | 'drying' | 'folding' | 'ready' | 'completed';

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  serviceType: string;
  weight: number; // in kg
  status: OrderStatus;
  date: string;
  price: number;
}

export type MachineStatus = 'available' | 'in_use' | 'maintenance';
export type MachineType = 'washer' | 'dryer';

export interface Machine {
  id: string;
  name: string;
  type: MachineType;
  status: MachineStatus;
  timeRemaining?: number; // in minutes
}
