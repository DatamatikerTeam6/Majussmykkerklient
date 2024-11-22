import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Button } from "../components/button/Button";
import { Heading } from "../components/heading/Heading";
import { useLocation } from "react-router-dom";

export default function UpdateOrder() {

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Fjerner tidsdelen og viser kun datoen
  }

  const location = useLocation();
  const order = location.state?.order;

  const [price, setPrice] = useState(order?.price || "");
  const [name, setName] = useState(order?.name) || "";
  const [type, setType] = useState(order?.type || 0);
  const [deliveryDate, setDeliveryDate] = useState(formatDate(order.deliverydate) || "");
  const [orderDate, setOrderDate] = useState(formatDate(order.orderdate) || "");
  const [quantity, setQuantity] = useState(order?.quantity || "");
  const [note, setNote] = useState(order?.note || "");
  const [pickupplace, setPickupPlace] = useState(order?.pickupplace || 0);
  const [pickupplaceasstring, setPickupPlaceasstring] = useState(order?.pickupplaceasstring);
  const [delivered, setDelivered] = useState(order?.delivered || false);
  const [images, setImages] = useState(order?.images || []);  // Store multiple files here
  const [orderID, setOrderID] = useState(order?.orderid || []); 


  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [customerID, setCustomerID] = useState(order?.customerid || 0);
  const [showCustomer, setShowCustomer] = useState(false);

  const handleFileChange = (e) => {
    setImages(e.target.files);  // Update state with multiple files
  };

console.log(order)
    
  const createOrder = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const formData = new FormData();
    formData.append("price", price);
    formData.append("name", name);
    formData.append("type", type);
    formData.append("deliveryDate", deliveryDate);
    formData.append("orderDate", orderDate);
    formData.append("quantity", quantity);
    formData.append("note", note);
    formData.append("pickupplace", pickupplace);
    formData.append("pickupplaceasstring", pickupplaceasstring);
    formData.append("delivered", delivered);    
    formData.append("customerID", customerID);
    formData.append("orderid", orderID);
    
    // Append each image to formData
    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append("files", images[i]);
      }
    }
    console.log(formData)
    try {
      const response = await fetch("https://localhost:7187/api/Order/UpdateOrder", {
        method: "PUT",
        body: formData,
      });
      
      if (response.ok) {
        alert("Ordren blev opdateret succesfuldt!");
        window.location.reload();
      } else {
        const text = await response.text();
        console.log('Response Text:', text);
        setErrorMessage(`${text} Fejl, kunne ikke opdatere ordre.`);
      }
    } catch (error) {
      console.error("Error creating order:", error);
      setErrorMessage("En fejl opstod - ordren kunne ikke opdateres.");
    } finally {
      setLoading(false);
    }
  };

  
  const handleCheckboxChange = (e) => {
    setShowCustomer(e.target.checked);
  };

  return (
    <>


      <Helmet>
        <title>Opdater ordre</title>
        <meta
          name="description"
          content="Access customer details including orders, calendar, telephoneNumber, address, email, and notes. Save and manage your contacts with ease."
        />
      </Helmet>

      <h1><strong>Opdater ordre</strong></h1>
      <div className="flex w-full flex-col items-center gap-[366px] bg-white-a700 lg:gap-[274px] md:gap-[274px] sm:gap-[183px]">
        <div className="mx-auto mb-1 flex w-full max-w-[1836px] flex-col items-start gap-[50px] self-stretch px-5 md:px-5">
          <form onSubmit={createOrder} className="flex flex-col gap-[22px] self-stretch">
            <div className="flex flex-col items-start justify-center">
              <Heading as="h1" className="text-[20px] font-medium tracking-[-0.22px] text-black-900 lg:text-[17px]">
                Pris
              </Heading>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(parseInt(e.target.value))}
                className="w-[22%] rounded !border px-3"                
              />
            </div>

            <div className="flex flex-col items-start justify-center">
  <Heading as="h1" className="text-[20px] font-medium tracking-[-0.22px] text-black-900 lg:text-[17px]">
    Navn
  </Heading>
  <input
    type="text"
    value={name}
    onChange={(e) => setName(e.target.value)}
    className="w-[22%] rounded border px-3"    
  />
</div>





            <div className="flex flex-col items-start justify-center">
  <Heading as="h1" className="text-[20px] font-medium tracking-[-0.22px] text-black-900 lg:text-[17px]">
    Type 
  </Heading>
  <select
    value={type}
    onChange={(e) => setType(parseInt(e.target.value))}
    className="w-[22%] rounded !border px-3"    
  >
    <option value="">Vælg type</option>
    <option value="0">Smykke</option>
    <option value="1">Skulptur</option>
    <option value="2">Diverse</option>
    {/* Tilføj flere options som nødvendigt */}
  </select>
</div>


            <div className="flex flex-col items-start justify-center">
              <Heading as="h1" className="text-[20px] font-medium tracking-[-0.22px] text-black-900 lg:text-[17px]">
                Oprettelsesdato
              </Heading>
              <input
                type="date"
                value={orderDate}
                onChange={(e) => setOrderDate(e.target.value)}
                className="w-[22%] rounded !border px-3"                
              />
            </div>

            <div className="flex flex-col items-start justify-center">
              <Heading as="h1" className="text-[20px] font-medium tracking-[-0.22px] text-black-900 lg:text-[17px]">
                Afleveringsdato
              </Heading>
              <input
                type="date"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                className="w-[22%] rounded !border px-3"                
              />
            </div>

            <div className="flex flex-col items-start justify-center">
              <Heading as="h1" className="text-[20px] font-medium tracking-[-0.22px] text-black-900 lg:text-[17px]">
                Antal
              </Heading>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-[22%] rounded !border px-3"               
              />
            </div>

            <div className="flex flex-col items-start justify-center">
              <Heading as="h1" className="text-[20px] font-medium tracking-[-0.22px] text-black-900 lg:text-[17px]">
                Note
              </Heading>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-[22%] rounded !border px-3"
              />
            </div>

            <div className="flex flex-col items-start justify-center">
  <Heading as="h1" className="text-[20px] font-medium tracking-[-0.22px] text-black-900 lg:text-[17px]">
    Afhentningssted 
  </Heading>
  <select
    value={pickupplace}
    onChange={(e) => 
      {
      
      setPickupPlace(parseInt(e.target.value))
      }
          }
    className="w-[22%] rounded !border px-3"
    required
  >
       <option value="">Vælg type</option>
    <option value="0">Butik</option>
    <option value="1">Hjemme</option>
    <option value="2">Post</option>
    {/* Tilføj flere options som nødvendigt */}
  </select>
</div>
  


            <div className="flex flex-col items-start justify-center">
              <Heading as="h1" className="text-[20px] font-medium tracking-[-0.22px] text-black-900 lg:text-[17px]">
                Afleveret?
              </Heading>
              <input
                type="checkbox"
                checked={delivered}
                onChange={(e) => setDelivered(e.target.checked)}
                className="w-[22%] rounded !border px-3"
                style={{ height: "40px" }} // Inline style for height
              />
            </div>

            <div className="flex flex-col items-start justify-center">
              <label>Billeder</label>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="w-[22%] rounded !border px-3"
              />
            </div>

            <div style={{ display: "none" }} className="flex flex-col items-start justify-center">
  <Heading as="h1" className="text-[20px] font-medium tracking-[-0.22px] text-black-900 lg:text-[17px]">
    OrderID
  </Heading>
  <input
    type="text"
    value={orderID}
    className="w-[22%] rounded !border px-3"
  />
</div>
  <Button 
    type="submit"
    shape="round"
    className="min-w-[198px] gap-2.5 rounded px-[30px] tracking-[-0.44px] sm:px-4">Gem ordre     
  </Button>
</form>
          
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </div>
</div>
</>
);
}
