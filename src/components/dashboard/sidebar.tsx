"use client";

// /src/components/dashboard/sidebar.tsx

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { LayoutDashboard, BrainCircuit, LogOut, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/admin/copy-refinement", label: "AI Copy Tool", icon: BrainCircuit },
];

/**
 * Componente de la barra lateral para el Dashboard.
 * Proporciona navegación dentro del área de usuario.
 */
export default function DashboardSidebar() {
  const pathname = usePathname();
  const { signOut } = useAuth();

  return (
    <aside className="hidden md:flex flex-col w-64 border-r bg-muted/40 p-4 space-y-6">
      {/* Logo y nombre */}
      <div className="flex items-center gap-2">
        <Logo className="h-8 w-8 text-primary" />
        <span className="text-xl font-bold font-headline">Laibell</span>
      </div>

      {/* Navegación principal del dashboard */}
      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Button
                  asChild
                  variant={isActive ? "secondary" : "ghost"}
                  className="w-full justify-start"
                >
                  <Link href={item.href}>
                    <Icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Link>
                </Button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Acciones inferiores */}
      <div className="space-y-2">
        <Button asChild variant="ghost" className="w-full justify-start">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al inicio
          </Link>
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => signOut()}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Cerrar sesión
        </Button>
      </div>
    </aside>
  );
}
