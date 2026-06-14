import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
function OrderForm() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const [formData, setFormData] = useState({
    customerName: "",
    mobile: "",
    address: "",
    pincode: "",
    quantity: 1,
  });
const [orderPlaced, setOrderPlaced] = useState(false);
  useEffect(() => {
    axios
      .get("https://lg-accessories-store.onrender.com/api/products")
      .then((res) => {
        const selectedProduct = res.data.find(
          (item) => item.id === parseInt(id)
        );

        setProduct(selectedProduct);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const totalPrice =
    (product?.price || 0) * Number(formData.quantity || 1);

  const handleSubmit = async () => {
    if (
      !formData.customerName ||
      !formData.mobile ||
      !formData.address ||
      !formData.pincode
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post("https://lg-accessories-store.onrender.com/api/orders", {
        customer_name: formData.customerName,
        mobile: formData.mobile,
        address: formData.address,
        pincode: formData.pincode,
        product_id: parseInt(id),
        quantity: parseInt(formData.quantity),
        total_price: totalPrice,
      });

      setOrderPlaced(true);

      setFormData({
        customerName: "",
        mobile: "",
        address: "",
        pincode: "",
        quantity: 1,
      });
    
    } catch (error) {
      console.log(error);
      alert("Failed to save order");
    }
  };
  if (orderPlaced) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-50 p-6">

      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden">

        <div className="bg-gradient-to-r from-green-500 to-green-700 text-white text-center p-10">

          <div className="text-8xl mb-4">
            ✅
          </div>

          <h1 className="text-4xl font-bold">
            Order Placed Successfully
          </h1>

          <p className="mt-3 text-lg">
            Thank you for shopping with LG Accessories Store
          </p>

        </div>

        <div className="p-8">

          <div className="bg-gray-100 rounded-2xl p-6 mb-6">

            <h2 className="text-2xl font-bold mb-4">
              Order Details
            </h2>

            <p>
  <strong>Product:</strong> {product?.name}
</p>

<p>
  <strong>Quantity:</strong> {formData.quantity}
</p>

<p>
  <strong>Total Amount:</strong> ₹{totalPrice}
</p>

          </div>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-3xl p-6 text-center">

  <h3 className="text-3xl font-bold text-blue-700 mb-2">
    📦 Track Your Order
  </h3>

  <p className="text-gray-600 mb-4">
    Call our support team for live order tracking
  </p>

  <a
    href="tel:9959343383"
    className="inline-block text-5xl font-bold text-[#a50034] hover:scale-110 transition"
  >
    9959343383
  </a>

  <div className="mt-5">
    <a
      href="tel:9959343883"
      className="inline-block bg-green-600 text-white px-8 py-4 rounded-2xl text-xl font-bold shadow-lg hover:bg-green-700 transition"
    >
      📞 Call Now
    </a>
    <div className="mt-6 text-center">

  <Link
    to="/"
    className="inline-block bg-gradient-to-r from-[#a50034] to-[#e00052] text-white px-10 py-4 rounded-2xl text-xl font-bold shadow-xl hover:scale-105 transition"
  >
    🛍️ Continue Shopping
  </Link>

</div>
  </div>
</div>

        </div>

      </div>

    </div>
  );
}
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200">

      {/* Header */}
      <div className="bg-gradient-to-r from-black via-[#111827] to-[#a50034] text-white py-8 shadow-xl">
        <h1 className="text-center text-3xl md:text-5xl font-bold">
          LG Accessories Store
        </h1>

        <p className="text-center text-gray-300 mt-2">
          Genuine LG Products • Fast Delivery • Cash On Delivery
        </p>
      </div>

      <div className="max-w-5xl mx-auto p-4 md:p-8">

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

          {/* Banner */}
          <div className="bg-gradient-to-r from-[#a50034] to-[#e00052] text-white p-8">

            <h2 className="text-3xl md:text-5xl font-bold text-center">
              Complete Your Order
            </h2>

            <p className="text-center mt-3 text-lg">
              Secure Checkout Experience
            </p>

            <div className="flex justify-center mt-5">
              <span className="bg-white text-[#a50034] px-6 py-2 rounded-full font-bold shadow">
                Product ID : {id}
              </span>
            </div>

          </div>

          <div className="p-6 md:p-10">

            {/* Order Summary */}
            <div className="bg-gradient-to-r from-[#111827] to-[#1f2937] text-white rounded-3xl p-8 mb-8 shadow-xl">

              <h3 className="text-3xl font-bold text-center mb-6">
                🛒 Order Summary
              </h3>

              <div className="grid md:grid-cols-2 gap-4">

                <div className="bg-white/10 p-4 rounded-2xl">
                  <p className="text-gray-300">
                    Product
                  </p>
                  <p className="font-bold text-xl">
                    {product?.name || "Loading..."}
                  </p>
                </div>

                <div className="bg-white/10 p-4 rounded-2xl">
                  <p className="text-gray-300">
                    Delivery
                  </p>
                  <p className="font-bold text-xl">
                    Home Delivery
                  </p>
                </div>

              </div>

              <div className="grid md:grid-cols-3 gap-3 mt-6">

                <div className="bg-green-500 p-3 rounded-xl text-center font-bold">
                  ✓ Genuine
                </div>

                <div className="bg-blue-500 p-3 rounded-xl text-center font-bold">
                  🚚 Fast
                </div>

                <div className="bg-yellow-400 text-black p-3 rounded-xl text-center font-bold">
                  💵 COD
                </div>

              </div>

            </div>

            {/* Customer Information */}
            <h3 className="text-3xl font-bold text-center mb-8 text-gray-800">
              Customer Information
            </h3>

            <div className="grid md:grid-cols-2 gap-5">

              <div>
                <label className="font-semibold block mb-2">
                  Customer Name
                </label>

                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  placeholder="Enter Your Name"
                  className="w-full bg-gray-50 border-2 border-gray-200 p-4 rounded-2xl shadow-sm focus:outline-none focus:border-[#a50034]"
                />
              </div>

              <div>
                <label className="font-semibold block mb-2">
                  Mobile Number
                </label>

                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Enter Mobile Number"
                  className="w-full bg-gray-50 border-2 border-gray-200 p-4 rounded-2xl shadow-sm focus:outline-none focus:border-[#a50034]"
                />
              </div>

            </div>

            <div className="mt-5">

              <label className="font-semibold block mb-2">
                Delivery Address
              </label>

              <textarea
                rows="4"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter Complete Address"
                className="w-full bg-gray-50 border-2 border-gray-200 p-4 rounded-2xl shadow-sm focus:outline-none focus:border-[#a50034]"
              />

            </div>

            <div className="grid md:grid-cols-2 gap-5 mt-5">

              <div>
                <label className="font-semibold block mb-2">
                  Pincode
                </label>

                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="Enter Pincode"
                  className="w-full bg-gray-50 border-2 border-gray-200 p-4 rounded-2xl shadow-sm focus:outline-none focus:border-[#a50034]"
                />
              </div>

              <div>
                <label className="font-semibold block mb-2">
                  Quantity
                </label>

                <input
                  type="number"
                  name="quantity"
                  min="1"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border-2 border-gray-200 p-4 rounded-2xl shadow-sm focus:outline-none focus:border-[#a50034]"
                />
              </div>

            </div>

            {/* Total Price */}
            <div className="mt-8 bg-gradient-to-r from-[#a50034] to-[#e00052] rounded-3xl p-6 text-white shadow-xl">

              <h3 className="text-center text-2xl font-bold mb-5">
                💰 Final Price Summary
              </h3>

              <div className="grid md:grid-cols-3 gap-4">

                <div className="bg-white/10 rounded-2xl p-4 text-center">
                  <p>Product Price</p>
                  <h4 className="text-3xl font-bold">
                    ₹{product?.price || 0}
                  </h4>
                </div>

                <div className="bg-white/10 rounded-2xl p-4 text-center">
                  <p>Quantity</p>
                  <h4 className="text-3xl font-bold">
                    {formData.quantity}
                  </h4>
                </div>

                <div className="bg-white text-[#a50034] rounded-2xl p-4 text-center">
                  <p className="font-semibold">
                    Final Total
                  </p>
                  <h4 className="text-4xl font-bold">
                    ₹{totalPrice}
                  </h4>
                </div>

              </div>

            </div>

            {/* Trust Badges */}
            <div className="grid md:grid-cols-3 gap-4 mt-8">

              <div className="bg-white border rounded-2xl p-4 shadow text-center">
                <div className="text-3xl">🔒</div>
                <p className="font-bold">Secure Checkout</p>
              </div>

              <div className="bg-white border rounded-2xl p-4 shadow text-center">
                <div className="text-3xl">🚚</div>
                <p className="font-bold">Free Delivery</p>
              </div>

              <div className="bg-white border rounded-2xl p-4 shadow text-center">
                <div className="text-3xl">⭐</div>
                <p className="font-bold">100% Genuine LG</p>
              </div>

            </div>

            {/* Buttons */}
            <div className="grid md:grid-cols-2 gap-5 mt-10">

              <button
  onClick={() => {
    const whatsappNumber = "919959343883";

    const message = `
🛒 LG Accessories Order

👤 Name: ${formData.customerName || ""}

📱 Mobile: ${formData.mobile || ""}

📍 Address: ${formData.address || ""}

📮 Pincode: ${formData.pincode || ""}

📦 Product: ${product?.name || "LG Genuine Accessory"}

🔢 Quantity: ${formData.quantity}

💰 Total Amount: ₹${totalPrice}

Please confirm my order.
`;

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  }}
  className="bg-gradient-to-r from-green-500 to-green-700 text-white py-5 rounded-2xl text-xl font-bold shadow-xl hover:scale-105 transition"
>
  📱 WhatsApp Order
</button>

              <button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-[#a50034] to-[#e00052] text-white py-5 rounded-2xl text-xl font-bold shadow-xl hover:scale-105 transition"
              >
                🛒 Confirm Order
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default OrderForm;