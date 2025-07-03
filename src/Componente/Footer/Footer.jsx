import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContextProvider";
import { Facebook } from "lucide-react";

export default function Footer() {
  const { token } = useContext(AuthContext);
  return (
    <>
      {token ? (
        <div className="bg-gray-300">
          <div className="flex gap-5 justify-center items-center container mx-auto text-center py-7">
            <i className="fa-brands  cursor-pointer fa-linkedin fa-xl"></i>
            <i className="fa-brands  cursor-pointer fa-square-facebook fa-xl"></i>
            <i className="fa-brands  cursor-pointer fa-square-git fa-xl"></i>
            <i className="fa-brands  fa-square-instagram fa-xl"></i>
          </div>
        </div>
      ) : (
        <div className="bg-gray-300">
          <h5 className="container mx-auto text-center py-5">
            Copyright © Your Website 2021
          </h5>
        </div>
      )}
    </>
  );
}
