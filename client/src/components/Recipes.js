import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BACKEND_URL } from "../config/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faHeart, faPlus } from "@fortawesome/free-solid-svg-icons";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [expandedInstructions, setExpandedInstructions] = useState({});

  useEffect(() => {
    getRecipes();
  }, []);

  const getRecipes = () => {
    fetch(`${BACKEND_URL}/auth/recipe`, {
      method: "GET",
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.error(error));
  };

  const handleDeleteRecipe = async (recipeId) => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      const response = await fetch(`${BACKEND_URL}/auth/recipe/${recipeId}`, { method: "DELETE" });

      if (response.ok) {
        toast.success("Recipe deleted successfully");
        setRecipes(recipes.filter((recipe) => recipe._id !== recipeId));
      } else {
        toast.error("Failed to delete recipe");
      }
    }
  };

  const handleAddToFavorites = async (recipeId) => {
    const response = await fetch(`${BACKEND_URL}/auth/likedRecipes/${recipeId}`, { method: "POST" });
    const data = await response.json();

    if (response.ok) {
      toast.success("Recipe added to favorites successfully");
    } else if (data.error === "Recipe already exists in your favorites") {
      toast.warn("Recipe already in favorites");
    } else {
      toast.error(data.error);
    }
  };

  const toggleReadMore = (id) => {
    setExpandedInstructions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

const SearchRecipes = async (e) => {
    try {
      if (e.target.value) {
        let Searchedrecipes = await fetch(
          `${BACKEND_URL}/auth/searchRecipes/${e.target.value}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        Searchedrecipes = await Searchedrecipes.json();

        if (!Searchedrecipes.message) {
          setRecipes(Searchedrecipes);
        } else {
          setRecipes([]);
        }
      } else {
        getRecipes();
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 p-8">
      <div className="flex justify-center mb-8">
        <input
          type="text"
          className="w-full max-w-xl px-5 py-3 text-lg border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Search delicious recipes..."
          onChange={(e) => SearchRecipes(e)}
        />
      </div>

      {recipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <div key={recipe._id} className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-100 hover:scale-105">
              <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-64 object-cover" />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">{recipe.title}</h2>

                <h3 className="text-lg font-semibold text-indigo-600 mb-2">Ingredients:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
                  {recipe.ingredients.map((ingredient, index) => <li key={index}>{ingredient}</li>)}
                </ul>

                <h3 className="text-lg font-semibold text-indigo-600 mb-2">Instructions:</h3>
                <div className="text-gray-700 mb-4">
                  {expandedInstructions[recipe._id]
                    ? recipe.instructions.split("\n").map((step, index) => <p key={index}>{step}</p>)
                    : recipe.instructions.split("\n").slice(0, 2).map((step, index) => <p key={index}>{step}</p>)}

                  {recipe.instructions.split("\n").length > 2 && (
                    <button onClick={() => toggleReadMore(recipe._id)} className="text-indigo-600 font-semibold hover:underline mt-2 block">
                      {expandedInstructions[recipe._id] ? "Read Less" : "Read More"}
                    </button>
                  )}
                </div>

                <div className="flex justify-between items-center mt-6">
                   <button className="flex items-center gap-2 px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition duration-100"  onClick={() => handleDeleteRecipe(recipe._id)}>
                    <FontAwesomeIcon icon={faTrash} className="hover:text-gray-300 transition duration-200" /> Delete
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 transition duration-100"  onClick={() => handleAddToFavorites(recipe._id)} >
                    <FontAwesomeIcon icon={faHeart} className="hover:text-pink-400 transition duration-200" /> Favorite
                  </button>
                  <Link to={`/updateRecipe/${recipe._id}`} className="flex items-center gap-2 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-100">
                    <FontAwesomeIcon icon={faEdit} className="hover:text-gray-300 transition duration-200" /> Edit
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h2 className="text-center text-2xl text-gray-700">No Recipes Found</h2>
      )}

      <div className="flex justify-center mt-8">
        <Link to="/addRecipe" className="flex items-center gap-2 px-6 py-3 text-white bg-green-500 rounded-lg shadow-md hover:bg-green-600 transition duration-100">
          <FontAwesomeIcon icon={faPlus} className="hover:text-gray-300 transition duration-200" /> Add Extra Recipe
        </Link>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Recipes;
