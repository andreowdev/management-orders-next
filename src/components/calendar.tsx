"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import ptLocale from "@fullcalendar/core/locales/pt";
import { Button } from "./ui/button";
import { useAppointments } from "@/app/_home/Home/Hooks/getAppointment";
import { useModal } from "@/hooks/modal";
import { Modal } from "./ui/Modal";
import "./ui/calendar.css"
import AppointmentForm from "./ui/formEvent";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"


export default function Calendar() {
  const { error, events, loading } = useAppointments();
  const { isOpen, openModal, closeModal, selectedEvent } = useModal();

  if (loading) {
    return <div>Carregando eventos...</div>;
  }

  if (error) {
    return <div>Erro ao carregar eventos: {error}</div>;
  }

  const availableTimes = ["09:00", "10:30", "14:00", "16:00"];


  return (
    <div className="calendar-container">
      <FullCalendar
  plugins={[dayGridPlugin, timeGridPlugin]}
  initialView="timeGridWeek"
  locale="pt"
  locales={[ptLocale]}
  timeZone="local"
  events={events}
  headerToolbar={{
    left: "prev,next today",
    center: "title",
    right: "dayGridMonth,timeGridWeek,timeGridDay",
  }}
  eventColor="#FF5733"
  eventTextColor="#fff"
  eventContent={(info) => {
    const title = info.event.title;
    return `${title}`;
  }}
  eventClassNames={() => "cursor-pointer"}
  eventClick={(info: { event: any }) => {
    openModal(info.event);
  }}

/>


      {/* Botão para adicionar eventos */}
      <div className="mt-4">
      <Button className="cursor-pointer transition duration-300 ease-in-out transform hover:scale-110" onClick={() => openModal()}>
        ADICIONAR EVENTOS
      </Button>
      </div>

      {/* Modal para visualizar e adicionar eventos */}
      <Modal isOpen={isOpen} onClose={closeModal} title={selectedEvent ? "Detalhes do Evento" : ""}>
      {selectedEvent ? (
        <Card>
          <CardHeader>
            <CardTitle>Título: {selectedEvent.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Início:</strong> {new Date(selectedEvent.start).toLocaleString()}</p>
            {selectedEvent.extendedProps.description && (
              <p><strong>Descrição:</strong> {selectedEvent.extendedProps.description}</p>
            )}
          </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Adicione um novo evento!</CardTitle>
              <CardDescription>Insira os dados necessários!</CardDescription>
            </CardHeader>
            <CardContent>
            <AppointmentForm availableTimes={availableTimes} onSuccess={() => console.log("Agendamento criado com sucesso!")} />

            </CardContent>

          </Card>
        )}
      </Modal>
    </div>
  );
}