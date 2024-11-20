import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import useSound from 'use-sound';
import sound from '../Sounds/CreateSound.mp3';

const DeleteOrderDialog = ({ orderName, onDelete, onClose }) => {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div style={{ background: "white", padding: "20px", borderRadius: "8px", textAlign: "center" }}>
                <h3>Bekræft sletning</h3>
                <p>Er du sikker på, at du vil slette ordren <strong>{orderName}</strong>?</p>
                <button onClick={onDelete} style={{ marginRight: "10px" }}>Ja</button>
                <button onClick={onClose}>Nej</button>
            </div>
        </div>
    );
};

export default function ViewOrders() {
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const navigate = useNavigate();

    // Function to fetch orders
    async function fetchOrders(orderName) {
        const url = orderName 
            ? `https://localhost:7187/api/Order/GetOrdersByName?name=${orderName}` 
            : 'https://localhost:7187/api/Order/GetOrders';
        try {
            const response = await fetch(url);
            const data = await response.json();
            setOrders(data);
            console.log(data)
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleDeleteClick = (orderName) => {
        setSelectedOrder(orderName);
        setDialogOpen(true);
    };

    const deleteOrder = async () => {
        try {
            const response = await fetch(`https://localhost:7187/api/Order/DeleteOrder?name=${selectedOrder}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });
            if (!response.ok) {
                const text = await response.text();
                throw new Error(`Error deleting order: ${text}`);
            }
            setOrders(orders.filter(order => order.name !== selectedOrder));
            setDialogOpen(false);
            setSelectedOrder(null);
        } catch (error) {
            console.error("Error deleting order:", error.message);
        }
    };

    const handleSearchChange = (e) => {
        const newSearchTerm = e.target.value;
        setSearchTerm(newSearchTerm);
        const debounceTimer = setTimeout(() => {
            fetchOrders(newSearchTerm);
        }, 500);
        return () => clearTimeout(debounceTimer);
    };

    const handleUpdateClick = (order) => {
        navigate("/UpdateOrder", { state: { order } });
    };

    return (
        <>
            <div className="search">
                <input 
                    placeholder="Søg efter ordre"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <img 
                    src="./Images/SearchIcon.png"
                    alt="search"
                    onClick={() => fetchOrders(searchTerm)}
                />
            </div>

            <div className="p-5">
                <h1 className="text-2xl font-bold mb-4">Ordreoversigt</h1>
                {orders.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {orders.map((order) => (
                            <div key={order.name} className="p-4 border rounded shadow flex flex-col items-start">
                                <p><strong>Navn:</strong> {order.name}</p>
                                <p><strong>Pris:</strong> {order.price}</p>
                                <p><strong>Note:</strong> {order.note}</p>
                                <p><strong>Afhentningssted:</strong> {order.pickupplaceasstring}</p>
                                <p><strong>Afhentet?:</strong> {order.delivered ? "Ja" : "Nej"}</p>
                                <p><strong>Mængde:</strong> {order.quantity}</p>
                                <p><strong>Ordredato:</strong> {new Date(order.orderdate).toISOString().split("T")[0]}</p>
                                <p><strong>Afhentningsdato:</strong> {new Date(order.deliverydate).toISOString().split("T")[0]}</p>
                                <p><strong>AfhentningsTidspunkt:</strong> {order.deliveryTime}</p>
                                <p><strong>OrderID:</strong> {order.orderid}</p>
                                <img src={order.image} width="150" height="150" alt={order.name} />
                                <div className="mt-2 flex justify-between">
                                    <button className="delete-button" onClick={() => handleDeleteClick(order.name)}>
                                        <img src="./Images/Trash2.png" alt="Delete" className="delete-icon" />
                                        Slet
                                    </button>
                                    <button className="update-button" onClick={() => handleUpdateClick(order)}>
                                        <img src="./Images/Edit.png" alt="Edit" className="delete-icon" />
                                        Redigér
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Ingen ordrer fundet.</p>
                )}
            </div>
            <a href="./Order">
                <button className="create-button">Opret ordre</button>
            </a>
            {dialogOpen && (
                <DeleteOrderDialog
                    orderName={selectedOrder}
                    onDelete={deleteOrder}
                    onClose={() => setDialogOpen(false)}
                />
            )}
        </>
    );
}
