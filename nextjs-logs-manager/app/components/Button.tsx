import classNames from "classnames";
import type { BaseCompProps } from "../shared/types";

type Props = BaseCompProps & {
  type?: "submit" | "button";
  onClick?: (e: React.ChangeEvent<HTMLButtonElement>) => void;
};

export default function Button({ children, type, className }: Props) {
  return (
    <button type={type} className={classNames("btn", className)}>
      {children}
    </button>
  );
}
