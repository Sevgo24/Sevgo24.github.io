import { useNavigate } from "react-router-dom";
import LaserScanner from "@/components/LaserScanner";
import { useAttendance } from "@/hooks/useAttendance";

const LaserPage = () => {
  const navigate = useNavigate();
  const { handleScanSuccess } = useAttendance();

  const handleBack = () => {
    navigate("/");
  };

  return <LaserScanner onBack={handleBack} onScanSuccess={handleScanSuccess} />;
};

export default LaserPage;
