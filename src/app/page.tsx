import Calendar from "@/components/calendar";
import { AppSidebar } from "@/components/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Dashboard() {
  return (
    <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
        <div className="flex-1 flex justify-center  ">
              <Calendar />
        </div>
    </SidebarProvider>
  );
}
