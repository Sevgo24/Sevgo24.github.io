import { Card } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4 py-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img
              src="/logo-college.jpeg"
              alt="Logo del colegio"
              className="w-16 h-22"
            />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Bienvenido al Sistema Escolar
          </h1>
          <p className="text-muted-foreground text-lg">
            Sistema integral de gestión educativa
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card
            className="p-8 hover:shadow-elevated transition-all duration-300 cursor-pointer"
            onClick={() => navigate("/attendance")}
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold">Control de Asistencia</h2>
              <p className="text-muted-foreground">
                Sistema de registro de asistencia por código QR con lector de
                cámara o láser
              </p>
              <Button className="w-full">Acceder</Button>
            </div>
          </Card>

          <Card
            className="p-8 hover:shadow-elevated transition-all duration-300 cursor-pointer"
            onClick={() => navigate("/enrollment")}
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold">Registro de Matrícula</h2>
              <p className="text-muted-foreground">
                Gestión completa del proceso de matrícula y registro de
                estudiantes
              </p>
              <Button className="w-full" variant="secondary">
                Acceder
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
