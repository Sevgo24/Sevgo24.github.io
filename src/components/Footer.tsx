export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background mt-auto">
      <div className="container flex flex-col items-center justify-center gap-2 py-6 text-center text-sm text-muted-foreground">
        <p>
          © {currentYear} Sistema de Control Escolar. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
}
