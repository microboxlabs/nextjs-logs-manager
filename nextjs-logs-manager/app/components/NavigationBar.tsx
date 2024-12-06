import Link from "next/link";

export default function NavigationBar() {
  return (
    <nav>
      <Link href="/">Registros</Link>
      <ul>
        <li>
          <Link href="/entries">Subidas</Link>
        </li>
      </ul>
      <Link href="/sign-in">Iniciar sesión</Link>
    </nav>
  );
}
