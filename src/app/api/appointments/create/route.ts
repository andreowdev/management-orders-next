import { NextResponse } from "next/server";
import { AppointmentDAO } from "@/repository/appointmentDAO";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { title, date, description } = body;
    if (!title || !date || !description) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios" },
        { status: 400 }
      );
    }

    const newAppointment = await AppointmentDAO.create({
      title,
      date,
      description,
    });

    return NextResponse.json(newAppointment, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar agendamento:", error);
    return NextResponse.json(
      { error: "Erro ao criar agendamento" },
      { status: 500 }
    );
  }
}
