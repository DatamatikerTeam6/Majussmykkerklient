import React, { useState, useEffect  } from "react";
import { Helmet } from "react-helmet";
import { Button } from "../components/button/Button";
import { Heading } from "../components/heading/Heading";
import Customer from "./Customer";

export default function Order() {
  // State variables for the input fields and loading/error handling
  
  
  useEffect(() => {
    
    const fetchCustomerID = async () => {
      try {
        const response = await fetch("https://localhost:7187/api/Customer/numberofspaces", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const currentCustomerID = data.count; // Access the count property from the response
        console.log("Number of customers:", currentCustomerID);
        setCustomerID(currentCustomerID); // Set the customerID state
      } catch (error) {
        console.error("Error fetching customer count:", error);
        setErrorMessage("Failed to fetch customer count.");
      }
    };

    fetchCustomerID(); // Call the function when the component mounts
  }, []); // Empty dependency array means this effect runs once on mount

  

  const [price, setPrice] = useState();
  const [name, setName] = useState("")
  const [type, setType] = useState();
  const [deliveryDate, setDeliveryDate] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [quantity, setQuantity] = useState("");
  const [note, setNote] = useState("");
  const [pickupplace, setPickupPlace] = useState(); 
  const [pickupplaceasstring, setPickupPlaceasstring] = useState(); 
  const [delivered, setDelivered] = useState(false);
  const [image, setImage] = useState("Penis");
  const [loading, setLoading] = useState(false); // Loading state
  const [errorMessage, setErrorMessage] = useState("");
  const [customerID, setCustomerID] = useState(""); // Initialize to null
  const [showCustomer, setShowCustomer] = useState(false); // State to handle checkbox


   
  const createOrder = async (event) => {
    event.preventDefault(); // Prevent default form submission
    setLoading(true);
    setErrorMessage(""); // Reset error message before submission
  
    
      const orderData = {
      price, 
      name, 
      type, 
      deliveryDate, 
      orderDate, 
      quantity, 
      note, 
      pickupplace, 
      pickupplaceasstring, 
      delivered, 
      image, 
      customerID
    };
  
    console.log(JSON.stringify(orderData, null, 2)); // Pretty print JSON for debugging

      // Replace the empty object with the actual data to be sent
      const response = await fetch("https://localhost:7187/api/Order/CreateOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          price,
          name,  // Brug den encodede version
          type,
          deliveryDate,
          orderDate,
          quantity,
          note,  // Brug den encodede version
          pickupplace,
          pickupplaceasstring,
          delivered,
          image,  // Brug den encodede version
          customerID,
        }), // Add password or other fields as needed

      });    
      console.log(response)
      if(response.ok)
        {
         alert("Kunde er blevet oprettet som en luder")
         window.location.reload();
        }
  };  

  
// Function to update pickupplace and pickupplaceasstring
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

  // Update the pickupplaceasstring based on the selected pickupplace
  setPickupPlaceasstring(placeString);
};


const handleCheckboxChange = (e) => {
  setShowCustomer(e.target.checked); // Update showCustomer state based on checkbox
};

  return (
    <>


      <Helmet>
        <title>Order Details - Manage Your Contacts Efficiently</title>
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
                className="w-[22%] rounded !border px-3"
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
    className="w-[22%] rounded border px-3"
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
    className="w-[22%] rounded !border px-3"
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
                className="w-[22%] rounded !border px-3"
                required
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
                className="w-[22%] rounded !border px-3"
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
                className="w-[22%] rounded !border px-3"
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
                value={delivered}
                onChange={(e) => setDelivered(e.target.checked)}
                className="w-[22%] rounded !border px-3"
                required
                style={{ height: "40px" }} // Inline style for height
              />
            </div>

            <div className="flex flex-col items-start justify-center">
              <Heading as="h1" className="text-[20px] font-medium tracking-[-0.22px] text-black-900 lg:text-[17px]">
                Billede
              </Heading>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-[22%] rounded !border px-3"
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
    className="w-[22%] rounded !border px-3"
  />
</div>

            <Button
              type="submit"
              shape="round"
              className="min-w-[198px] gap-2.5 rounded px-[30px] tracking-[-0.44px] sm:px-4">Opret ordre     
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
    
      
            {showCustomer && <Customer />}
    
    </>

  );
}
