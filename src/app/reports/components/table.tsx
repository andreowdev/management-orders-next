"use client"

import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAppointments } from "@/app/_home/Home/Hooks/getAppointment";

export default function TableReports() {
  const { error, events, loading } = useAppointments();

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar os dados.</p>;

  events.map((event) => {
    console.log("Data recebida:", event.start);
    return null;
  });

  return (
    <Table className="w-4/12">
      <TableCaption>Lista de agendamentos</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Serviço</TableHead>
          <TableHead>Data</TableHead>
          <TableHead>Descrição</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.length > 0 ? (
          events.map((event) => (
            <TableRow key={event.id}>
              <TableCell className="font-medium">{event.id}</TableCell>
              <TableCell>{event.title}</TableCell>
              <TableCell>
                {event.start
                  ? format(parseISO(event.start), "dd/MM/yyyy HH:mm", { locale: ptBR })
                  : "Data inválida"}
              </TableCell>
              <TableCell>{event.description}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={4} className="text-center text-gray-500">
              Nenhum agendamento encontrado.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
