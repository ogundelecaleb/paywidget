import React from "react";

const Transfer = () => {
  return (
    <div className="py-5  px-[10px]">
      <div className="text-right text-[10px] pr-3 mt-2 flex items-center justify-between ">
        <div>
          <img
            // src={merchantLogo != null ? merchantLogo : "../../paylodelogo.png"}
            src="../../paylodelogo.png"
            alt=""
            className="h-[40px] max-w-[60px] object-contain md:hidden"
          />{" "}
        </div>
        <div>
          <p>
            paylode@services.com
            {/* {email} */}
          </p>
          <p>
            Pay{" "}
            <span className="font-bold text-[#124072]">
              {/* {currency === "NGN" ? "₦" : currency === "USD" ? "$" : ""}
              {amount} */}
              NGN 2000.00
            </span>{" "}
          </p>
        </div>
      </div>
      <div className="mt-3">
        <p className="font-semibold text-[16px] mb-3 text-center">Transfer NGN 2000.00 to the account details below</p>
        <div className="flex items-center justify-between mb-2">
          <p className="text-[14px]" >Bank Name</p>
          <h4 className="text-base font-semibold"> Providus Bank</h4>
        </div>
        <div className="flex items-center justify-between mb-2">
        <p className="text-[14px]" >Account Number</p>
          <h4 className="text-base font-semibold">9374756473</h4>
        </div>
        <div className="flex items-center justify-between mb-2">
        <p className="text-[14px]" >Beneficiary Name</p>
        <h4 className="text-base font-semibold">Paylode Checkout</h4>
        </div>
        <div className="flex items-center justify-between mb-2">
        <p className="text-[14px]" >Amount</p>
        <h4 className="text-base font-semibold">NGN 2000.00</h4>
        </div>
      </div>

      <button className="text-white text-center rounded-lg py-2 bg-[#124072] mt-3 w-full">I have sent the money </button>
    </div>
  );
};

export default Transfer;
