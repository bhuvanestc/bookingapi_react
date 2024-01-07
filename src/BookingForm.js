
import React, { useState } from 'react';
import axios from 'axios';

const BookingForm = ({ bookingId, dateTime, onSuccessfulBooking }) => {
  const [email, setEmail] = useState('');

  const handleBooking = async () => {
    try {
      const response = await 
      axios.post('http://localhost:8080/api/v1/booking/book', { id: bookingId, email });
      if (response.status === 201) {
        onSuccessfulBooking(); // Navigate back to the BookingList component
      }
    } catch (error) {
      console.error('Error booking:', error);
    }
  };

  return (
    <div className="card">
    <div className="card-body">
    <h4>Booking</h4>
      <div className="mb-3">
        <label htmlFor="emailInput" className="form-label">Email address</label>
        <input
          type="email"
          className="form-control"
          id="emailInput"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
        />
      </div>

      <button className="btn btn-success" onClick={handleBooking}>
        Book
      </button>
      <h3 className="card-title">Booking Details</h3>
      <p className="card-text">ID: {bookingId}</p>
      <p className="card-text">Date & Time: {dateTime}</p>
      
    </div>
  </div>
);
};
   

export default BookingForm;
