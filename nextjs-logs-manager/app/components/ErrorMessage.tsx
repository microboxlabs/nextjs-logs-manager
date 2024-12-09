export default function ErrorMessage({
  children,
}: {
  children: React.ReactNode;
}) {
  return <p className="mt-2 text-sm text-red-600">{children}</p>;
}
