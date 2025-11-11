import { format } from "date-fns";
import { es } from "date-fns/locale";
import { LogIn, LogOut } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Marcacion } from "@/api";

interface AttendanceListProps {
  records: Marcacion[];
}

const AttendanceList = ({ records }: AttendanceListProps) => {
  return (
    <ScrollArea className="h-[350px] pr-4">
      <div className="space-y-3">
        {records.length === 0 && (
          <p className="text-center text-muted-foreground">
            No hay marcaciones registradas para hoy.
          </p>
        )}

        {records.map((record) => (
          <div
            key={record.marcacionId}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-card rounded-lg border shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                <p className="font-semibold">Matrícula #{record.matriculaId}</p>
                <p className="text-sm text-muted-foreground">
                  Fecha:{" "}
                  {format(new Date(record.fecha), "dd/MM/yyyy", { locale: es })}
                </p>
              </div>
            </div>

            <div className="flex gap-4 justify-center sm:justify-end">
              {/* Hora de ingreso */}
              {record.horaIngreso && (
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-primary/10 text-primary">
                    <LogIn className="w-4 h-4" />
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-primary">
                      Ingreso
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {format(
                        new Date(`${record.fecha}T${record.horaIngreso}`),
                        "HH:mm:ss",
                        { locale: es }
                      )}
                    </p>
                  </div>
                </div>
              )}

              {/* Hora de salida */}
              {record.horaSalida && (
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-secondary/10 text-secondary">
                    <LogOut className="w-4 h-4" />
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-secondary">
                      Salida
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {format(
                        new Date(`${record.fecha}T${record.horaSalida}`),
                        "HH:mm:ss",
                        { locale: es }
                      )}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default AttendanceList;
