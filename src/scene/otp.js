import React, { useState, useEffect } from "react";
import OTPInput, { ResendOTP } from "otp-input-react";
import { useNavigate, useLocation, useOutletContext } from "react-router-dom";

const Otp = () => {
  const location = useLocation();
  const [
    successCallbackStr,
    publicKey,
    merchantLogo,
    sessionRef,
    currency,
    amount,
    BaseApiUrl,
    email,
    firstName,
    lastName,
    phoneNumber,
    redirectUrl,
  ] = useOutletContext();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [transactionStat, setTransactionStat] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("otp:", otp);
    console.log(transactionStat);
  });

  async function handleOtp(e) {
    e.preventDefault();
    setLoading(true);
    const response = await fetch(`${BaseApiUrl}/payment/validate`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Public-Key": publicKey,
      },
      body: JSON.stringify({
        otp: otp,
        transactionReference: location.state.transactionReference,
      }),
    });
    const data = await response.json(); //

    if (data?.data && data?.data?.transactionStatus === "Processing") {
      console.log(data?.data?.transactionStatus);
      fetch(
        `${BaseApiUrl}/payment/status?transactionReference=${data?.data?.transactionReference}&clientReference=${data?.data?.clientReference}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Public-Key": publicKey,
          },
        }
      )
        .then((response) => response.json())
        .then((res) => {
          if (res.data?.transactionStatus == "Success") {
           

            navigate("/index/success");
          } else if (res.data?.transactionStatus == "Failed") {
            navigate("/index/failed");
            

            navigate("/index/success");
          }
        });
  
      setLoading(false);
      console.log("otpprocessing");
    }else if (data?.data && data?.data?.transactionStatus === "Success"){
      navigate("/index/success");
      setLoading(false);
      console.log("otpsuccessful");
    }
    
    else if (
      !data.isSuccessful ||
      data?.data?.transactionStatus === "Failed"
    ) {
      navigate("/index/failed");
      setLoading(false);
      console.log("error message:", data.message || data.title || "");
    }
  }

  return (
    <div className="py-5 w-full  px-[20px]">
      <h3 className="text-[20px] text-gray-500 text-center  font-bold pb-1">
        Validate OTP
      </h3>
      <p className="text-[#718096] text-sm mb-5">
        {location.state.providermessage ? location.state.providermessage : "" }
      </p>

      <OTPInput
        className="py-7 text-[#323942] flex justify-center mb-4 mx-auto"
        value={otp}
        onChange={setOtp}
        autoFocus
        OTPLength={6}
        otpType="number"
        disabled={false}
        secure
        inputStyles={{
          padding: "1px",
          width: "28px",
          height: "28px",
          borderRadius: "5px",
          border: "1px solid #718096",
          margin: "0 2px",
          maximumWidth: "300px",
          

          // background-color: "#718096",
        }}
      />
      {/* <ResendOTP handelResendClick={() => console.log("Resend clicked")} /> */}

      <button
        type="button"
        onClick={handleOtp}
        className="py-[9px] items-center rounded-[8px] w-[80%]  md:w-full mx-auto bg-[#124072] text-[white] text-[14px] leading-[24px] tracking-[0.2px] font-bold flex justify-center "
      >
        Validate OTP{" "}
        {loading && (
          <img
            src="../../spinner1.svg"
            alt=""
            className="ml-4 w-8 h-8 bg-transparent"
          />
        )}
      </button>
    </div>
  );
};

export default Otp;
