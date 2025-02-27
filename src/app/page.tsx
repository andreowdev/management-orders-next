import Navbar from "@/components/navbar";
import TableAgendas from "@/components/tableAgendas";

export default function Dashboard() {
  return (
    <div className="items-center justify-items-center     font-[family-name:var(--font-geist-sans)]">
        <div className="w-full">
        </div>
      <main className="">
        <div>
            <h1>Agenda de Pedidos</h1>
            <TableAgendas />
        </div>
      </main>
    </div>
  );
}
