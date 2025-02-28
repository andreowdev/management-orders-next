"use client";
import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import ptLocale from "@fullcalendar/core/locales/pt";
import timeGridPlugin from "@fullcalendar/timegrid";
import "./ui/calendar.css";

export default function Calendar() {
  const [events, setEvents] = useState([]);

  async function fetchAppointments() {
    try {
      const response = await fetch("/api/appointments");

      if (!response.ok) {
        throw new Error("Erro ao buscar agendamentos");
      }

      const data = await response.json();
      console.log("Dados da API:", data);

      setEvents(
        data.map((appointment: any) => {
          // Convertendo as strings para objetos Date
          const start = new Date(appointment.date); // date vem como string no formato ISO (ex: "2025-02-28T10:00:00")
      
          // Verificação de validade da data de término
          let end = new Date(appointment.time); // time vem como string (ex: "2025-02-28T10:30:00")
      
          // Se a string for inválida, podemos configurar um fallback ou mostrar erro
          if (isNaN(start.getTime())) {
            console.error("Data de início inválida:", appointment.date);
          }
      
          if (isNaN(end.getTime())) {
            console.error("Data de término inválida:", appointment.time);
            // Fallback: se não for válida, usamos a data de início
            end = new Date(appointment.date); // Usando a mesma data de início como fallback
          }
      
          // Convertendo para o formato ISO, sem ajustar manualmente para o fuso horário
          return {
            id: appointment.id,
            title: appointment.title || "Agendamento",
            start: start.toISOString(), // Convertendo para formato ISO
            end: end.toISOString(), // Convertendo para formato ISO
            description: appointment.description,
          };
        })
      );
      
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
    }
  }

  useEffect(() => {
    fetchAppointments(); // Chamada correta da API
  }, []);

  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="timeGridWeek"
        locale="pt"
        locales={[ptLocale]}
        timeZone="local"  // Garante que o fuso horário local seja usado
        events={events}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        eventColor="#FF5733"
        eventTextColor="#fff"
        eventClassNames={() => "cursor-pointer"}
      />

    </div>
  );
}
