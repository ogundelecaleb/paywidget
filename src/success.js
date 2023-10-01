import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const Success = () => {
  const [origin, setOrigin] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Grab the URL parameters
    const params = new URLSearchParams(window.location.search);
    const url = params.get("url");

    setOrigin(url);
  });

  const redirect = () => {
    if (window.opener) {

      // Open the parent page in a new tab
      window.open(origin, "_blank");
    }
  };

  return (
    <div
      className="fixed inset-0 z-10 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
       
          className="fixed inset-0 transition-opacity bg-[#29292980] "
          aria-hidden="true"
        >
          {" "}
        </div>
        {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block py-[20px] px-[40px] relative overflow-hidden text-left align-bottom transition-all transform bg-[white] rounded-xl shadow-xl sm:my-8 sm:align-middle sm:max-w-[28rem] sm:w-full">
          <h3 className="text-[20px] text-[#1a202c] text-center  font-bold pb-1">
            Payment Successfull !!
          </h3>
          <p className="text-[#718096] text-center text-sm mb-5">Thank You!</p>
          <div className="mx-auto my-8">
          <svg class="ft-green-tick mx-auto" xmlns="http://www.w3.org/2000/svg" height="70" width="70" viewBox="0 0 48 48" aria-hidden="true">
        <circle class="circle" fill="#5bb543" cx="24" cy="24" r="22"/>
        <path class="tick" fill="none" stroke="#FFF" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M14 27l5.917 4.917L34 17"/>
    </svg>
          </div>
          
            <button
              type="button"
              onClick={redirect}
              class="py-[9px] mx-auto rounded-[16px] w-full md:w-[60%] my-[15px] bg-[#124072] text-[#ffffff] text-[14px] leading-[24px] tracking-[0.2px] flex justify-center "
            >
              Go Back To Page{" "}

            </button>
   
        </div>
      </div>
    </div>
  );
};

export default Success;
