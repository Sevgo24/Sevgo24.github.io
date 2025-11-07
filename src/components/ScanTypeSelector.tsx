import { LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ScanTypeSelectorProps {
  value: "entrada" | "salida";
  onChange: (value: "entrada" | "salida") => void;
}

const ScanTypeSelector = ({ value, onChange }: ScanTypeSelectorProps) => {
  return (
    <div className="grid grid-cols-2 gap-3 mb-6 p-1 bg-muted rounded-lg">
      <Button
        onClick={() => onChange("entrada")}
        variant={value === "entrada" ? "default" : "ghost"}
        className={`gap-2 ${
          value === "entrada"
            ? "bg-gradient-to-r from-primary to-primary-glow shadow-md"
            : ""
        }`}
      >
        <LogIn className="w-4 h-4" />
        Entrada
      </Button>
      <Button
        onClick={() => onChange("salida")}
        variant={value === "salida" ? "default" : "ghost"}
        className={`gap-2 ${
          value === "salida"
            ? "bg-gradient-to-r from-secondary to-accent shadow-md"
            : ""
        }`}
      >
        <LogOut className="w-4 h-4" />
        Salida
      </Button>
    </div>
  );
};

export default ScanTypeSelector;
