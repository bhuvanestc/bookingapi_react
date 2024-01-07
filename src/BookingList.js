import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BookingForm from './BookingForm';

const BookingList = () => {
    const navigate = useNavigate();

  const baseURL = "http://localhost:8080";

  const [bookings, setBookings] = useState([]);

  const getBookingsClickHandler = async () => {
    console.log("Start");

    await axios
      .get(baseURL + "/api/v1/booking/from/2024-01-11/to/2024-01-12")
      .then((response) => {
        console.log("RESPONSE:", response);
        if (response.status === 200) {
          console.log("DATA:", response.data);
          setBookings(response.data);
        }
      })
      .catch((error) => {
        console.log("ERROR:", error);
      });

    console.log("End");
  };

  const bookBookingClickHandler = async (id, email) => {
    axios
      .post(baseURL + "/api/v1/booking/book", { id, email })
      .then((response) => {
        console.log("RESPONSE:", response);
        if (response.status === 201) {
          console.log("Booking is Done!");
          getBookingsClickHandler();
        }
      })
      .catch((error) => {
        console.log("ERROR:", error);
        // display error message to user if error exist and its status was 400
        if(error.response){
            console.log(error.response.data);
        }
      });
  };
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleSuccessfulBooking = () => {
    getBookingsClickHandler(); // Refresh the bookings list after successful booking
    setSelectedBooking(null); // Hide the form after booking
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <button
            className="btn btn-info"
            type="button"
            onClick={getBookingsClickHandler}
          >
            Get Bookings
          </button>
        </div>
      </div>
      <div className="container mt-5">
        <div className="row">
          {bookings && bookings.length !== 0 && (
            <h2 className="mb-4">Booking List</h2>
          )}
          <div className="row">
            {bookings.map((booking) => (
              <div key={booking.id} className="card mb-4 col-md-3">
                <div className="card-body">
                  <h5 className="card-title">{booking.dateTime}</h5>
                 
                </div>
                <div className="d-grid card-footer">
          {selectedBooking === booking.id ? (
                <BookingForm
                  bookingId={booking.id}
                  dateTime={booking.dateTime}
                  onSuccessfulBooking={handleSuccessfulBooking}
                />
              ) : (
                  <button
                    type="button"
                    className={`btn btn-${booking.booked ? 'danger' : 'success'}`}
                    onClick={() =>setSelectedBooking(booking.id)}
                    disabled={booking.booked}
                  >
                    {booking.booked ? 'Booked' : 'Available'}
                  </button>
              )}
            
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
      
    </div>
  );
};

export default BookingList;