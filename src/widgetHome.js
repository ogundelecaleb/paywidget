import React, { useEffect, useState } from "react";
import SideBar from "./component/sideBar";
import { AiFillCloseCircle } from "react-icons/ai";
// import { encrypt, decrypt, compare } from "n-krypta";
import Modal from "./component/Modal";
import { Outlet } from "react-router-dom";

const WidgetHome = () => {
  // const BaseApiUrl = "https://paymentgatewayapi.paylodeservices.com/v1";
  const BaseApiUrl = "http://94.229.79.27:39213/v1";
  const [amount, setAmount] = useState("200");
  const [isOpen, setIsOpen] = useState(true);
  const [callbackStr, setCallbackStr] = useState(null);
  const [email, setEmail] = useState(null);
  const [successCallbackStr, setSuccessCallbackStr] = useState(null);
  const [currency, setCurrency] = useState("");
  const [merchantLogo, setMerchantLogo] = useState("");
  const [merchantName, setMerchantName] = useState("");
  const [sessionRef, setSessionRef] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [closewidgetStr, setClosewidgetStr] = useState("");
  const [redirectUrl, setredirectUrl] = useState("");

  useEffect(() => {
    // Grab the URL parameters
    const params = new URLSearchParams(window.location.search);
    const publicKey = params.get("publicKey");
    const secretKey = params.get("secretKey");
    const amount = params.get("amount");
    const firstname = params.get("firstname");
    const lastname = params.get("lastname");
    const phonenumber = params.get("phonenumber");
    const currency = params.get("currency");
    const email = params.get("email");
    const redirectUrl = params.get("redirectUrl");
    var onCloseCallbackStr = params.get("onCloseCallback");
    var closewidgetStr = params.get("closewidget");
    const onSuccessCallbackStr = params.get("onSuccessCallback");

    console.log(params);

    setEmail(email);
    setAmount(amount);
    setFirstName(firstname);
    setLastName(lastname);
    setPhoneNumber(phonenumber);
    setCurrency(currency);
    setredirectUrl(redirectUrl);

    /*eslint no-new-func: 0*/
    setCallbackStr(onCloseCallbackStr);
    setClosewidgetStr(closewidgetStr);
    setSuccessCallbackStr(onSuccessCallbackStr);
    setPublicKey(publicKey);

    // Process the payment using the retrieved details
    window["closeWidget"] = closeWidget;
   

    processPayment({ publicKey, secretKey, amount, currency });
  }, [publicKey]);

  // const onCloseCallback = new Function(`return (${callbackStr})`)();

  function handleCloseModal() {
    setIsOpen(false);
    // const closeWidget = new Function(`return (${closewidgetStr})`)();
    // if (typeof onCloseCallback === "function") {
    //   onCloseCallback({ status: "closed" });
    // }
    // if (typeof closeWidget === "function") {
    //   closeWidget({ status: "closed" });
    // }
  }
  const closeWidget = function () {
    setIsOpen(false);
  };

  const processPayment = ({ publicKey, secretKey, currency, amount }) => {
    // You can use payment APIs or any other payment processing methods here
    console.log(amount);
    fetch(`${BaseApiUrl}/payment/initiate`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Public-Key": publicKey,
      },
      body: JSON.stringify({ currencyCode: currency }),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.isSuccessful && res.data) {
          setSessionRef(res.data.sessionReference);
          setCurrency(res.data.currency);
          setMerchantLogo(res.data.merchantLogo);
          setMerchantName(res.data.merchantName);

          console.log("initiatesuccessful");
        } else if (!res.isSuccessful) {
          console.log("error message:", res.message || res.title || "");
        }
      });
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <div className="inline-block relative overflow-hidden text-left align-bottom transition-all transform bg-[white]  shadow-xl sm:my-8 sm:align-middle min-w-[400px] md:min-w-[450px] md:max-w-[450px] ">
          <AiFillCloseCircle
            onClick={handleCloseModal}
            className="cursor-pointer absolute right-1   top-2 z-20  "
          />
          <div className=" md:mt-0 w-full">
            <div className="flex flex-col md:flex-row w-full">
              <SideBar logo={merchantLogo} />
              <Outlet
                context={[
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
                ]}
              />
            </div>{" "}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default WidgetHome;
