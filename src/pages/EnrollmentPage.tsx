import { Card } from "@/components/ui/card";
import { UserPlus } from "lucide-react";

const EnrollmentPage = () => {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <Card className="p-6 sm:p-8 shadow-lg">
        <div className="flex items-center gap-2 mb-6">
          <UserPlus className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-semibold">Registro de Matrícula</h2>
        </div>
        <p className="text-muted-foreground">
          Módulo de registro de matrícula en construcción...
        </p>
      </Card>
    </div>
  );
};

export default EnrollmentPage;
