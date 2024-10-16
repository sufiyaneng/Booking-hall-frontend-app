import React, { useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import BookingForm from "./BookingForm";
import "../styles/modal.css";

const Calendar = () => {
  const calendarComponentRef = useRef(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [bookings, setBookings] = useState([]); // Store bookings as events

  const handleDateClick = (arg) => {
    console.log("arg", arg);
    setSelectedDate(arg.dateStr);
    setShowBookingForm(true);
  };

  const hadleBookingCreated = (newBooking) => {
    setBookings((prevBookings) => [
      ...prevBookings,
      {
        title: newBooking.customerName,
        start: newBooking.bookingDate,
        allDay: true,
      },
    ]);
    setShowBookingForm(false); // Close the form modal
  };
  return (
    <div className="cal_main">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        ref={calendarComponentRef}
        header={{
          left: "prev,next",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,customWeeks",
        }}
        dateClick={handleDateClick} // Trigger modal on date click
        events={bookings} // Load booking events from bookings state
      />

      {showBookingForm && (
        <div className="modal">
          <BookingForm
            onBookingCreated={hadleBookingCreated}
            selectedDate={selectedDate}
            setShowBookingForm={setShowBookingForm}
          />
        </div>
      )}
    </div>
  );
};

export default Calendar;
