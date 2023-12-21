import React, { useState } from "react";
import axios from "axios";


const BookingList = () => {
 

  const baseURL = "http://localhost:8080";

  const [bookings, setBookings] = useState([]);

  const getBookingsClickHandler = async () => {
    console.log("Start");

    await axios
      .get(baseURL + "/api/v1/booking/from/2023-12-11/to/2023-12-12")
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
  const cancelBookingClickHandler = async (id, email) => {
    axios
      .post(baseURL + "/api/v1/booking/cancel", { id, email })
      .then((response) => {
        console.log("RESPONSE:", response);
        if (response.status === 500) {
          console.log("Cancel Booking is Done!");
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
                  <button
                    type="button"
                    className={`btn btn-${booking.booked ? 'danger' : 'success'}`}
                    onClick={() =>
                      bookBookingClickHandler(
                        booking.id,
                        "test.test@test.se"
                      )
                    }
                    disabled={`${booking.booked ? 'disabled' : ''}`}
                  >
                    {booking.booked ? 'Booked' : 'Available'}
                  </button>
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