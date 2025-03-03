"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import ptLocale from "@fullcalendar/core/locales/pt";
import { Button } from "./ui/button";
import { useAppointments } from "@/app/_home/Home/Hooks/useAppointments";
import { useModal } from "@/hooks/modal";
import { Modal } from "./ui/Modal";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
export default function Calendar() {
  const { error, events, loading } = useAppointments();
  const { isOpen, openModal, closeModal, selectedEvent } = useModal();

  // Exibição do carregamento ou erro
  if (loading) {
    return <div>Carregando eventos...</div>;
  }

  if (error) {
    return <div>Erro ao carregar eventos: {error}</div>;
  }


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
        eventClassNames={() => "cursor-pointer"}
        eventClick={(info) => {
          openModal(info.event);
        }}
      />

      {/* Botão para adicionar eventos */}
      <div className="mt-4">
        <Button className="cursor-pointer" onClick={() => openModal()}>
          ADICIONAR EVENTOS
        </Button>
      </div>

      {/* Modal para visualizar e adicionar eventos */}
      <Modal isOpen={isOpen} onClose={closeModal} title={selectedEvent ? "Detalhes do Evento" : "Adicionar Evento"}>
        {selectedEvent ? (
          <div>
            <p><strong>Título:</strong> {selectedEvent.title}</p>
            <p><strong>Início:</strong> {new Date(selectedEvent.start).toLocaleString()}</p>
            {selectedEvent.extendedProps.description && (
              <p><strong>Descrição:</strong> {selectedEvent.extendedProps.description}</p>
            )}
          </div>
        ) : (
          <form className="space-y-4">
            <div>
              <Label htmlFor="eventTitle" className="block text-sm font-medium text-gray-700">
                Título:
              </Label>
              <Input
                type="text"
                id="eventTitle"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <Label htmlFor="eventDate" className="block text-sm font-medium text-gray-700">
                Data:
              </Label>
              <Input
                type="date"
                id="eventDate"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Salvar
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
