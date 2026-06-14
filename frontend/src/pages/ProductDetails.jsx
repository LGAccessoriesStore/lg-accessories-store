
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import descaler from "../assets/products/descaler.png";
import waterfilter from "../assets/products/waterfilter.png";
import stand from "../assets/products/stand.jpeg";
import magicfilter from "../assets/products/magicfilter.jpeg";
import frontloadcover from "../assets/products/frontloadcover.jpeg";
import toploadcover from "../assets/products/toploadcover.jpeg";
function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

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

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <div className="bg-[#a50034] text-white py-6 text-center">
        <h1 className="text-4xl font-bold">
          LG Accessories Store
        </h1>
      </div>

      <div className="max-w-7xl mx-auto p-6">

        <Link
          to="/"
          className="text-[#a50034] font-bold text-lg"
        >
          ← Back to Products
        </Link>

        <div className="bg-white rounded-2xl shadow-lg p-8 mt-6">

          <div className="grid md:grid-cols-2 gap-10">

            {/* Product Image */}
            <div className="bg-gray-100 rounded-xl flex items-center justify-center p-6 h-[500px]">

              {productImages[product.name] ? (
                <img
                  src={productImages[product.name]}
                  alt={product.name}
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <span className="text-gray-500">
                  Product Image
                </span>
              )}

            </div>

            {/* Product Info */}
            <div>

              <h2 className="text-4xl font-bold mb-4">
                {product.name}
              </h2>

              <p className="text-gray-600 text-lg mb-4">
                {product.description}
              </p>

              <div className="mb-6">

  {originalPrices[product.name] && (
    <p className="text-2xl text-gray-500 line-through">
      ₹{originalPrices[product.name]}
    </p>
  )}

  <p className="text-[#a50034] text-5xl font-bold">
    ₹{product.price}
  </p>

  <span className="bg-green-500 text-white px-3 py-1 rounded-lg">
    Special Offer
  </span>

</div>

              <div className="space-y-4 mb-8">

                <div>
                  <span className="font-bold">
                    Category:
                  </span>{" "}
                  {product.category}
                </div>

                <div>
                  <span className="font-bold">
                    Benefits:
                  </span>{" "}
                  {product.benefits}
                </div>

                <div>
                  <span className="font-bold">
                    Specifications:
                  </span>{" "}
                  {product.specifications}
                </div>

                <div>
                  <span className="font-bold">
                    Usage:
                  </span>{" "}
                  {product.usage}
                </div>

              </div>

              <div className="flex flex-wrap gap-4">

                <a
                  href={`https://wa.me/+918074856866?text=Hi, I want to order ${product.name}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-green-600 text-white px-6 py-3 rounded-lg"
                >
                  WhatsApp Order
                </a>

                <a
    href="tel:+918074856866"
    className="bg-blue-600 text-white px-6 py-3 rounded-lg"
  >
    📞 Call To Order
  </a>
{/*
               <Link
                to={`/order/${product.id}`}
                className="bg-[#a50034] text-white px-6 py-3 rounded-lg"
            >
              Buy Now
            </Link>
*/}
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;