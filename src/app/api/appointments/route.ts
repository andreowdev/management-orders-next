import { NextResponse } from "next/server";
import { AppointmentDAO } from "@/repository/appointmentDAO";

export async function GET() {
  try {
    const appointments = await AppointmentDAO.findAll();
    return NextResponse.json(appointments, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar agendamentos" }, { status: 500 });
  }
}


