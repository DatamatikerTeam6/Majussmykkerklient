import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Button } from "../components/button/Button";
import { Heading } from "../components/heading/Heading";

export default function Customer( { isChecked, isCustomerButtonVisible, createOrder } ) {
  // State variables for the input fields and loading/error handling
  
  const [customerID, setCustomerID] = useState("");
  const [nameCustomer, setNameCustomer] = useState("");
  const [address, setAddress] = useState("");
  const [telephoneNumber, setTelephoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [customerNote, setCustomerNote] = useState("");
  const [activeCustomer, setActiveCustomer] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [errorMessage, setErrorMessage] = useState("");
  const [isButtonVisible, setIsButtonVisible] = useState(false);

 

 
  
  const createCustomer = async (event) => {
    event.preventDefault(); // Prevent default form submission
    setLoading(true);
    setErrorMessage(""); // Reset error message before submission

    // Create customer
    const response = await fetch("https://localhost:7187/api/Customer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nameCustomer, telephoneNumber, address, email, customerNote, activeCustomer}),
    });

    if (response.ok) {
      alert("Kunden er blevet oprettet i systemet!");
      if (isCustomerButtonVisible) {
        createOrder(event); // Create order if the second button is visible
      } else {
        window.location.reload(); // Reload page after customer creation
      }
    } else {
      setErrorMessage("Fejl ved oprettelse af kunde.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Kundedetaljer</title>
        <meta
          name="description"
          content="Access customer details including orders, calendar, telephoneNumber, address, email, and notes. Save and manage your contacts with ease."
        />
      </Helmet>
      <div className="flex w-full flex-col items-center gap-[366px] bg-white-a700 lg:gap-[274px] md:gap-[274px] sm:gap-[183px]">
        <div className="mx-auto mb-1 flex w-full max-w-[1836px] flex-col items-start gap-[50px] self-stretch px-5 md:px-5">
          <form onSubmit={createCustomer} className="flex flex-col gap-[22px] self-stretch">
            <div className="flex flex-col items-start justify-center">
              <Heading as="h1" className="text-[20px] font-medium tracking-[-0.22px] text-black-900 lg:text-[17px]">
                Navn
              </Heading>
              <input
                type="text"
                value={nameCustomer}
                onChange={(e) => setNameCustomer(e.target.value)}
                className="w-[90%] rounded !border px-3"
                required
              />
            </div>
            <div className="flex flex-col items-start justify-center">
              <Heading as="h1" className="text-[20px] font-medium tracking-[-0.22px] text-black-900 lg:text-[17px]">
                Adresse
              </Heading>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-[90%] rounded border px-3"
                required
              />
            </div>
            <div className="flex flex-col items-start justify-center">
              <Heading as="h1" className="text-[20px] font-medium tracking-[-0.22px] text-black-900 lg:text-[17px]">
                Telefonnummer
              </Heading>
              <input
                type="text"
                value={telephoneNumber}
                onChange={(e) => setTelephoneNumber(e.target.value)}
                className="w-[90%] rounded !border px-3"
                required
              />
            </div>
            <div className="flex flex-col items-start justify-center">
              <Heading as="h1" className="text-[20px] font-medium tracking-[-0.22px] text-black-900 lg:text-[17px]">
                Email-adresse
              </Heading>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-[90%] rounded !border px-3"
                required
              />
            </div>
            <div className="flex flex-col items-start justify-center">
              <Heading as="h1" className="text-[20px] font-medium tracking-[-0.22px] text-black-900 lg:text-[17px]">
                Note
              </Heading>
              <input
                type="text"
                value={customerNote}
                onChange={(e) => setCustomerNote(e.target.value)}
                className="w-[90%] rounded !border px-3"
                required
              />
            </div>
            <Button
              type="submit"
              shape="round"
              style={{ display: isCustomerButtonVisible ?   "none" : "block" }}  
              className="w-[90%] rounded !border px-3"
            >
              Opret kunde
            </Button>
            <Button  
              type="submit"      
              shape="round"
              style={{ display: isCustomerButtonVisible ?   "block" : "none" }}  
              className="w-[90%] rounded !border px-3"
            >
              Opret kunde og ordre
            </Button>
          </form>

        
          
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </div>
      </div>
    </>
  );
}

