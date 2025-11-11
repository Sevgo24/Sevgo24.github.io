import { useEffect } from "react";
import { useMarcacion } from "@/hooks/useMarcacion";
import AttendanceList from "@/components/AttendanceList";
import { Button } from "@/components/ui/button";
import { RefreshCw, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AttendanceListPage = () => {
  const navigate = useNavigate();
  const { marcaciones, loading, obtenerMarcacionesDelDia } = useMarcacion();

  useEffect(() => {
    obtenerMarcacionesDelDia(1);
  }, [obtenerMarcacionesDelDia]);

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-6">
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 w-4 h-4" /> Volver
        </Button>
        <Button onClick={() => obtenerMarcacionesDelDia(1)} disabled={loading}>
          <RefreshCw
            className={`mr-2 w-4 h-4 ${loading ? "animate-spin" : ""}`}
          />
          Actualizar
        </Button>
      </div>

      <h2 className="text-2xl font-bold mb-4">Marcaciones del Día</h2>

      {loading && <p className="text-gray-500">Cargando marcaciones...</p>}
      {!loading && <AttendanceList records={marcaciones as any} />}
    </div>
  );
};

export default AttendanceListPage;
