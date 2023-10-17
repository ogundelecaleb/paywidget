/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";

const Failed = () => {
  const navigate = useNavigate();
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    // Grab the URL parameters
    const params = new URLSearchParams(window.location.search);
    const url = params.get("url");

    setOrigin(url);
  });

  const closeWidget = () => {
    window.open(document.referrer, "_parent", "");
  }

  return (
    <div className="py-5 w-full px-[20px]">
      <h3 className="text-[18px] text-gray-500 text-center  font-semibold pb-1">
        Transaction Failed !!
      </h3>
     
      <div className="mx-auto my-8">
        <img
          src="/failed.svg"
          alt="failed"
          className="h-[40px] w-[40px] mx-auto"
        />
      </div>


      <button
          type="button"
          onClick={() => navigate("/")}
          className="py-[9px] items-center rounded-[8px] w-full mx-auto bg-[#124072] text-[white] text-[14px] leading-[24px] tracking-[0.2px] font-bold flex justify-center "
        >
          Try with another card{" "}

        </button>{" "}
      {/* <Link to={`${origin}`}> */}
        {/* <button
          type="button"
          onClick={closeWidget}
          className="py-[9px] items-center rounded-[8px] w-full mx-auto bg-[#124072] mt-2 text-[white] text-[14px] leading-[24px] tracking-[0.2px] font-bold flex justify-center "
        >
          Go back to page{" "}
          
        </button>{" "} */}
      {/* </Link> */}
    </div>
  );
};

export default Failed;
