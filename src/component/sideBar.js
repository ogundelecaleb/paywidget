import React, { useState } from "react";
import { BsCreditCard } from "react-icons/bs";
import { Link } from "react-router-dom";

const SideBar = ({ logo }) => {
  const [card, setCard] = useState(false)
  const [transfer, setTransfer] = useState(false)

  
  return (
    // <div className=" max-w-[24%] md:max-w-[27%] ml-0">
    <div className=" md:block w-full md:max-w-[27%] ml-0 shadow">
      <div className=" md:min-h-full bg-[#E2E8F0] pt-3 md:pb-7 sticky top-0 m-0  flex flex-row md:flex-col ">
        <div className="md:pb-[9px]  border-b border-gray-300 ">
          <img
            alt=""
            src={logo || "../../paylodelogo.png"}
            className=" ml-[10px] h-[40px] w-[60px] md:w-[100px] md:mr-[81px] object-contain hidden md:block "
          />
        </div>
        <Link
          to="/"
          className={`overflow-hidden relative btn4  py-[13px] px-[8px] md:px-[8px] ${window.location.pathname === "/" ? "text-[#174e88d2] " : "text-gray-500 "} border-b border-gray-300  tracking-[0.2px] font-medium text-[14px] leading-[21px]`}
          onClick={()=>setCard(!card)}
        >
          <button
            to=""
            className="flex tracking-[0.2px] font-medium text-[14px] leading-[21px] items-center w-full "
          >
           
            <BsCreditCard className="mr-[12px] text-lg" />
            <p className="md:block hidden">Card</p>
            <p className=" md:hidden"> Pay With Card</p>
          </button>
          <span  className="absolute inset-x-0 h-1 top-0 bg-[#174e88d2] w-[30%]"></span>
          <div  className={`${window.location.pathname === "/" || window.location.pathname === "/index/otp" || window.location.pathname === "/index/pin" || window.location.pathname === "/index/success" || window.location.pathname === "/index/failed"  ? "hidden md:block" : "hidden"} absolute inset-x-0 h-1 top-0 bg-[#174e88d2]`}></div>
        </Link>
        {/* <Link
          to="/index/transfer"
          className={`overflow-hidden relative btn4  py-[13px] px-[8px] md:px-[8px] ${window.location.pathname === "/index/transfer" ? "text-[#174e88d2] " : "text-gray-500 "} border-b border-gray-300  tracking-[0.2px] font-medium text-[14px] leading-[21px]`}
          onClick={()=>setCard(!card)}
        >
          <button
            to=""
            className="flex tracking-[0.2px] font-medium text-[14px] leading-[21px] items-center w-full "
          >
           
            <BsCreditCard className="mr-[12px] text-lg" />
            <p className={`${window.location.pathname === "/index/transfer" ? "text-[#174e88d2]" : "text-gray-500"} md:block hidden`}>Transfer</p>
            <p className=" md:hidden"> Pay Bank Transfer</p>
          </button>
          <span  class="absolute inset-x-0 h-1 top-0 bg-[#174e88d2] w-[30%]"></span>
          <div  className={`${window.location.pathname === "/index/transfer" ? "block" : "hidden"} absolute inset-x-0 h-1 top-0 bg-[#174e88d2]`}></div>
        </Link> */}
      </div>
    </div>
  );
};

export default SideBar;
