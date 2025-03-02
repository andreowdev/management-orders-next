"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import ptLocale from "@fullcalendar/core/locales/pt";
import timeGridPlugin from "@fullcalendar/timegrid";
import "./ui/calendar.css";
import { Button } from "./ui/button";
import { useAppointments } from "@/app/_home/Home/Hooks/useAppointments";
import { useModal } from "@/app/_home/Home/Hooks/modal";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function Calendar() {
  const { error, events, loading } = useAppointments();
  const { isOpen, openModal, closeModal } = useModal()

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
      />

      {/* Botão para adicionar eventos */}
      <div>
        <Button className="cursor-pointer" onClick={openModal}>ADICIONAR EVENTOS</Button>
      </div>
      {isOpen && (
        <div className="fixed inset-0  bg-opacity-50 flex justify-center items-center z-50">
          <Card className="p-6 rounded-lg shadow-lg w-full sm:w-96">
            <h2 className="text-xl font-semibold mb-4">Adicionar Evento</h2>
            <form className="space-y-4">
              <Label htmlFor="eventTitle" className="block text-sm font-medium text-gray-700">
                Título:
              </Label>
              <Input
                type="text"
                id="eventTitle"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <Label htmlFor="eventDate" className="block text-sm font-medium text-gray-700">
                Data:
              </Label>
              <Input
                type="date"
                id="eventDate"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="flex justify-between items-center">
                <Button onClick={closeModal} className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
                  Fechar
                </Button>
                <Button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Salvar
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
