import { useState, useEffect } from "react";

export interface AttendanceRecord {
  id: string;
  studentId: string;
  name: string;
  type: "entrada" | "salida";
  timestamp: Date;
}

const TEN_MINUTES_MS = 10 * 60 * 1000;
const STORAGE_KEY = "attendance_records";

export const useAttendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return parsed.map((record: any) => ({
          ...record,
          timestamp: new Date(record.timestamp),
        }));
      } catch {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(attendanceRecords)
    );
  }, [attendanceRecords]);

  const handleScanSuccess = (studentId: string, type: "entrada" | "salida"): boolean => {
    const now = new Date();
    
    const recentRecords = attendanceRecords.filter(record => {
      const timeDiff = now.getTime() - record.timestamp.getTime();
      return record.studentId === studentId && timeDiff < TEN_MINUTES_MS;
    });
    
    if (type === "entrada") {
      const lastEntrada = recentRecords.find(r => r.type === "entrada");
      const lastSalida = recentRecords.find(r => r.type === "salida");
      
      if (lastEntrada && (!lastSalida || lastSalida.timestamp < lastEntrada.timestamp)) {
        return false;
      }
    } else if (type === "salida") {
      const lastSalida = recentRecords.find(r => r.type === "salida");
      const lastEntrada = recentRecords.find(r => r.type === "entrada");
      
      if (lastSalida && (!lastEntrada || lastEntrada.timestamp < lastSalida.timestamp)) {
        return false;
      }
    }
    
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

  return { attendanceRecords, handleScanSuccess };
};
