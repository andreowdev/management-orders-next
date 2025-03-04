import { PrismaClient } from "@prisma/client";
import { AppointmentDTO } from "@/app/_home/Home/DTO/appointmentDTO";
const prisma = new PrismaClient();

export class AppointmentDAO {
  static async findAll() {
    const appointments = await prisma.agenda.findMany();
    console.log("Agendamentos encontrados:", appointments);
    return appointments;
  }
  static async create(data: AppointmentDTO) {
    try {
      const newAppointment = await prisma.agenda.create({data})
      return newAppointment;
    } catch (error) {
      console.error("Erro ao criar agendamento:", error);
      throw error;
    }
  }
  
}
