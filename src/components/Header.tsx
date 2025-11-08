import { SidebarTrigger } from "@/components/ui/sidebar";
import { GraduationCap } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center gap-4 px-4">
        <SidebarTrigger />
        <div className="flex items-center gap-3 flex-1 justify-center">
          <GraduationCap className="w-8 h-8 text-primary" />
          <h1 className="text-xl font-semibold">Sistema Escolar</h1>
        </div>
      </div>
    </header>
  );
}
