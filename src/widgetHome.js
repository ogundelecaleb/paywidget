import React, { useEffect, useState } from "react";
import SideBar from "./component/sideBar";
import Modal from "./component/Modal";
import { Outlet } from "react-router-dom";

const WidgetHome = () => {
  const [amount, setAmount] = useState("");

  useEffect(() => {
    // Grab the URL parameters
    const params = new URLSearchParams(window.location.search);
    const publicKey = params.get("publicKey");
    const secretKey = params.get("secretKey");
    const amount = params.get("amount");
    const currency = params.get("currency");
    // const onCloseCallbackStr = params.get("onCloseCallbackStr");

    // const onCloseCallback = new Function(`return (${onCloseCallbackStr})`)();

    

    setAmount(amount);
    // processPayment(publicKey, secretKey, amount, currency);
  }, []);

  // function processPayment(publicKey, secretKey, currency) {
   
  //   console.log("Payment details:");
  //   console.log("Public Key:", publicKey);
  //   console.log("Secret Key:", secretKey);
  //   console.log("Amount:", amount);
  //   console.log("Currency:", currency);
  
  // }

  const [isOpen, setIsOpen] = useState(true);

  const handleCloseModal = () => {
    setIsOpen(false);
    // if (typeof onCloseCallback === "function") {
    //   onCloseCallback({ status: "closed" });
    // }
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <div className="inline-block relative overflow-hidden text-left align-bottom transition-all transform bg-[white] rounded-2xl shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <svg
            onClick={handleCloseModal}
            className="cursor-pointer absolute right-1 top-2 "
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.9497 7.05032L7.05021 16.9498"
              stroke="#171717"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7.05029 7.05032L16.9498 16.9498"
              stroke="#171717"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <div className=" md:mt-0 md:col-span-2">
            <div className="flex">
              <SideBar />
              <Outlet />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default WidgetHome;
