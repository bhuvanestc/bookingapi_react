
import React, { useState } from 'react';
import axios from 'axios';

const CancelBooking= ({ onCancelSuccess }) => {
  const [email, setEmail] = useState('');
  const [bookingId, setBookingId] = useState('');
  const [message, setMessage] = useState('');

  const handleCancel = async () => {
    try {
      const response = await 
      axios.put('http://localhost:8080/api/v1/booking/cancel',
       { id: bookingId, email });
       console.log('Response:', response);
      if (response.status === 204) {
        
     
        setMessage('Booking successfully cancelled!'); 
      } else {
        setMessage('Failed to cancel booking. Satus Code:'+response.status);
      }
    } catch (error) {
      setMessage('Error cancelling booking.'+error.message);
      console.error('Error:', error);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h4>Cancel Booking</h4>
        
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

        <div className="mb-3">
          <label htmlFor="bookingIdInput" className="form-label">Booking ID</label>
          <input
            type="text"
            className="form-control"
            id="bookingIdInput"
            value={bookingId}
            onChange={(e) => setBookingId(e.target.value)}
            placeholder="Enter Booking ID"
          />
        </div>

        <button className="btn btn-danger" onClick={handleCancel}>
          Cancel Booking
        </button>

        {message && <p className="mt-3">{message}</p>}
      </div>
    </div>
  );
};

export default CancelBooking;
