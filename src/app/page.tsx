import Calendar from "@/components/calendar";
import { AppSidebar } from "@/components/sidebar/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Home() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger className="cursor-pointer" />
      <div className="flex-col lg:items-center w-10/12 h-5/12">
        <h1 className="text-2xl text-center mb-4">Agenda Completa</h1>
          <Calendar />
      </div>
    </SidebarProvider>
  );
}
