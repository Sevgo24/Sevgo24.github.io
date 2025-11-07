import { useState } from "react";
import { Camera, Scan, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import CameraScanner from "@/components/CameraScanner";
import LaserScanner from "@/components/LaserScanner";
import AttendanceList from "@/components/AttendanceList";

export type ScannerMode = "camera" | "laser" | null;

export interface AttendanceRecord {
  id: string;
  studentId: string;
  name: string;
  type: "entrada" | "salida";
  timestamp: Date;
}

const TEN_MINUTES_MS = 10 * 60 * 1000; // 10 minutos en milisegundos

const Index = () => {
  const [scannerMode, setScannerMode] = useState<ScannerMode>(null);
  const [attendanceRecords, setAttendanceRecords] = useState<
    AttendanceRecord[]
  >([]);

  const handleScanSuccess = (
    studentId: string,
    type: "entrada" | "salida"
  ): boolean => {
    const now = new Date();

    // Buscar registros del mismo estudiante en los últimos 10 minutos
    const recentRecords = attendanceRecords.filter((record) => {
      const timeDiff = now.getTime() - record.timestamp.getTime();
      return record.studentId === studentId && timeDiff < TEN_MINUTES_MS;
    });

    // Validar según el tipo de registro
    if (type === "entrada") {
      // Buscar si ya hay una entrada sin salida posterior
      const lastEntrada = recentRecords.find((r) => r.type === "entrada");
      const lastSalida = recentRecords.find((r) => r.type === "salida");

      if (
        lastEntrada &&
        (!lastSalida || lastSalida.timestamp < lastEntrada.timestamp)
      ) {
        return false; // Ya hay una entrada registrada
      }
    } else if (type === "salida") {
      // Buscar si ya hay una salida reciente
      const lastSalida = recentRecords.find((r) => r.type === "salida");
      const lastEntrada = recentRecords.find((r) => r.type === "entrada");

      if (
        lastSalida &&
        (!lastEntrada || lastEntrada.timestamp < lastSalida.timestamp)
      ) {
        return false; // Ya hay una salida registrada
      }
    }

    // Si pasó las validaciones, crear el registro
    const newRecord: AttendanceRecord = {
      id: crypto.randomUUID(),
      studentId,
      name: `Estudiante ${studentId.slice(0, 6)}`,
      type,
      timestamp: now,
    };
    setAttendanceRecords((prev) => [newRecord, ...prev]);
    return true;
  };

  const handleBack = () => {
    setScannerMode(null);
  };

  if (scannerMode === "camera") {
    return (
      <CameraScanner onBack={handleBack} onScanSuccess={handleScanSuccess} />
    );
  }

  if (scannerMode === "laser") {
    return (
      <LaserScanner onBack={handleBack} onScanSuccess={handleScanSuccess} />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <header className="text-center space-y-2 py-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Users className="w-10 h-10 text-primary" />
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Control de Asistencia
            </h1>
          </div>
          <p className="text-muted-foreground text-sm sm:text-base">
            Sistema de registro escolar por código QR
          </p>
        </header>

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
                onClick={() => setScannerMode("camera")}
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
                onClick={() => setScannerMode("laser")}
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
    </div>
  );
};

export default Index;
