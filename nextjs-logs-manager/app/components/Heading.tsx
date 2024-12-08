import classNames from "classnames";
import type { BaseCompProps } from "../shared/types";

export default function Heading({ children, className }: BaseCompProps) {
  return (
    <h1 className={classNames("text-4xl font-black", className)}>{children}</h1>
  );
}
