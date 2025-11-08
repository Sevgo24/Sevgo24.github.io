import { useNavigate } from "react-router-dom";
import CameraScanner from "@/components/CameraScanner";
import { useAttendance } from "@/hooks/useAttendance";

const CameraPage = () => {
  const navigate = useNavigate();
  const { handleScanSuccess } = useAttendance();

  const handleBack = () => {
    navigate("/");
  };

  return (
    <CameraScanner onBack={handleBack} onScanSuccess={handleScanSuccess} />
  );
};

export default CameraPage;
