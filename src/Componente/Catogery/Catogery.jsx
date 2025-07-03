import React, { useEffect, useState } from "react";
import Loading from "../Loding/Loading";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Catogery() {
  const [categories, setCategories] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  async function getCategories() {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories`
      );
      setCategories(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  if (isLoading || !categories) return <Loading />;

  const filteredCategories =
    categories.filter((category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <>
      <div className="flex justify-center my-4">
        <input
          type="text"
          placeholder="Search category..."
          className="m-5 p-2 border border-gray-300 rounded-md w-full max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="gap-3 m-2 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
        {filteredCategories.map((category) => (
          <Link
            key={category._id}
            to={`/CatogeryDetails/${category._id}`}
            className="relative group overflow-hidden shadow-xl p-2 hover:shadow-2xl transition rounded"
          >
            <div className="relative">
              <img
                className="mb-4 h-60 w-full object-cover rounded"
                src={category.image}
                alt={category.name}
              />
            </div>
            <h3 className="text-xl mb-2 text-center font-bold text-green-600">
              {category.name}
            </h3>
          </Link>
        ))}
      </div>
    </>
  );
}
