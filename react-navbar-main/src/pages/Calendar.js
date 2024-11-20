import React from 'react';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default function Calendar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [date, setDate] = useState(new Date());

  // Hvis token ikke er til stede, omdirigeres brugeren til login-siden
  if (!token) {
    navigate("/login"); // Omdirigerer til login-siden, hvis brugeren ikke er logget ind
    return null; // Returnerer null for ikke at render noget indhold, mens omdirigeringen sker
  }

  // Hvis brugeren er logget ind, vises kalenderindholdet
  return (
    <div>
      <h2>Welcome To GFG</h2>
    Select date and time:
    <input
  type="date"
 />

<input type="time"/>
  </div>
  );
}
