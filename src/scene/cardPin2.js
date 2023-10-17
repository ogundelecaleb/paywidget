import React, { useState } from "react";
import { useNavigate, useLocation, useOutletContext } from "react-router-dom";
import CryptoJS from "crypto-js";
import OTPInput from "otp-input-react";

const CardPin2 = () => {
  const location = useLocation();
  const secret = process.env.REACT_APP_ENCRY_CODE;
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
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [encry, setEncry] = useState("");
  const [dencry, setDencry] = useState("");
  const [transactionRef, setTransactionRef] = useState("");

  const cardData = {
    clientReference: "",
    currencyCode: "NGN",
    sessionReference: "ead2df8b9f1d4a5c92064a4c5ad4c69d",
    channel: "Card",
    amount: 100,
    chargeParameters: {
      cardNumber: "4848422614652489",
      expiryMonth: "02",
      expiryYear: "2025",
      cardCvv: "253",
      cardPin: "1927",
    },
    customerInformation: {
      email: "mos6ke@gmail.com",
      phoneNumber: "07060876271",
      fullName: "Okunade Moses",
      customerId: "mypersonalId",
    },

    redirectUrl: "",
  };

  const strindata = JSON.stringify(cardData);

  function encryptData(data, secretKey) {
    const dataBytes = CryptoJS.enc.Utf8.parse(data);
    const keyBytes = CryptoJS.enc.Utf8.parse(secretKey);

    const encrypted = CryptoJS.AES.encrypt(dataBytes, keyBytes, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });

    return encrypted.toString();
  }

  const handlePinN = (event) => {
    event.preventDefault();

    const secretKey = process.env.REACT_APP_ENCRY_CODE;
    const data = strindata;
    const encryptedData = encryptData(data, secretKey);

    // const cipherText = AES.encrypt(strindata, secret);

    setEncry(encryptedData);

    console.log("ecryptedd:", encryptedData.toString());
  };
  function decryptData(data, secretKey) {
    const dataBytes = CryptoJS.enc.Utf8.parse(data);
    const keyBytes = CryptoJS.enc.Utf8.parse(secretKey);

    const encrypted = CryptoJS.AES.encrypt(dataBytes, keyBytes, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });

    return encrypted.toString();
  }

  async function handlePin(e) {
    e.preventDefault();
    setLoading(true);
    const response = await fetch(`${BaseApiUrl}/payment/charge`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Public-Key": publicKey,
      },
      body: JSON.stringify({
        clientReference: "",
        currencyCode: currency,
        sessionReference: sessionRef,
        channel: "Card",
        amount: amount,
        chargeParameters: {
          cardNumber: location.state.unpartCardNumber,
          expiryMonth: location.state.month,
          expiryYear: location.state.year,
          cardCvv: location.state.cvv,
          cardPin: pin,
        },
        customerInformation: {
          email: email,
          phoneNumber: phoneNumber,
          firstName: firstName,
          lastName: lastName,
        },

        redirectUrl: redirectUrl,
      }),
    });
    const data = await response.json(); //
    // console.log(data)
    // return
    if (data.isSuccessful && data.data) {
      setTransactionRef(data?.data?.transactionReference);
      if (data.data.details?.FormData?.Body !== undefined) {
        // Create a new HTML document
        let stringedBody = data?.data?.details?.FormData?.Body;
        stringedBody = stringedBody.toString() || "string body";
        var closeFunc = window["closeWidget"];
        const newTab = window.open("", "_blank");
        // Set the content of the new page
        if (newTab != null) {
          // window.open(document.referrer, "_parent", "");
          newTab.document
            .write(`<html ><head><title>Document</title></head><body>${stringedBody}<script>
            var from = document.getElementById("formId");
            from.submit();
        </script></body></html>`);

          // Close the document and focus on the new tab
          newTab.document.close();
          newTab.focus();
        }
      } else if (data.data?.details?.IsAuthRequired) {
        navigate("/index/otp", {
          state: {
            transactionReference: data?.data?.transactionReference,
            providermessage: data?.data?.details?.ProviderMessage,
          },
        });
      } else if (
        data.data?.details?.IsAuthRequired === false &&
        data.data?.details?.status === "Processing"
      ) {
        // console.log(data?.data?.transactionReference);

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
            if (res.data?.transactionStatus === "Success") {
              navigate("/index/success", {});
              // const message = "success";
              // window.parent.postMessage(message, "*");
            } else if (res.data?.transactionStatus === "Failed") {
              // const message = "failed";
              // window.parent.postMessage(message, "*");
              navigate("/index/failed");
            }
          });
      } else if (
        data.data?.details?.IsAuthRequired === false &&
        data.data?.details?.ProviderMessage === "success"
      ) {
        navigate("/index/success", {
          state: data?.data?.details?.ProviderMessage,
        });
        // const message = "success";
        //       window.parent.postMessage(message, "*");
      }
      setLoading(false);
    } else {
      setLoading(false);
      // const message = "failed";
      // window.parent.postMessage(message, "*");
      navigate("/index/failed");
    }
  }

  return (
    <div className="">
      <div className="py-5 w-[100%]  px-[20px]">
        <div className="text-right text-[10px] pr-3 mt-2 flex items-center justify-between pb-4 ">
          <div>
            <img
              src={
                merchantLogo != null ? merchantLogo : "../../paylodelogo.png"
              }
              alt=""
              className="h-[40px] max-w-[60px] object-contain md:hidden"
            />{" "}
          </div>
          <div>
            <p>{email}</p>
            <p className="font-semibold text-[#124072] text-[18px]">
              Pay 
              {currency === "NGN" ? "₦" : currency === "USD" ? "$" : ""}
              {amount}
            </p>
          </div>
        </div>
        
        <div className=" mx-auto">
          <p className="text-[#718096] text-sm mb-5 text-center">
            Put in card pin here
          </p>

          <OTPInput
            className="py-7 text-[#323942] flex justify-center mb-4 mx-auto"
            value={pin}
            onChange={setPin}
            autoFocus
            OTPLength={4}
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
            }}
          />

          <button
            type="button"
            onClick={handlePin}
            // disabled={isButtonDisabled}
            className="py-[9px] items-center rounded-[8px] w-[80%]  md:w-full mx-auto bg-[#124072] text-[white] text-[14px] leading-[24px] tracking-[0.2px] font-bold flex justify-center "
          >
            Submit{" "}
            {loading && (
              <img
                src="../../spinner1.svg"
                alt=""
                className="ml-4 w-8 h-8 bg-transparent"
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardPin2;
