import React from "react";
import img11 from "../../assets/images/amazon-pay.png";
import img12 from "../../assets/images/American-Express-Color.png";
import img13 from "../../assets/images/mastercard.webp";
import img14 from "../../assets/images/paypal.png";
import img15 from "../../assets/images/get-apple-store.png";
import img16 from "../../assets/images/get-google-play.png";

export default function FooterUp() {
  return (
    <>
      <footer className="bg-slate-100 py-10 px-4 mt-10 ">
        <div className="container mx-auto text-left">
          <h3 className="text-3xl font-semibold mb-2 text-slate-600">
            Get the FreshCart app
          </h3>
          <p className="text-sm font-semibold text-slate-500 mb-4">
            We will send you a link, open it on your phone to download the app.
          </p>

          <div className="w-full flex gap-2 mb-6">
            <input
              type="email"
              placeholder="Email..."
              className="w-4/5 border border-gray-300 rounded px-4 py-2"
            />
            <button className="w-1/5 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
              Share Link
            </button>
          </div>

          <div className="flex items-center flex-wrap gap-4 mb-3 mt-5 justify-between border-y-2 border-gray-200">
            <div className="flex items-center flex-wrap gap-4 mb-3">
              <h3 className=" text-l font-semibold  text-slate-600">
                Payment Partners:
              </h3>
              <img src={img11} alt="Mastercard" className="w-20" />
              <img src={img12} alt="Visa" className="w-20" />
              <img src={img13} alt="Paypal" className="w-20" />
              <img src={img14} alt="Paypal" className="w-20" />
            </div>
            <div className="flex items-center flex-wrap gap-4 mb-3">
              <h3 className="text-l font-semibold  text-slate-600">
                Get from me Khattab
              </h3>
              <img src={img15} alt="Paypal" className="w-20" />
              <img src={img16} alt="Paypal" className="w-20" />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
