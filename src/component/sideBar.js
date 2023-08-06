import React from "react";
import { BsCreditCard } from "react-icons/bs";

const SideBar = ({logo}) => {
  return (
   // <div className=" max-w-[24%] md:max-w-[27%] ml-0">
   <div className=" w-full md:max-w-[27%] ml-0 shadow">
      <div className=" md:min-h-full bg-[#E2E8F0] pt-3 md:pb-7 sticky top-0 m-0  flex flex-row md:flex-col ">
        <div className="md:pb-[9px]  border-b border-gray-300 ">
          <img
            alt=""
            src={logo || "../../paylodelogo.png"}
            className=" ml-[10px] h-[40px] w-[60px] md:w-[100px] md:mr-[81px] object-contain hidden md:block "
          />
          
        </div>
        <button
          to=""
          className="ml-[5px] py-[13px] px-[5px] md:px-[8px] text-gray-500  flex tracking-[0.2px] font-medium text-[14px] leading-[21px] items-center md:mb-[12px]"
        >
          <BsCreditCard className="mr-[12px] text-lg" />
          <span className="md:block hidden">Card</span>
          <span className=" md:hidden"> Pay With Card</span>
         
        </button>
      </div>
    </div>
  );
};

export default SideBar;
