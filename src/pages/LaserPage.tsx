import { useNavigate } from "react-router-dom";
import LaserScanner from "@/components/LaserScanner";
import { useMarcacion } from "@/hooks/useMarcacion";

const LaserPage = () => {
  const navigate = useNavigate();
  const { registrarMarcacion } = useMarcacion();

  const handleBack = () => {
    navigate("/attendance");
  };

  const handleScanSuccess = async (
    studentId: string,
    type: "ingreso" | "salida"
  ) => {
    await registrarMarcacion(studentId, type);
  };

  return <LaserScanner onBack={handleBack} onScanSuccess={handleScanSuccess} />;
};

export default LaserPage;
