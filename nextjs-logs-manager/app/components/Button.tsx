import classNames from "classnames";
import type { BaseCompProps } from "../shared/types";

type Props = BaseCompProps & {
  type?: "submit" | "button";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function Button({ children, type, className, onClick }: Props) {
  return (
    <button
      type={type}
      className={classNames("btn", className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
