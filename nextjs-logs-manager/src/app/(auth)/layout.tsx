import { ReactNode } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-100">
      <div className="flex flex-col items-center justify-center gap-[clamp(4rem,2vh,12rem)] rounded-2xl bg-white px-[clamp(10px,5vh,10rem)] py-[clamp(8px,4vh,8rem)] dark:bg-slate-900">
        {children}
      </div>
    </div>
  );
}
