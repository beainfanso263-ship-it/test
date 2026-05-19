import { useState } from 'react';
import { useData } from '../context/DataContext';
import { Clock, CheckCircle2, Package, Settings, Monitor, RefreshCw, UserPlus } from 'lucide-react';
import { OrderStatus, MachineStatus } from '../types';

export default function AdminDashboard() {
  const { orders, machines, users, addCustomer, updateOrderStatus, updateMachineStatus } = useData();
  const [activeTab, setActiveTab] = useState<'orders' | 'machines' | 'customers'>('orders');
  
  const [newCustomer, setNewCustomer] = useState({ name: '', email: '' });
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">Completed</span>;
      case 'ready':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Ready</span>;
      case 'washing':
      case 'drying':
      case 'folding':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">{status}</span>;
      default:
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>;
    }
  };

  const getMachineStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Available</span>;
      case 'in_use':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">In Use</span>;
      case 'maintenance':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Maintenance</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Staff Dashboard
          </h2>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4 space-x-3">
          <button
            onClick={() => setActiveTab('orders')}
            className={`inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium ${activeTab === 'orders' ? 'border-transparent text-white bg-blue-600 hover:bg-blue-700' : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'}`}
          >
            <Package className="mr-2 h-4 w-4" />
            Orders
          </button>
          <button
            onClick={() => setActiveTab('machines')}
            className={`inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium ${activeTab === 'machines' ? 'border-transparent text-white bg-blue-600 hover:bg-blue-700' : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'}`}
          >
            <Monitor className="mr-2 h-4 w-4" />
            Machines
          </button>
          <button
            onClick={() => setActiveTab('customers')}
            className={`inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium ${activeTab === 'customers' ? 'border-transparent text-white bg-blue-600 hover:bg-blue-700' : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'}`}
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Customers
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Clock className="h-6 w-6 text-yellow-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Pending Orders</dt>
                  <dd className="text-lg font-medium text-gray-900">{orders.filter(o => o.status === 'pending').length}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <RefreshCw className="h-6 w-6 text-blue-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">In Progress</dt>
                  <dd className="text-lg font-medium text-gray-900">{orders.filter(o => ['washing', 'drying', 'folding'].includes(o.status)).length}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircle2 className="h-6 w-6 text-green-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Ready for Pickup</dt>
                  <dd className="text-lg font-medium text-gray-900">{orders.filter(o => o.status === 'ready').length}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Settings className="h-6 w-6 text-red-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Machines Maintenance</dt>
                  <dd className="text-lg font-medium text-gray-900">{machines.filter(m => m.status === 'maintenance').length}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {activeTab === 'orders' ? (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">All Orders</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex flex-col">
                      <span>{order.customerName}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>{order.serviceType} ({order.weight}kg)</div>
                      <div className="font-semibold text-gray-900 mt-1">₱{order.price}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getStatusBadge(order.status)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <select 
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                        className="mt-1 block w-full pl-3 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                      >
                        <option value="pending">Pending</option>
                        <option value="washing">Washing (Running)</option>
                        <option value="drying">Drying (Running)</option>
                        <option value="folding">Folding</option>
                        <option value="ready">Ready</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : activeTab === 'machines' ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {machines.map(machine => (
            <div key={machine.id} className="bg-white shadow rounded-lg p-5 border border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-bold text-gray-900">{machine.name}</h4>
                  <p className="text-sm text-gray-500 capitalize">{machine.type}</p>
                </div>
                {getMachineStatusBadge(machine.status)}
              </div>
              {machine.status === 'in_use' && machine.timeRemaining && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Time Remaining</span>
                    <span className="font-semibold">{machine.timeRemaining} min</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(60 - machine.timeRemaining) / 60 * 100}%` }}></div>
                  </div>
                </div>
              )}
              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                <select 
                  value={machine.status}
                  onChange={(e) => updateMachineStatus(machine.id, e.target.value as MachineStatus)}
                  className="mt-1 block pl-3 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
                >
                  <option value="available">Available</option>
                  <option value="in_use">In Use</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Add New Customer</h3>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <form onSubmit={(e) => {
                e.preventDefault();
                addCustomer({ name: newCustomer.name, email: newCustomer.email });
                setNewCustomer({ name: '', email: '' });
                alert('Customer added successfully! They can log in with their email.');
              }} className="space-y-4 sm:flex sm:items-end sm:space-y-0 sm:space-x-4">
                <div className="flex-1">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={newCustomer.name}
                    onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={newCustomer.email}
                    onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add Customer
                </button>
              </form>
            </div>
          </div>
          
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Customer Accounts</h3>
            </div>
            <ul className="divide-y divide-gray-200">
              {users.filter(u => u.role === 'customer').map((customer) => (
                <li key={customer.id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-blue-600 truncate">{customer.name}</p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        {customer.email}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
