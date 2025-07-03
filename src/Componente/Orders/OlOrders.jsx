import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContextProvider";
import axios from "axios";

export default function OlOrders() {
  let { idUser } = useContext(AuthContext);
  async function getOrders() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${idUser}`
    );
    console.log(data);
  }
  useEffect(() => {
    getOrders();
  }, []);

  return <div>OlOrders</div>;
}
