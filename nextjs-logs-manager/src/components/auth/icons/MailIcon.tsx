export default function MailIcon({
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
        <path d="m19 20.5h-14a4.00427 4.00427 0 0 1 -4-4v-9a4.00427 4.00427 0 0 1 4-4h14a4.00427 4.00427 0 0 1 4 4v9a4.00427 4.00427 0 0 1 -4 4zm-14-15a2.00229 2.00229 0 0 0 -2 2v9a2.00229 2.00229 0 0 0 2 2h14a2.00229 2.00229 0 0 0 2-2v-9a2.00229 2.00229 0 0 0 -2-2z" />
        <path d="m12 13.43359a4.99283 4.99283 0 0 1 -3.07031-1.0542l-6.544-5.08984a1.00035 1.00035 0 0 1 1.22852-1.5791l6.54394 5.08984a2.99531 2.99531 0 0 0 3.6836 0l6.54394-5.08984a1.00035 1.00035 0 0 1 1.22852 1.5791l-6.544 5.08984a4.99587 4.99587 0 0 1 -3.07021 1.0542z" />
      </g>
    </svg>
  );
}