import { useState, useEffect } from "react";

export function useAppointments() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchAppointments() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/appointments");

      if (!response.ok) {
        throw new Error("Erro ao buscar agendamentos");
      }

      const data = await response.json();
      console.log("Dados da API:", data);

      setEvents(
        data.map((appointment: any) => {
          const start = new Date(appointment.date);

          let end = new Date(appointment.time);

          if (isNaN(start.getTime())) {
            console.error("Data de início inválida:", appointment.date);
          }


          return {
            id: appointment.id,
            title: appointment.title || "Agendamento",
            start: start.toISOString(),
            description: appointment.description,
          };
        })
      );
    } catch (error) {
      setError("Erro ao buscar eventos");
      console.error("Erro ao buscar eventos:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAppointments();
  }, []);

  return { events, loading, error };
}

