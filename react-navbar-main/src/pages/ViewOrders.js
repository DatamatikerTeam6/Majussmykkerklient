// ViewOrders.js
import React, { useEffect, useState } from 'react';

export default function ViewOrders() {
    const [orders, setOrders] = useState([]);
    

    useEffect(() => {
        // Fetch orders from API and update state
        async function fetchOrders() {
            try {
                const response = await fetch("https://localhost:7187/api/Order/GetOrders"); // Update with your API endpoint
                const data = await response.json();
                console.log(data)
                setOrders(data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        }
        fetchOrders();
    }, []);


    //Format date as YYYY-MM-DD in reuseable function
    const formatDate = (date = new Date()) => {
        return new Date().toISOString().split('T')[0];
      }


      
    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-4">Ordreoversigt</h1>
            {orders.length > 0 ? (
                <ul className="space-y-3">
                    {orders.map((order) => (
                        <li key={order.name} className="p-4 border rounded shadow">                            
                            <p><strong>Navn:</strong> {order.name}</p>                            
                            <p><strong>Pris:</strong> {order.price}</p>
                            <p><strong>Note:</strong> {order.note}</p>
                            <p><strong>Afhentningssted:</strong> {order.pickupplaceasstring}</p>
                            <p><strong>Afhentet?:</strong> {order.delivered.toString()}</p>
                            <p><strong>Mængde:</strong> {order.quantity}</p>
                            <p><strong>Dato:</strong> {formatDate(order.date)}</p>
                        
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Ingen ordrer fundet.</p>
            )}
        </div>
    );
}
