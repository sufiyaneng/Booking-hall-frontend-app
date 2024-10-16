import React, { useEffect, useState } from "react";
import { createBooking } from "../api/auth";

const BookingForm = ({
  onBookingCreated,
  selectedDate,
  setShowBookingForm,
}) => {
  const [bookingFormData, setBookingFormData] = useState({
    customerName: "",
    address: "",
    phone: "",
    description: "",
    bookingDate: selectedDate,
    bookSession: "",
    eventType: "",
    amountPaid: 0,
    completed: false,
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    // Update bookingDate whenever selectedDate changes
    setBookingFormData((prevData) => ({
      ...prevData,
      bookingDate: selectedDate,
    }));
  }, [selectedDate]);

  const handleBookingChange = (e) => {
    const { name, value } = e.target;

    setBookingFormData({ ...bookingFormData, [name]: value });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    try {
      const resp = await createBooking(bookingFormData);
      onBookingCreated(resp.data);
    } catch (error) {
      setError(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleBookingSubmit}>
        <div>
          <label htmlFor="">customerName</label>
          <input
            type="text"
            name="customerName"
            value={bookingFormData.customerName}
            onChange={handleBookingChange}
            placeholder="enter customer name"
          />
        </div>
        <div>
          <label htmlFor="">Adress</label>
          <input
            type="text"
            name="address"
            value={bookingFormData.address}
            onChange={handleBookingChange}
            placeholder="enter address"
          />
        </div>
        <div>
          <label htmlFor="">Phone</label>
          <input
            type="text"
            name="phone"
            value={bookingFormData.phone}
            onChange={handleBookingChange}
            placeholder="enter mobile number"
          />
        </div>
        <div>
          <label htmlFor="">Description</label>
          <input
            type="text"
            name="description"
            value={bookingFormData.description}
            onChange={handleBookingChange}
            placeholder="enter description"
          />
        </div>
        <div>
          <label htmlFor="">BookingDate</label>
          <input
            type="date"
            name="bookingDate"
            value={bookingFormData.bookingDate}
            onChange={handleBookingChange}
            placeholder="enter booking date"
          />
        </div>
        <div>
          <label htmlFor="">BookSession</label>
          <select
            name="bookSession"
            value={bookingFormData.bookSession}
            onChange={handleBookingChange}
          >
            <option value="Morning Session">Morning Session</option>
            <option value="Evening Session">Evening Session</option>
          </select>
        </div>
        <div>
          <label htmlFor="">Event-Type</label>
          <select
            name="eventType"
            value={bookingFormData.eventType}
            onChange={handleBookingChange}
          >
            <option value="Marriage">Marriage</option>
            <option value="Valima">Valima</option>
            <option value="Engagement">Engagement</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div style={{ display: "flex" }}>
          <label htmlFor="">Amount-Paid</label>
          <input
            type="number"
            name="amountPaid"
            value={bookingFormData.amountPaid}
            onChange={handleBookingChange}
            placeholder="Amount Paid"
          />
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button type="submit" className="booking_btn">
            Create Booking
          </button>
          <button
            className="booking_btn"
            style={{ backgroundColor: "red", color: "white" }}
            onClick={() => setShowBookingForm(false)}
          >
            Cancel Booking
          </button>
        </div>

        {error && <p>Error: {error.message}</p>}
      </form>
    </div>
  );
};

export default BookingForm;
