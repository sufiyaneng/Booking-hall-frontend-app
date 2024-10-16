import React, { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import BookingForm from "./BookingForm";
import "../styles/modal.css";
import { getAllBokkings } from "../api/auth";

const Calendar = () => {
  const calendarComponentRef = useRef(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [bookings, setBookings] = useState([]); // Store bookings as events

  console.log("booking", bookings);
  useEffect(() => {
    const getAllBooking = async () => {
      try {
        const resp = await getAllBokkings();
        console.log("resp", resp.data);
        const bookingData = resp?.data;
        const events = bookingData?.map((booking) => ({
          title: booking.customerName,
          start: booking.bookingDate,
          extendedProps: {
            bookSession: "Morning Session",
            eventType: booking.eventType,
          },
          allDay: true,
        }));
        setBookings(events);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    getAllBooking();
  }, []);

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
        extendedProps: {
          bookSession: newBooking.bookSession,
          eventType: newBooking.eventType,
        },
        allDay: true,
      },
    ]);
    setShowBookingForm(false); // Close the form modal
  };

  const showEventContent = (ev) => {
    console.log("ev", ev);
    return (
      <div className="main-event">
        <span className="event-title">{ev.event.title}</span>
        <span className="book-session">
          {ev.event.extendedProps.bookSession}
        </span>
        <span className="event-type">{ev.event.extendedProps.eventType}</span>
      </div>
    );
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
        eventContent={showEventContent} // Use custom content for event titles
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
