import React from "react";
import { useNavigate,useOutletContext } from "react-router-dom";


const CardDetails = () => {
    const navigate = useNavigate()
    const [successCallbackStr] = useOutletContext();
    // const [cardNumber, setCardNumber] = useState("");


    /*eslint no-new-func: 0*/
    const onCloseCallback = new Function(`return (${successCallbackStr})`)();


    // function handleCardNumber(event) {
    //   let new_cardNumber = event.target.value;
    //   setCardNumber(new_cardNumber);
  
    //   // regular expressions to validate Card Number
    //   var lowerCase = /[a-z]/g;
    //   var upperCase = /[A-Z]/g;
    //   var numbers = /[0-9]/g;
    //   var specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
    //   if (!new_pass.match(upperCase)) {
    //     setErrorMessage("Password should contains Uppercase letters!");
    //   } else if (!new_pass.match(lowerCase)) {
    //     setErrorMessage("Password should contain lowercase letters!");
    //   } else if (!new_pass.match(numbers)) {
    //     setErrorMessage("Password should contains numbers also!");
    //   } else if (!new_pass.match(specialCharRegExp)) {
    //     setErrorMessage("Password should contains special character e.g *@#!% !");
    //   } else if (new_pass.length < 6) {
    //     setErrorMessage("Password length should be more than 10.");
    //   } else {
    //     setErrorMessage("Password is strong!");
    //   }
    //   // for confirm password
    // }
  
    function handlePayment(){
      navigate("/index/otp")
      if (typeof onCloseCallback === "function") {
        onCloseCallback({ status: "This is success message" });
      }
    }

    function c_cvv_format(){
      
      const value = document.getElementById("c_cvv").value;
      if(value.toString().length >2){
          return false;
      }else{
          var v = value.replace(
              /[^0-9]/g, '' // To allow only numbers
          )
          document.getElementById("c_cvv").value = v;
      }    
  }
  return (
    <div className="py-5  px-[20px]">
      {/* <div className="flex  justify-end"> */}
      <div className="text-right text-[10px] pr-3 mt-2">
        <p>admin@paylodeservices.com</p>
        <p>Pay #20,000.00</p>
      </div>
      {/* </div> */}

      <form onSubmit="">
        <div className="overflow-hidden  sm:rounded-md">
          <div className="container mt-[30px]">
            <p className="text-[#718096]  text-[10px] leading-[21px] tracking-[0.2px] font-bold mb-[7px]">
              Card Number
            </p>
            <input
              type="text"
              className="block w-full px-4 py-[9px] placeholder:text-[#A0AEC0] placeholder:font-normal font-medium text-[#1A202C] text-[16px] leading-[24px] tracking-[0.3px] bg-white border border-[#E2E8F0]  rounded-xl focus:outline-none focus:ring-[#FFDB47] focus:border-[#FFDB47] sm:text-sm"
              placeholder="card number"
              autofocus
              required

              // value={phoneNumber}
              // onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="flex items-center flex-col md:flex-row gap-2 md:gap-5 mt-2">
            <div className="container ">
              <p className="text-[#718096]  text-[10px] leading-[21px] tracking-[0.2px] font-bold mb-[7px]">
                Expry Date
              </p>
              <div className="flex items-center justify-between gap-4">
                <select
                  type="text"
                  className="block w-full  px-1 py-[9px] placeholder:text-[#A0AEC0] placeholder:font-normal font-medium text-[#1A202C] text-[10px] leading-[24px] tracking-[0.3px] bg-white border border-[#E2E8F0]  rounded-xl focus:outline-none focus:ring-[#FFDB47] focus:border-[#FFDB47] sm:text-sm"
                  autofocus
                  required
                  // value={role}
                  // onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">Select Month </option>
                  <option value="1">01</option>
                  <option value="2">02</option>
                  <option value="3">03</option>
                  <option value="4">04</option>
                  <option value="5">05</option>
                  <option value="6">06</option>
                  <option value="7">07</option>
                  <option value="8">08</option>
                  <option value="9">09</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>

                <select
                  type="text"
                  className="block w-full  px- py-[9px] placeholder:text-[#A0AEC0] placeholder:font-normal font-medium text-[#1A202C] text-[10px] leading-[24px] tracking-[0.3px] bg-white border border-[#E2E8F0]  rounded-xl focus:outline-none focus:ring-[#FFDB47] focus:border-[#FFDB47] sm:text-sm"
                  autofocus
                  required
                  // value={role}
                  // onChange={(e) => setRole(e.target.value)}
                >
                  <option value="text-[10px]">Select Year </option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                  <option value="2029">2029</option>
                  <option value="2030">2030</option>
                  <option value="2031">2031</option>
                  <option value="2032">2032</option>
                  <option value="2033">2033</option>
                </select>
              </div>
            </div>

            <div className="container  md:w-[35%] ">
              <p className="text-[#718096] text-[10px] leading-[21px] tracking-[0.2px] font-bold mb-[7px]">
                CVV
              </p>
              <input
              id="c_cvv"
                type="tel"
                className="block w-full px-4 py-[9px] placeholder:text-[#A0AEC0] placeholder:font-normal font-medium text-[#1A202C] text-[16px] leading-[24px] tracking-[0.3px] bg-white border border-[#E2E8F0]  rounded-xl focus:outline-none focus:ring-[#FFDB47] focus:border-[#FFDB47] sm:text-sm"
               
                placeholder="435"
                autofocus
                required
                onkeypress={(e)=> c_cvv_format(e)} maxlength="3"
                // value={phoneNumber}
                // onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={handlePayment}
              type="submit"
              className="py-[9px] items-center rounded-[24px] w-[50%] mx-auto bg-[#124072] text-[white] text-[10px] leading-[24px] tracking-[0.2px] font-bold flex justify-center "
            >
              Pay NGN 20,000{" "}
              {/* {loading && (
          <svg
            className="ml-4 w-6 h-6 text-[white] animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )} */}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CardDetails;
