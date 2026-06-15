import AdminOrders from "./pages/AdminOrders";
import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails";
import lgLogo from "./assets/lg-logo.jpeg";
import descaler from "./assets/products/descaler.png";
import waterfilter from "./assets/products/waterfilter.png";
import stand from "./assets/products/stand.jpeg";
import magicfilter from "./assets/products/magicfilter.jpeg";
import frontloadcover from "./assets/products/frontloadcover.jpeg";
import toploadcover from "./assets/products/toploadcover.jpeg";
import OrderForm from "./pages/OrderForm";
function App() {
  const products = [
  {
    id: 1,
    name: "LG Washing Machine Powder Descaler",
    description: "Removes tough scale, detergent residue and bad odor from washing machines",
    price: 799,
  },
  {
    id: 2,
    name: "LG GentlCare Liquid Detergent",
    description: "Deep cleaning liquid detergent for clothes with long-lasting freshness",
    price: 299,
  },
  {
    id: 3,
    name: "LG Washing Machine Stand",
    description: "Heavy duty anti-vibration washing machine stand",
    price: 1399,
  },
  {
    id: 4,
    name: "LG Top Load Washing Machine Magic Filter",
    description: "Original LG lint filter for top load washing machines",
    price: 499,
  },
  {
    id: 5,
    name: "LG Front Load Washing Machine Cover",
    description: "Premium waterproof and dustproof cover for front load washing machines",
    price: 699,
  },
  {
    id: 6,
    name: "LG Top Load Washing Machine Cover",
    description: "Premium waterproof and dustproof cover for top load washing machines",
    price: 659,
  }
];
  const [search, setSearch] = useState("");

 const originalPrices = {
  "LG Washing Machine Powder Descaler": 899,
  "LG GentlCare Liquid Detergent": 399,
  "LG Washing Machine Stand": 1599,
  "LG Top Load Washing Machine Magic Filter": 563,
  "LG Front Load Washing Machine Cover": 799,
  "LG Top Load Washing Machine Cover": 769,
};
const productImages = {
  "LG Washing Machine Powder Descaler": descaler,
  "LG GentlCare Liquid Detergent": waterfilter,
  "LG Washing Machine Stand": stand,
  "LG Top Load Washing Machine Magic Filter": magicfilter,
  "LG Front Load Washing Machine Cover": frontloadcover,
  "LG Top Load Washing Machine Cover": toploadcover,
};
  

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
  <Routes>
    <Route
      path="/"
      element={
        <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="bg-[#a50034] text-white shadow-lg sticky top-0 z-50">
  <div className="w-full px-4 md:px-10 lg:px-16 py-6 flex justify-between items-center">

    <div>
      <h1 className="text-2xl md:text-5xl font-bold leading-none">
        LG Accessories
      </h1>

      <p className="text-xs md:text-sm mt-2 text-white/70">
        AJ Enterprises | Authorized LG Service Center
      </p>
    </div>

    <div className="hidden md:flex gap-10 text-lg">
      <a
        href="tel:+918074856866"
        className="cursor-pointer hover:text-gray-200"
      >
        CONTACT
      </a>
    </div>

  </div>
</nav>

     

      {/* Search */}
      <div className="w-full px-4 md:px-10 lg:px-16 py-6">
        <input
          type="text"
          placeholder="Search accessories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-4 rounded-xl border border-gray-300 shadow-sm text-lg"
        />
      </div>

      

      {/* Products */}
      <div className="w-full px-4 md:px-10 lg:px-16 pb-16">

        <h2 className="text-3xl md:text-5xl font-bold text-center mb-10">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300"
            >

             {/* Product Image */}
<div className="h-64 md:h-72 bg-white flex items-center justify-center p-4">

  {productImages[product.name] ? (
    <img
      src={productImages[product.name]}
      alt={product.name}
      className="max-w-full max-h-full object-contain"
      style={{
        width: "auto",
        height: "100%",
      }}
    />
  ) : (
    <div className="w-full h-full flex items-center justify-center">
      <span className="text-gray-500 text-xl">
        LG Product Image
      </span>
    </div>
  )}

</div>

              <div className="p-6">

                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                  {product.name}
                </h3>

                <p className="text-gray-600 text-lg mb-4">
                  {product.description}
                </p>

                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

                  <div>
  {originalPrices[product.name] && (
    <p className="text-gray-500 text-xl line-through">
      ₹{originalPrices[product.name]}
    </p>
  )}

  <p className="text-[#a50034] text-4xl font-bold">
    ₹{product.price}
  </p>

  <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">
    Offer Price
  </span>
</div>

                 <Link
                   to={`/product/${product.id}`}
                    className="bg-[#a50034] text-white px-6 py-3 rounded-lg hover:bg-[#87002a] text-center">
  View Details
</Link>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-10">

        <div className="w-full text-center px-4 md:px-10 lg:px-16">

          <h3 className="text-3xl font-bold mb-3">
            LG Accessories Store
          </h3>

          <p className="text-gray-300 text-lg">
            Genuine LG Accessories | Cash On Delivery Available
          </p>

        </div>

      </footer>

            </div>
      }
    />

    <Route
  path="/product/:id"
  element={<ProductDetails />}
/>

<Route
  path="/order/:id"
  element={<OrderForm />}
/>

<Route
  path="/admin"
  element={<AdminOrders />}
/>
  </Routes>
);
}

export default App;