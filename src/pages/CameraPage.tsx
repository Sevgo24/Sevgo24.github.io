import { useNavigate } from "react-router-dom";
import CameraScanner from "@/components/CameraScanner";
import { useMarcacion } from "@/hooks/useMarcacion";

const CameraPage = () => {
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

  return (
    <CameraScanner onBack={handleBack} onScanSuccess={handleScanSuccess} />
  );
};

export default CameraPage;
