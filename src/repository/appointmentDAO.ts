import { PrismaClient } from "@prisma/client";
import { AppointmentDTO } from "@/app/_home/Home/DTO/appointmentDTO";
const prisma = new PrismaClient();

export class AppointmentDAO {
  static async findAll() {
    const appointments = await prisma.agenda.findMany();
    console.log("Agendamentos encontrados:", appointments); // Debug
    return appointments;
  }
  
}
