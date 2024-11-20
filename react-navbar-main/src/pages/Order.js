import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Button } from "../components/button/Button";
import { Heading } from "../components/heading/Heading";
import Customer from "./Customer";
import ViewCustomers from "./ViewCustomers";  
import { useLocation } from "react-router-dom";

export default function Order() {
  const location = useLocation();
  const customer = location.state?.customer;

  const [price, setPrice] = useState();
  const [name, setName] = useState("");
  const [type, setType] = useState();
  const [deliveryDate, setDeliveryDate] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [quantity, setQuantity] = useState("");
  const [note, setNote] = useState("");
  const [pickupplace, setPickupPlace] = useState();
  const [pickupplaceasstring, setPickupPlaceasstring] = useState();
  const [delivered, setDelivered] = useState(false);
  const [images, setImages] = useState([]);  // Store multiple files here
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [customerID, setCustomerID] = useState(customer?.customerID || "");
  const [deliveryTime, setDeliveryTime] = useState();
  const [showCustomer, setShowCustomer] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);



  const handleFileChange = (e) => {
    setImages(e.target.files);  // Update state with multiple files
  };

  useEffect(() => {
    const fetchCustomerID = async () => {
      if (isChecked) {
        try {
          const response = await fetch("https://localhost:7187/api/Customer/GetLastCustomerID", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",            
            },         
          });
          const data = await response.json();
          setCustomerID(data.lastCreatedIdPlusOne); // Update customer ID with response data
          if (!response.ok) throw new Error("Network response was not ok");
        } catch (error) {
          console.error("Error fetching customer count:", error);
          setErrorMessage("Failed to fetch customer count.");
        }
      }
    };
    fetchCustomerID();
  }, [isChecked]); // Add isChecked to dependency array
  


  

const createOrder = async () => {
  
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
  formData.append("deliveryTime", deliveryTime);
  
  // Append each image to formData
  if (images) {
    for (let i = 0; i < images.length; i++) {
      formData.append("files", images[i]);
    }
  }
  
  console.log(formData);
  
  try {
    // Add a delay of 500 milliseconds
    

    const response = await fetch("https://localhost:7187/api/Order/CreateOrder", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      alert("Order created successfully!");
      window.location.reload();
    } else {
      const text = await response.text();
      console.log('Response Text:', text);
      setErrorMessage(`${text} Failed to create order.`);
    }
  } catch (error) {
    console.error("Error creating order:", error);
    setErrorMessage("An error occurred while creating the order.");
  } finally {
    setLoading(false);
  }
};


  const handlePickupPlaceChange = (e) => {
    const selectedPickupPlace = e.target.value;
    setPickupPlace(selectedPickupPlace);

    // Map the numeric value of pickupplace to the corresponding string
    let placeString = "";
    switch (selectedPickupPlace) {
      case "0":
        placeString = "Butik";
        break;
      case "1":
        placeString = "Hjemme";
        break;
      case "2":
        placeString = "Post";
        break;
      default:
        placeString = "";
    }

    setPickupPlaceasstring(placeString);
  };

  const handleCheckboxChange = (e) => {
    setShowCustomer(e.target.checked);
    setIsChecked(e.target.checked); 
    setIsButtonVisible(e.target.checked); 
  };

  const isCustomerButtonVisible = true;


  return (
    
    <div className="orderCustomerGrid">
      

    <div className="col-2">
        <Helmet>
          <title>Ordre detaljer</title>
          <meta
            name="description"
            content="Access customer details including orders, calendar, telephoneNumber, address, email, and notes. Save and manage your contacts with ease."
          />
        </Helmet>
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
                  className="w-[90%] rounded !border px-3"
                  required
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
      className="w-[90%] rounded border px-3"
      required
    />
  </div>





              <div className="flex flex-col items-start justify-center">
    <Heading as="h1" className="text-[20px] font-medium tracking-[-0.22px] text-black-900 lg:text-[17px]">
      Type 
    </Heading>
    <select
      value={type}
      onChange={(e) => setType(parseInt(e.target.value))}
      className="w-[90%] rounded !border px-3"
      required
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
                  className="w-[90%] rounded !border px-3"
                  required
                />
              </div>

              <div className="flex flex-col items-start justify-center">
                <Heading as="h1" className="text-[20px] font-medium tracking-[-0.22px] text-black-900 lg:text-[17px]">
                  Afleveringsdato og tidspunkt
                </Heading>
                <input
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="w-[90%] rounded !border px-3"
                  required
                />
                
              </div>

              <div className="flex flex-col items-start justify-cente">              
                <input
                  type="time"
                  value={deliveryTime}
                  onChange={(e) => setDeliveryTime(e.target.value)}
                  className="w-[90%] rounded !border px-3"
                  required
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
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-[90%] rounded !border px-3"
                  required
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
        handlePickupPlaceChange((e))
        setPickupPlace(parseInt(e.target.value))
        }
            }
      className="w-[90%] rounded !border px-3"
      required
    >
        <option value="">Vælg type</option>
      <option value="0">Butik</option>
      <option value="1">Hjemme</option>
      <option value="2">Post</option>
      {/* Tilføj flere options som nødvendigt */}
    </select>
  </div>
    


              <div className="min-w-[198px] gap-2.5 rounded px-[30px] tracking-[-0.44px] sm:px-4">
                <Heading as="h1" className="text-[20px] font-medium tracking-[-0.22px] text-black-900 lg:text-[17px]">
                  Afleveret?
                </Heading>
                <input
                  type="checkbox"
                  value={delivered}
                  onChange={(e) => setDelivered(e.target.checked)}
                  className="w-[8%] rounded !border px-3"
                  required
                  style={{ height: "40px" }} // Inline style for height
                />
              </div>

              <div className="min-w-[198px] gap-2.5 rounded px-[30px] tracking-[-0.44px] sm:px-4">
                <label>Billeder</label>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="w-[80%] rounded !border px-3"
                  required
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
      className="w-[90%] rounded !border px-3"
    />
  </div>
    <Button 
      type="submit"
      shape="round"
      style={{ display: isChecked ? "none" : "block"  }}  // Skjuler knappen, hvis isChecked er false
      className="w-[90%] rounded !border px-3">Opret ordre     
    </Button>
  </form>
            
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          </div>
  </div>

        <div className="flex flex-col items-start justify-center">
                <Heading as="h1" className="text-[20px] font-medium tracking-[-0.22px] text-black-900 lg:text-[17px]">
                Opret kunde?
                </Heading>
                <input  
                  type="checkbox"                                 
                  onChange={handleCheckboxChange} // Handle checkbox toggle
                />
                
      </div>
        {showCustomer && <Customer isCustomerButtonVisible={true}  createOrder={createOrder}/>}
    </div>

       <div class="col-1">
        <ViewCustomers />
       </div>
          </div>

  );
}
