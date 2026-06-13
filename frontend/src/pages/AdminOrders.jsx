import { useEffect, useState } from "react";
import axios from "axios";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/orders")
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-4xl font-bold text-center mb-8">
        Orders Dashboard
      </h1>

      <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">

        <table className="w-full">

          <thead>
            <tr className="border-b bg-gray-50">
              <th className="p-3">ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Mobile</th>
              <th className="p-3">Address</th>
              <th className="p-3">Qty</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">

                <td className="p-3">{order.id}</td>

                <td className="p-3 font-semibold">
                  {order.customer_name}
                </td>

                <td className="p-3">
                  {order.mobile}
                </td>

                <td className="p-3 max-w-xs break-words">
                  {order.address}
                </td>

                <td className="p-3">
                  {order.quantity}
                </td>

                <td className="p-3 font-bold text-green-600">
                  ₹{order.total_price}
                </td>

                <td className="p-3">
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                    {order.status}
                  </span>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}

export default AdminOrders;