import { useNavigate } from "react-router-dom";
import { Camera, Scan, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import AttendanceList from "@/components/AttendanceList";
import { useAttendance } from "@/hooks/useAttendance";

const AttendancePage = () => {
  const navigate = useNavigate();
  const { attendanceRecords } = useAttendance();

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Scanner Mode Selection */}
      <Card className="p-6 sm:p-8 shadow-lg">
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-6">
            <Scan className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">
              Selecciona el método de escaneo
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Button
              onClick={() => navigate("/camera")}
              size="lg"
              className="h-32 flex-col gap-3 bg-gradient-to-br from-primary to-primary-glow hover:shadow-elevated transition-all duration-300"
            >
              <Camera className="w-12 h-12" />
              <span className="text-lg font-semibold">Cámara</span>
              <span className="text-xs opacity-90">
                Escaneo con cámara del dispositivo
              </span>
            </Button>

            <Button
              onClick={() => navigate("/laser")}
              size="lg"
              variant="secondary"
              className="h-32 flex-col gap-3 bg-gradient-to-br from-secondary to-accent hover:shadow-elevated transition-all duration-300"
            >
              <Scan className="w-12 h-12" />
              <span className="text-lg font-semibold">Lector Láser</span>
              <span className="text-xs opacity-90">
                Lector externo conectado
              </span>
            </Button>
          </div>
        </div>
      </Card>

      {/* Recent Attendance */}
      {attendanceRecords.length > 0 && (
        <Card className="p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Registros Recientes</h2>
          </div>
          <AttendanceList records={attendanceRecords} />
        </Card>
      )}
    </div>
  );
};

export default AttendancePage;
