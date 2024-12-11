interface Props {
  text?: string;
  className?: string;
}

export default function Logo({ text, className }: Props) {
  return (
    <h1 className={`font-normal text-accent3 drop-shadow-md ${className}`}>
      [<span className="font-bold text-white">Log</span>]
      {text ? <span className="text-white">{text}</span> : null}
    </h1>
  );
}
