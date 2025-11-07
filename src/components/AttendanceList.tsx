import { format } from "date-fns";
import { es } from "date-fns/locale";
import { LogIn, LogOut } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { AttendanceRecord } from "@/pages/Index";

interface AttendanceListProps {
  records: AttendanceRecord[];
}

const AttendanceList = ({ records }: AttendanceListProps) => {
  return (
    <ScrollArea className="h-[300px] pr-4">
      <div className="space-y-3">
        {records.map((record) => (
          <div
            key={record.id}
            className="flex items-center gap-3 p-4 bg-card rounded-lg border shadow-sm hover:shadow-md transition-shadow"
          >
            <div
              className={`p-2 rounded-full ${
                record.type === "entrada"
                  ? "bg-primary/10 text-primary"
                  : "bg-secondary/10 text-secondary"
              }`}
            >
              {record.type === "entrada" ? (
                <LogIn className="w-5 h-5" />
              ) : (
                <LogOut className="w-5 h-5" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate">{record.name}</p>
              <p className="text-sm text-muted-foreground">
                ID: {record.studentId.slice(0, 12)}
              </p>
            </div>

            <div className="text-right">
              <p
                className={`text-sm font-semibold ${
                  record.type === "entrada" ? "text-primary" : "text-secondary"
                }`}
              >
                {record.type === "entrada" ? "Entrada" : "Salida"}
              </p>
              <p className="text-xs text-muted-foreground">
                {format(record.timestamp, "HH:mm:ss", { locale: es })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default AttendanceList;
