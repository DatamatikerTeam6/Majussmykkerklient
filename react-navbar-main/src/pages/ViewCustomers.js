import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import useSound from 'use-sound';
import sound from '../Sounds/CreateSound.mp3';


export default function ViewCustomers() {
    const [customers, setCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');        
    const navigate = useNavigate();
    /*const [customerID, setCustomerID] = useState("");*/

 

    // Function to fetch orders based on search term
    async function fetchCustomers(customerName) {
        const url = customerName
            ? `https://localhost:7187/api/Customer/GetCustomerByName?name=${customerName}`
            : 'https://localhost:7187/api/Customer/GetCustomers';
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            setCustomers(data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    }

    // useEffect to fetch orders initially
    useEffect(() => {
        fetchCustomers();
    }, []);

    const deleteCustomer = async (customerID) => {
        try {            
            const response = await fetch(`https://localhost:7187/api/Customer/DeleteCustomer?id=${customerID}`, {
                method: "DELETE",                
                headers: { "Content-Type": "application/json" },
            });
            if (!response.ok) {
                const text = await response.text();
                throw new Error("Error deleting order: ${text}");
            }
            setCustomers(customers.filter(customer => customer.customerID!== customerID));
            alert(`Kunde med id ${customerID} blev slettet`)
            window.location.reload();
        } catch (error) {
            console.error("Error deleting order:", error.message);
        }
    };

  

    // Handle update order button click
    const handleUpdateClick = (customer) => {
        navigate("/UpdateCustomer", { state: { customer } });
    };

     // Handle update order button click
     const handleSelectClick = (customer) => {
        navigate("/Order", { state: { customer } });
        window.location.reload();
    };

    // Call fetchOrders after every keystroke (with debounce for efficiency)
    const handleSearchChange = (e) => {
        const newSearchTerm = e.target.value;
        setSearchTerm(newSearchTerm);

        const debounceTimer = setTimeout(() => {
            fetchCustomers(newSearchTerm);
        }, 500);
        return () => clearTimeout(debounceTimer);
    };

    return (
        <>
            <div className="search">
                <input
                    placeholder="Søg efter kunde"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <img
                    src="./Images/SearchIcon.png"
                    alt="search"
                    onClick={() => fetchCustomers(searchTerm)}
                />
            </div>

            <div className="p-5">
                <h1 className="text-2xl font-bold mb-4">Kundeoversigt</h1>
                {customers.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {customers.map((customer) => (
                            <div key={customer.customerName} className="p-4 border rounded shadow flex flex-col">
                                <p><strong>Navn:</strong> {customer.nameCustomer}</p>
                                <p><strong>Telefon:</strong> {customer.telephoneNumber}</p>
                                <p><strong>Adresse:</strong> {customer.address}</p>
                                <p><strong>Email:</strong> {customer.email}</p>
                                <p><strong>Note:</strong> {customer.customerNote}</p>
                                <p><strong>ID:</strong> {customer.customerID}</p>

                               {/* <p><strong>Aktiv?:</strong> {customer.Active? "Ja" : "Nej"}</p> */}

                                <div className="p-4 border rounded shadow flex flex-col">
                                    <button className="delete-button" onClick={() => deleteCustomer(customer.customerID)}>
                                        <img src="./Images/Trash2.png" alt="Delete" className="delete-icon" />
                                        Slet
                                    </button>
                                    <button className="update-button" onClick={() => handleUpdateClick(customer)}>
                                        <img src="./Images/Edit.png" alt="Edit" className="delete-icon" />
                                        Redigér
                                    </button>
                                    <button className="select-button" onClick={() => handleSelectClick(customer)}>
                                        <img src="./Images/Pointer.png" alt="Edit" className="delete-icon" />
                                        Vælg
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Ingen kunder fundet.</p>
                )}
            </div>
            <a href="./Customer">
                <button className="create-button">Opret kunde</button>
            </a>
                     
        </>
    );
}
