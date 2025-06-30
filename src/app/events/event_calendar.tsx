"use client";
import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import 'moment-timezone';

export type Event = {
  id: number;
  title: string;
  datetime_start: string;
  datetime_end: string;
};
moment.tz.setDefault('Europe/Zagreb');

export default function EventCalendar({ events }: { events: Event[] }) {
  console.log(events);
  const formatted = events.map(e => ({
    ...e,
    start: new Date(e.datetime_start),
    end: new Date(e.datetime_end),
    title: e.title,
  }));

  const [date, setDate] = useState(new Date());
  const localizer = momentLocalizer(moment);

  const handleNavigate = (newDate: Date) => {
    setDate(newDate);
    console.log("Navigated to week starting on:", newDate);
  };

  return (
    <Calendar
      localizer={localizer}
      events={formatted}
      startAccessor="start"
      endAccessor="end"
      titleAccessor="title"
      views={["week"]}
      defaultView="week"
      date={date}
      onNavigate={handleNavigate} // Handles prev/next week navigation
      style={{ height: 600, marginBottom: 50 }}
    />
  );
}