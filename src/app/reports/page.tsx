
import { AppSidebar } from "@/components/sidebar/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import TableReports from "./components/table";


export default function Reports() {
  return(
    <SidebarProvider>
    <AppSidebar />
    <SidebarTrigger className="cursor-pointer" />
    <div className="flex-col lg:items-center w-10/12 h-5/12">
      <h1 className="text-2xl text-center mb-4">Página de Relatório</h1>
      <main>

      <TableReports />
      </main>
    </div>
  </SidebarProvider>
  )
}