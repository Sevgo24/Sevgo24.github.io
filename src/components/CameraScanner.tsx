import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ScanTypeSelector from "./ScanTypeSelector";

interface CameraScannerProps {
  onBack: () => void;
  onScanSuccess: (
    studentId: string,
    type: "ingreso" | "salida"
  ) => Promise<void> | boolean;
}

const CameraScanner = ({ onBack, onScanSuccess }: CameraScannerProps) => {
  const [scanType, setScanType] = useState<"ingreso" | "salida">("ingreso");
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string>("");
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const resumeTimeoutRef = useRef<number | null>(null);
  const isScannerRunningRef = useRef(false);
  const scanTypeRef = useRef<"ingreso" | "salida">("ingreso");
  const lastScannedRef = useRef<{ code: string; timestamp: number } | null>(
    null
  );
  const elementId = "qr-reader";

  // Update scanTypeRef when scanType changes
  scanTypeRef.current = scanType;

  useEffect(() => {
    const startScanner = async () => {
      try {
        const scanner = new Html5Qrcode(elementId);
        scannerRef.current = scanner;

        await scanner.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          (decodedText) => {
            const now = Date.now();
            const lastScanned = lastScannedRef.current;

            // Prevenir escaneos duplicados del mismo código en 5 segundos
            if (
              lastScanned &&
              lastScanned.code === decodedText &&
              now - lastScanned.timestamp < 5000
            ) {
              return;
            }

            const currentType = scanTypeRef.current;
            lastScannedRef.current = { code: decodedText, timestamp: now };

            // Intentar registrar el escaneo
            onScanSuccess(decodedText, currentType);

            scanner.pause(true);
            isScannerRunningRef.current = false;
            resumeTimeoutRef.current = window.setTimeout(() => {
              if (scannerRef.current) {
                scanner.resume();
                isScannerRunningRef.current = true;
              }
            }, 3000);
          },
          (errorMessage) => {
            // Ignore errors during scanning
            console.warn("QR Scan Error:", errorMessage);
          }
        );

        isScannerRunningRef.current = true;
        setIsScanning(true);
        setError("");
      } catch (err) {
        setError(
          "No se pudo acceder a la cámara. Por favor, verifica los permisos."
        );
        console.error("Error starting scanner:", err);
      }
    };

    startScanner();

    return () => {
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }

      if (scannerRef.current && isScannerRunningRef.current) {
        scannerRef.current
          .stop()
          .then(() => {
            scannerRef.current = null;
            isScannerRunningRef.current = false;
          })
          .catch((err) => {
            console.error("Error stopping scanner:", err);
            scannerRef.current = null;
            isScannerRunningRef.current = false;
          });
      }
    };
  }, [onScanSuccess]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="mx-auto max-w-2xl space-y-4">
        <Button onClick={onBack} variant="ghost" className="mb-2">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver
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
          ) : (
            <div className="space-y-4">
              <div
                id={elementId}
                className="mx-auto rounded-lg overflow-hidden shadow-elevated"
                style={{ maxWidth: "100%" }}
              />

              {isScanning && (
                <p className="text-center text-sm text-muted-foreground animate-pulse">
                  Apunta la cámara al código QR...
                </p>
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default CameraScanner;
