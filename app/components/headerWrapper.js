"use client"; // Make it a client component

import { usePathname } from "next/navigation";
import Header from "./header";

export default function HeaderWrapper() {
  const pathname = usePathname();

  // Hide header for exam routes
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/exam") || pathname.startsWith("/exam-instructions")) return null;

  return <Header />;
}
