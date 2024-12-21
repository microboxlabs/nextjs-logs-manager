export default function PasswordIcon({
  width = 20,
  height = 20,
}: {
  width?: number;
  height?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="currentColor"
    >
      <g id="Layer_2" data-name="Layer 2">
        <path d="m17 23h-10a4.00427 4.00427 0 0 1 -4-4v-6a4.00427 4.00427 0 0 1 4-4h10a4.00427 4.00427 0 0 1 4 4v6a4.00427 4.00427 0 0 1 -4 4zm-10-12a2.00229 2.00229 0 0 0 -2 2v6a2.00229 2.00229 0 0 0 2 2h10a2.00229 2.00229 0 0 0 2-2v-6a2.00229 2.00229 0 0 0 -2-2z" />
        <path d="m16.5 11h-9a.99974.99974 0 0 1 -1-1v-3.5a5.5 5.5 0 0 1 11 0v3.5a.99974.99974 0 0 1 -1 1zm-8-2h7v-2.5a3.5 3.5 0 0 0 -7 0z" />
        <circle cx="12" cy="15" r="1.5" />
      </g>
    </svg>
  );
}
