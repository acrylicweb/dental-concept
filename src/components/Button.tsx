import { Link } from "react-router";
import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary" | "text";
  icon?: ReactNode;
  external?: boolean;
  className?: string;
};

const Button = ({
  children,
  href,
  variant = "primary",
  icon,
  className = "",
  external = false,
}: ButtonProps) => {
  const buttonClassName = `button button--${variant} ${className}`.trim();

  const content = (
    <>
      <span>{children}</span>

      {icon && <span className="button__icon">{icon}</span>}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        className={buttonClassName}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }

  return (
    <Link to={href} className={buttonClassName}>
      {content}
    </Link>
  );
};

export default Button;
