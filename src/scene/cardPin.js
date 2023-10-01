import React, { useState} from "react";
import { useNavigate, useLocation, useOutletContext } from "react-router-dom";
import CryptoJS from "crypto-js";
import { AES, enc } from "crypto-js";

const CardPin = () => {
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
          window.open(document.referrer, "_parent", "");
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
    <div className="w-[300px] mx-auto">
      <div className="py-5 w-[100%]  px-[20px]">
        <h3 className="text-[20px] text-gray-500 text-center font-bold pb-1">
          Input Card Pin
        </h3>

        <p className="text-[#718096] text-sm mb-5 text-center">
          Put in card pin here
        </p>

        <form onSubmit={handlePin}>
          <div className="mx-auto my-4 w-full sm:my-[48px] md:my-[48px]">
            {" "}
            <input
              id="pin"
              type="password"
              className="block mx-auto w-[78px] text-center px-4 py-[9px] placeholder:text-[#A0AEC0] placeholder:font-normal font-medium text-[#1A202C] text-[16px] leading-[24px] tracking-[0.3px] bg-white border border-[#E2E8F0]  rounded-lg focus:outline-none focus:ring-[#124072] focus:border-[#124072] sm:text-sm"
              placeholder="****"
              autoComplete="off"
              autoFocus
              required
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
              }}
            />
          </div>
          <button
            type="submit"
            // onClick={handleOtp}
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
        </form>
      </div>
    </div>
  );
};

export default CardPin;
