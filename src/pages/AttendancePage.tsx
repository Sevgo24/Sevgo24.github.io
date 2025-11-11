import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Scan, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { marcacionApi, TipoMarcacion } from "@/api";

const AttendancePage = () => {
  const navigate = useNavigate();
  const [tipoMarcacion, setTipoMarcacion] = useState<TipoMarcacion[]>([]);
  const [selectedTipo, setSelectedTipo] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchTipoMarcacion = async () => {
      try {
        const tipos = await marcacionApi.obtenerTipos();
        setTipoMarcacion(tipos);
        let condition = localStorage.getItem("tipoMarcacionId");
        if (condition) {
          setSelectedTipo(condition);
        }
      } catch (error) {
        console.error("Error fetching tipo marcacion:", error);
      }
    };
    fetchTipoMarcacion();
  }, []);

  const handleNavigate = (path: string) => {
    if (!selectedTipo) {
      setError("Debes seleccionar un tipo de marcación antes de continuar.");
      return;
    }
    setError("");
    navigate(path);
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Scanner Mode Selection */}
      <Card className="p-6 sm:p-8 shadow-lg">
        <div className="flex items-center justify-center gap-3 mb-4">
          <img
            src="/logo-college.jpeg"
            alt="Logo del colegio"
            className="w-40 h-46"
          />
        </div>
        <div className="space-y-4">
          <div className="max-w-xs mx-auto">
            <Select
              onValueChange={(value) => {
                setSelectedTipo(value);
                localStorage.setItem("tipoMarcacionId", value);
                setError("");
              }}
              value={selectedTipo}
              defaultValue={selectedTipo}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona tipo de marcación" />
              </SelectTrigger>
              <SelectContent>
                {tipoMarcacion.map((tipo) => (
                  <SelectItem
                    key={tipo.tipoMarcacionId}
                    value={String(tipo.tipoMarcacionId)}
                  >
                    {tipo.descripcion}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {error && (
              <Alert variant="warning" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Advertencia</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>

          <div className="flex items-center gap-2 mb-6">
            <Scan className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Selecciona el escaneo</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Button
              onClick={() => handleNavigate("/camera")}
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
              onClick={() => handleNavigate("/laser")}
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

            <Button
              onClick={() => handleNavigate("/attendance-list")}
              size="lg"
              className="h-32 flex-col gap-3 bg-blue-100 text-blue-700 border-2 border-blue-400 hover:bg-blue-200 hover:shadow-lg transition-all duration-300"
            >
              <Scan className="w-12 h-12" />
              <span className="text-lg font-semibold">
                Bandeja de Marcaciones
              </span>
              <span className="text-xs opacity-90">Ver registros del día</span>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AttendancePage;
