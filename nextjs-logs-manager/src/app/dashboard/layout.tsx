import { ReactNode } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-items-start gap-[clamp(2rem,2vh,5rem)] bg-slate-100 px-[clamp(10px,2.5vw,10rem)] py-[clamp(8px,4vh,8rem)] dark:bg-slate-900">
      {children}
    </div>
  );
}
