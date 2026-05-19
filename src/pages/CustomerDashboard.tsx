import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Clock, CheckCircle2, Package } from 'lucide-react';

const SERVICE_PRICES = {
  'Wash & Fold': 50,
  'Dry Cleaning': 100,
  'Wash & Iron': 80,
};

export default function CustomerDashboard() {
  const { user } = useAuth();
  const { orders: allOrders, addOrder } = useData();
  
  const orders = allOrders.filter(o => o.customerId === user?.id);

  const [isBooking, setIsBooking] = useState(false);
  const [serviceType, setServiceType] = useState<keyof typeof SERVICE_PRICES>('Wash & Fold');
  const [weight, setWeight] = useState<number | ''>('');
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">Completed</span>;
      case 'ready':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Ready for Pickup</span>;
      case 'washing':
      case 'drying':
      case 'folding':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">In Progress ({status})</span>;
      default:
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>;
    }
  };

  const activeOrders = orders.filter(o => o.status !== 'completed');
  const pastOrders = orders.filter(o => o.status === 'completed');

  return (
    <div className="space-y-6">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Welcome back, {user?.name.split(' ')[0]}
          </h2>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button
            type="button"
            onClick={() => setIsBooking(true)}
            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            New Booking
          </button>
        </div>
      </div>

      {isBooking && (
        <div className="bg-white shadow sm:rounded-lg mb-6 border border-blue-100">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Book New Service</h3>
            <div className="mt-5 sm:flex sm:items-center">
              <div className="w-full sm:max-w-xs mr-3">
                <label className="block text-xs font-medium text-gray-700 mb-1">Service Type</label>
                <select 
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value as keyof typeof SERVICE_PRICES)}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
                >
                  <option value="Wash & Fold">Wash & Fold (₱50/kg)</option>
                  <option value="Dry Cleaning">Dry Cleaning (₱100/kg)</option>
                  <option value="Wash & Iron">Wash & Iron (₱80/kg)</option>
                </select>
              </div>
              <div className="w-full sm:max-w-xs mt-3 sm:mt-0 mr-3">
                <label className="block text-xs font-medium text-gray-700 mb-1">Estimated Weight (kg)</label>
                <input 
                  type="number" 
                  min="1"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value ? Number(e.target.value) : '')}
                  placeholder="e.g. 5" 
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border" 
                />
              </div>
              
              <div className="w-full sm:max-w-xs mt-3 sm:mt-0 mr-3 flex flex-col justify-end h-full pt-4">
                <span className="text-sm text-gray-600">Total Estimated Price:</span>
                <span className="text-lg font-bold text-blue-600">₱{(weight ? Number(weight) : 0) * SERVICE_PRICES[serviceType]}</span>
              </div>
              
            </div>
            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  if (!weight || weight <= 0) {
                    alert('Please enter a valid weight.');
                    return;
                  }
                  addOrder({
                    customerId: user!.id,
                    customerName: user!.name,
                    serviceType,
                    weight: Number(weight),
                    price: Number(weight) * SERVICE_PRICES[serviceType],
                  });
                  alert('Booking requested successfully!');
                  setIsBooking(false);
                  setWeight('');
                }}
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto text-sm"
              >
                Submit Request
              </button>
              <button
                type="button"
                onClick={() => setIsBooking(false)}
                className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Stats cards */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Clock className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Active Orders</dt>
                  <dd className="text-lg font-medium text-gray-900">{activeOrders.length}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircle2 className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Completed Orders</dt>
                  <dd className="text-lg font-medium text-gray-900">{pastOrders.length}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Current Orders</h3>
        </div>
        <ul className="divide-y divide-gray-200">
          {activeOrders.length > 0 ? activeOrders.map((order) => (
            <li key={order.id}>
              <div className="block hover:bg-gray-50">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-blue-600 truncate">
                      {order.serviceType}
                    </p>
                    <div className="ml-2 flex-shrink-0 flex">
                      {getStatusBadge(order.status)}
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        <Package className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        {order.weight} kg
                      </p>
                      <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                        <span className="font-medium">Order ID:</span> {order.id}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 gap-4">
                      <p className="font-semibold text-gray-900">
                        ₱{order.price}
                      </p>
                      <p>
                        Placed on <time dateTime={order.date}>{order.date}</time>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          )) : (
            <li className="px-4 py-8 text-center text-gray-500">
              No active orders found. Book a service to get started!
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
