import { useState, useCallback } from "react";
import { marcacionApi, TipoMarcacion, RegistrarMarcacionRequest, Marcacion } from "@/api";
import { toast } from "@/hooks/use-toast";

export const useMarcacion = () => {
  const [tipos, setTipos] = useState<TipoMarcacion[]>([]);
  const [marcaciones, setMarcaciones] = useState<Marcacion[]>([]);
  const [loading, setLoading] = useState(false);

  const obtenerTipos = useCallback(async () => {
    try {
      setLoading(true);
      const response = await marcacionApi.obtenerTipos();
      setTipos(response);
      toast({
        title: "Tipos de marcación cargados",
        description: "Se obtuvieron correctamente los tipos de marcación.",
      });
    } catch (error) {
      toast({
        title: "Error al obtener tipos",
        description: "No se pudieron obtener los tipos de marcación.",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const registrarMarcacion = useCallback(
    async (studentId: string, tipo: "ingreso" | "salida") => {
      const tipoMarcacionId = Number(localStorage.getItem("tipoMarcacionId"));
      if (!tipoMarcacionId) {
        toast({
          title: "Advertencia",
          description: "Debes seleccionar un tipo de marcación antes de continuar.",
        });
        return null;
      }

      const payload: RegistrarMarcacionRequest = {
        institucionId: 1,
        alumnoId: Number(studentId),
        tipoMarcacionId,
        tipoRegistro: tipo === "ingreso" ? 1 : 2,
      };

      try {
        setLoading(true);
        const response = await marcacionApi.registrar(payload);
        toast({
          title: "Marcación registrada",
          description: response.mensaje,
        });
        return response.alumno;
      } catch (error: any) {
        const msg = error.response?.data?.error || "Ocurrió un error al registrar la marcación.";
        const esMarcacionRepetida = msg.toLowerCase().includes("ya registró");
        toast({
          title: esMarcacionRepetida ? "Marcación existente" : "Error al registrar marcación",
          description: msg,
          variant: "destructive",
        });
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const obtenerMarcacionesDelDia = useCallback(async (institucionId: number) => {
    try {
      setLoading(true);
      const response = await marcacionApi.obtenerMarcacionesDelDia(institucionId);
      setMarcaciones(response);
    } catch (error) {
      toast({
        title: "Error al cargar marcaciones",
        description: "No se pudieron obtener las marcaciones del día.",
      });
    } finally {
      setLoading(false);
    }
  }, []);


  return {
    tipos,
    marcaciones,
    loading,
    obtenerTipos,
    registrarMarcacion,
    obtenerMarcacionesDelDia,
  };
};
