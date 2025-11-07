import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { ArrowLeft, AlertCircle, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import ScanTypeSelector from "./ScanTypeSelector";

interface CameraScannerProps {
  onBack: () => void;
  onScanSuccess: (studentId: string, type: "entrada" | "salida") => boolean;
}

const CameraScanner = ({ onBack, onScanSuccess }: CameraScannerProps) => {
  const [scanType, setScanType] = useState<"entrada" | "salida">("entrada");
  const [error, setError] = useState("");
  const [isCameraReady, setIsCameraReady] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const resumeTimeoutRef = useRef<number | null>(null);
  const lastScannedRef = useRef<{ code: string; timestamp: number } | null>(
    null
  );
  const elementId = "qr-reader";

  const startScanner = async () => {
    setError("");

    try {
      // Verificar permiso de cámara primero
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach((t) => t.stop());

      const scanner = new Html5Qrcode(elementId);
      scannerRef.current = scanner;

      try {
        await scanner.start(
          { facingMode: { exact: "environment" } },
          { fps: 10, qrbox: { width: 250, height: 250 } },
          (decodedText) => handleDecode(decodedText),
          (err) => console.warn("QR Scan error:", err)
        );
      } catch {
        // fallback para iPad/iPhone
        await scanner.start(
          { facingMode: "user" },
          { fps: 10, qrbox: { width: 250, height: 250 } },
          (decodedText) => handleDecode(decodedText),
          (err) => console.warn("QR Scan error:", err)
        );
      }

      setIsCameraReady(true);
    } catch (err) {
      console.error("Error starting camera:", err);
      setError(
        "No se pudo acceder a la cámara. Revisa los permisos del navegador."
      );
    }
  };

  const handleDecode = (decodedText: string) => {
    const now = Date.now();
    const last = lastScannedRef.current;

    if (last && last.code === decodedText && now - last.timestamp < 5000)
      return;

    lastScannedRef.current = { code: decodedText, timestamp: now };
    const success = onScanSuccess(decodedText, scanType);

    if (success) {
      toast.success(
        `${scanType === "entrada" ? "Entrada" : "Salida"} registrada`
      );
    } else {
      toast.error(
        `Ya existe un registro de ${scanType} reciente para este estudiante`
      );
    }

    scannerRef.current?.pause(true);
    resumeTimeoutRef.current = window.setTimeout(() => {
      scannerRef.current?.resume();
    }, 3000);
  };

  useEffect(() => {
    // Detener cámara al desmontar
    return () => {
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
      if (scannerRef.current) {
        scannerRef.current
          .stop()
          .catch((err) => console.warn("Error stopping camera:", err));
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="mx-auto max-w-2xl space-y-4">
        <Button onClick={onBack} variant="ghost" className="mb-2">
          <ArrowLeft className="w-4 h-4 mr-2" /> Volver
        </Button>

        <Card className="p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-4">
            Escaneo con Cámara
          </h2>

          <ScanTypeSelector value={scanType} onChange={setScanType} />

          {error ? (
            <div className="flex items-center gap-2 p-4 bg-destructive/10 text-destructive rounded-lg">
              <AlertCircle className="w-5 h-5" />
              <p className="text-sm">{error}</p>
            </div>
          ) : !isCameraReady ? (
            <div className="flex flex-col items-center gap-4 p-8 text-center">
              <Camera className="w-12 h-12 text-primary" />
              <p className="text-muted-foreground">
                Toca el botón para activar la cámara
              </p>
              <Button onClick={startScanner}>Activar cámara</Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div
                id={elementId}
                className="mx-auto rounded-lg overflow-hidden shadow-elevated"
                style={{ maxWidth: "100%" }}
              />
              <p className="text-center text-sm text-muted-foreground animate-pulse">
                Apunta la cámara al código QR...
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default CameraScanner;
