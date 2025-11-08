import { Link, LinkProps, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavLinkProps extends LinkProps {
  activeClassName?: string;
  end?: boolean;
}

export function NavLink({
  to,
  className,
  activeClassName,
  end = false,
  children,
  ...props
}: NavLinkProps) {
  const location = useLocation();
  const isActive = end
    ? location.pathname === to
    : location.pathname.startsWith(to as string);

  const combinedClassName = cn(
    typeof className === "string" ? className : "",
    isActive && activeClassName
  );

  return (
    <Link to={to} className={combinedClassName} {...props}>
      {children}
    </Link>
  );
}
