import React from 'react';
import { useNavigate } from 'react-router-dom';




export default function Calendar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Hvis token ikke er til stede, omdirigeres brugeren til login-siden
  if (!token) {
    navigate("/login"); // Omdirigerer til login-siden, hvis brugeren ikke er logget ind
    return null; // Returnerer null for ikke at render noget indhold, mens omdirigeringen sker
  }

  // Hvis brugeren er logget ind, vises kalenderindholdet
  return (
    <>         

      <div class="calendar">
    <div class="calendar-header">
        <h2>November 2024</h2>
    </div>

    
    <div class="calendar-days">
        <div class="day day-name">Søn</div>
        <div class="day day-name">Man</div>
        <div class="day day-name">Tir</div>
        <div class="day day-name">Ons</div>
        <div class="day day-name">Tor</div>
        <div class="day day-name">Fre</div>
        <div class="day day-name">Lør</div>

      
        <div class="day"></div>
        <div class="day"></div>
        <div class="day"></div>
        <div class="day">1</div>
        <div class="day">2</div>
        <div class="day">3</div>
        <div class="day">4</div>
        <div class="day">5</div>
        <div class="day">6</div>
        <div class="day">7</div>
        <div class="day">8</div>
        <div class="day">9</div>
        <div class="day">10</div>
        <div class="day">11</div>
        <div class="day">12</div>
        <div class="day">13</div>
        <div class="day">14</div>
        <div class="day">15</div>
        <div class="day">16</div>
        <div class="day">17</div>
        <div class="day">18</div>
        <div class="day">19</div>
        <div class="day">20</div>
        <div class="day">21</div>
        <div class="day">22</div>
        <div class="day">23</div>
        <div class="day">24</div>
        <div class="day">25</div>
        <div class="day">26</div>
        <div class="day">27</div>
        <div class="day">28</div>
        <div class="day">29</div>
        <div class="day">30</div>
        <div class="day"></div>
        <div class="day"></div>
    </div>
</div>
      
    </>
  );
}
