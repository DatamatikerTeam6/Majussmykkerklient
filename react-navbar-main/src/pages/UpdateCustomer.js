import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Button } from "../components/button/Button";
import { Heading } from "../components/heading/Heading";
import { useLocation } from "react-router-dom";




export default function UpdateCustomer() {
  
  const location = useLocation();
  const customer = location.state?.customer;

  
console.log(customer)
  const [nameCustomer, setNameCustomer] = useState(customer?.nameCustomer || "");
  const [telephoneNumber, setTelephoneNumber] = useState(customer?.telephoneNumber || 0);
  const [address, setAddress] = useState(customer?.address || "");
  const [email, setEmail] = useState(customer?.email || "");
  const [customerNote, setCustomerNote] = useState(customer?.customerNote || "");
  const [customerID, setCustomerID] = useState(customer?.customerID || "");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");  
   const [showCustomer, setShowCustomer] = useState(false);




  const createCustomer = async (event) => {
    event.preventDefault(); // Prevent default form submissionA
    setLoading(true);
    setErrorMessage(""); // Reset error message before submission

      // Replace the empty object with the actual data to be sent
      const response = await fetch(`https://localhost:7187/api/Customer/UpdateCustomer?id=${customerID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({nameCustomer, telephoneNumber, address, email, customerNote}), // Add password or other fields as needed
      });    
      
      if(response.ok)
        {
         alert("Kunde blev opdateret")
         window.location.reload();
        }
  };
  
  


  return (
    <>


      <Helmet>
        <title>Kundeoversigt</title>
        <meta
          name="description"
          content="Få adgang til kunde informationer, inklusive ordrer, kalender, telefonnummer, adresse, email og noter."
        />
      </Helmet>

      <h1>Opdater kunde</h1>
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
    className="w-[22%] rounded border px-3"    
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
    className="w-[22%] rounded border px-3"    
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
                className="w-[22%] rounded !border px-3"
              />
</div>
          
<div className="flex flex-col items-start justify-center">
              <Heading as="h1" className="text-[20px] font-medium tracking-[-0.22px] text-black-900 lg:text-[17px]">
                CustomerID
              </Heading>
              <input
                type="text"
                value={customerID}
                onChange={(e) => setCustomerID(e.target.value)}
                className="w-[22%] rounded !border px-3"
              />
</div>
  <Button 
    type="submit"
    shape="round"
    className="min-w-[198px] gap-2.5 rounded px-[30px] tracking-[-0.44px] sm:px-4">Gem kunde     
  </Button>
</form>
  {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </div>
</div>
</>
);
}
