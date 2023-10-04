import React, { useEffect} from "react";

const Successfull = () => {
  // const navigate = useNavigate();
  // const [origin, setOrigin] = useState("");

  useEffect(() => {
    // Grab the URL parameters
    // const params = new URLSearchParams(window.location.search);
    // const url = params.get("url");

    // setOrigin(url);

    setTimeout(() =>{
      const message = "success"
      window.parent.postMessage(message, '*');
    },3000)
    setTimeout(() =>{
      const message = "close"
      window.parent.postMessage(message, '*');
    },4000)
  },[]);


  const closeWidget = () => {
    window.open(document.referrer, "_parent", "");
  }


  return (
    <div className="py-5 w-full px-[16px] md:px-[20px]">
      <h3 className="text-[20px] text-gray-500 text-center  font-bold pb-1">
        Transaction Successful
      </h3>
      <p className="text-[#718096] text-center text-sm mb-5"></p>
      <div className="mx-auto my-8">
        
        <svg class="ft-green-tick mx-auto" xmlns="http://www.w3.org/2000/svg" height="70" width="70" viewBox="0 0 48 48" aria-hidden="true">
        <circle class="circle" fill="#5bb543" cx="24" cy="24" r="22"/>
        <path class="tick" fill="none" stroke="#FFF" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M14 27l5.917 4.917L34 17"/>
    </svg>
      </div>

      {/* <Link to={`${origin}`}> */}
        <button
          type="button"
          onClick={closeWidget}
          className="py-[9px] items-center rounded-[8px] w-[80%]  md:w-full mx-auto bg-[#124072] text-[white] text-[14px] leading-[24px] tracking-[0.2px] font-bold flex justify-center "
        >
          Go back to page{" "}
          {/* {isLoading && (
        <svg
          class="ml-4 w-6 h-6 text-white animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )} */}
        </button>{" "}
      {/* </Link> */}
    </div>
  );
};

export default Successfull;
