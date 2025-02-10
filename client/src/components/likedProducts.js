import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BACKEND_URL } from "../config/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const LikedProducts = () => {
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [expandedInstructions, setExpandedInstructions] = useState({});
  const [loading, setLoading] = useState(true);
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    fetchFavoriteProducts();
  }, []);

  const fetchFavoriteProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BACKEND_URL}/auth/likedRecipes`);

      if (!response.ok) {
        toast.error("Failed to fetch favorite products");
        return;
      }

      const data = await response.json();
      setFavoriteProducts(data);
    } catch (error) {
      toast.error(`Error fetching favorite products: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (recipeId) => {
    try {
      if (window.confirm("Are you sure you want to remove this recipe from favorites?")) {
        const response = await fetch(`${BACKEND_URL}/auth/removeLiked/${recipeId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          toast.success("Item removed successfully");
          setFavoriteProducts(favoriteProducts.filter((product) => product._id !== recipeId));
        } else {
          const data = await response.json();
          toast.error(data.error);
        }
      }
    } catch (error) {
      toast.error(`Error removing item: ${error.message}`);
    }
  };

  const toggleReadMore = (id) => {
    setExpandedInstructions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="container mx-auto py-10 px-6">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Favorites</h2>

      {loading ? (
        <h2 className="text-center text-xl text-gray-600">Loading favorite recipes...</h2>
      ) : favoriteProducts.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favoriteProducts.map((product) => (
            <li
              key={product._id}
              className="bg-white shadow-md rounded-xl overflow-hidden transition-transform duration-100 hover:scale-105"
            >
              <div className="p-6">
                {/* Product Title */}
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">{product.title}</h3>

                {/* Product Description */}
                <p className="text-gray-600 mb-4">{product.description}</p>

                {/* Product Image */}
                {product.imageUrl && (
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}

                {/* Ingredients */}
                <h4 className="text-lg font-semibold text-indigo-600 mb-2">Ingredients:</h4>
                {product.ingredients.length > 0 ? (
                  <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
                    {product.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-700 mb-4">No ingredients listed.</p>
                )}

                {/* Instructions with Read More */}
                <h4 className="text-lg font-semibold text-indigo-600 mb-2">Instructions:</h4>
                <div className="text-gray-700 mb-4">
                  {expandedInstructions[product._id]
                    ? product.instructions.split("\n").map((step, index) => <p key={index}>{step}</p>)
                    : product.instructions.split("\n").slice(0, 2).map((step, index) => <p key={index}>{step}</p>)}

                  {product.instructions.split("\n").length > 2 && (
                    <button
                      onClick={() => toggleReadMore(product._id)}
                      className="text-indigo-600 font-semibold hover:underline mt-2 block"
                    >
                      {expandedInstructions[product._id] ? "Read Less" : "Read More"}
                    </button>
                  )}
                </div>

                {/* Remove Button with Themed Hover Effect */}
                <button
                  className="flex items-center gap-2 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
                  onClick={() => handleRemoveItem(product._id)}
                  onMouseEnter={() => setHoveredItem(product._id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <FontAwesomeIcon
                    icon={faTrash}
                    className={`transition-transform duration-200 ${
                      hoveredItem === product._id ? "text-gray-900 transform scale-110" : "text-white"
                    }`}
                  />
                  Remove Item
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <h2 className="text-center text-2xl text-gray-700">No Favorites Found</h2>
      )}

      <ToastContainer />
    </div>
  );
};

export default LikedProducts;
