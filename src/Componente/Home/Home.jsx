import React, { useState } from "react";
import DispalyProdect from "../Displayprodect/DispalyProdect";
import CatogerSlider from "../CatogerSlider/CatogerSlider";
import SliderHedar from "../sliderHedar/SliderHedar";

export default function Home() {
  return (
    <>
      {/* responsive from 2 componente */}
      <SliderHedar />
      <CatogerSlider />
      <DispalyProdect />
    </>
  );
}
