'use client';

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import ptLocale from "@fullcalendar/core/locales/pt";
import "./ui/calendar.css"
export default function Calendar() {
  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        locale="pt"
        locales={[ptLocale]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,dayGridDay',
        }}
        eventColor="#FF5733"  // Personalize a cor de fundo do evento
        eventTextColor="#fff" // Cor do texto dos eventos
        events={[
          { title: 'Meeting', date: '2025-02-27' },
          { title: 'Conference', date: '2025-02-28' }
        ]}
      />
    </div>
  );
}
