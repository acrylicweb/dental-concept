import { Link } from "react-router";
import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary" | "text";
  icon?: ReactNode;
  external?: boolean;
};

const Button = ({
  children,
  href,
  variant = "primary",
  icon,
  external = false,
}: ButtonProps) => {
  const className = `button button--${variant}`;

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
        className={className}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }

  return (
    <Link to={href} className={className}>
      {content}
    </Link>
  );
};

export default Button;
