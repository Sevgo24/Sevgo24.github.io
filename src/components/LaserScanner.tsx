import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Scan } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import ScanTypeSelector from "./ScanTypeSelector";

interface LaserScannerProps {
  onBack: () => void;
  onScanSuccess: (studentId: string, type: "entrada" | "salida") => boolean;
}

const LaserScanner = ({ onBack, onScanSuccess }: LaserScannerProps) => {
  const [scanType, setScanType] = useState<"entrada" | "salida">("entrada");
  const [scannedCode, setScannedCode] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Capturar todo el input del teclado/escáner
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Si es Enter, procesar el código
      if (e.key === "Enter") {
        handleScan(scannedCode);
        return;
      }

      // Si es un caracter imprimible, agregarlo al código
      if (e.key.length === 1) {
        setScannedCode((prev) => prev + e.key);
        e.preventDefault();
      }

      // Si es Backspace, eliminar el último caracter
      if (e.key === "Backspace") {
        setScannedCode((prev) => prev.slice(0, -1));
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", handleGlobalKeyDown);

    return () => {
      document.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, [scannedCode]);

  const handleScan = (code: string) => {
    if (code.trim()) {
      const success = onScanSuccess(code, scanType);

      if (success) {
        toast.success(
          `${scanType === "entrada" ? "Entrada" : "Salida"} registrada`
        );
      } else {
        toast.error(
          `Ya existe un registro de ${scanType} reciente para este estudiante`
        );
      }

      setScannedCode("");

      // Refocus after a short delay
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5 p-4">
      <div className="mx-auto max-w-2xl space-y-4">
        <Button onClick={onBack} variant="ghost" className="mb-2">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver
        </Button>

        <Card className="p-6 sm:p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-6">Lector Láser</h2>

          <ScanTypeSelector value={scanType} onChange={setScanType} />

          <div className="space-y-6">
            <div className="flex flex-col items-center gap-4 p-8 bg-gradient-to-br from-secondary/10 to-accent/10 rounded-lg border-2 border-dashed border-secondary">
              <Scan className="w-16 h-16 text-secondary animate-pulse" />
              <p className="text-center text-muted-foreground">
                Escanea el código QR con el lector láser
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Código escaneado:</label>
              <Input
                ref={inputRef}
                type="text"
                value={scannedCode}
                placeholder="El código aparecerá automáticamente..."
                className="text-lg text-center"
                readOnly
                inputMode="none"
              />
            </div>

            <Button
              onClick={() => handleScan(scannedCode)}
              disabled={!scannedCode.trim()}
              className="w-full bg-gradient-to-r from-secondary to-accent"
              size="lg"
            >
              Registrar {scanType === "entrada" ? "Entrada" : "Salida"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LaserScanner;
