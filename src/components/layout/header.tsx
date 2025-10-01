"use client";

// /src/components/layout/header.tsx

import * as React from "react";
import Link from "next/link";
import {
  AlignJustify,
  Compass,
  Users,
  Rocket,
  Target,
  Clapperboard,
  TrendingUp,
  ChevronRight,
  LogOut,
  LayoutDashboard,
  Settings,
  BrainCircuit,
} from "lucide-react";
import { Logo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import services from "@/content/services.json";
import plans from "@/content/plans.json";

// Mapeo de iconos para los servicios. Permite asignar un componente de icono a cada servicio dinámicamente.
const iconMap: { [key: string]: React.ElementType } = {
  Compass,
  Users,
  Rocket,
  Target,
Clapperboard,
  TrendingUp,
};

/**
 * Componente Header principal.
 * Incluye el logo, la navegación de escritorio (con menús desplegables) y móvil (con un sheet).
 * Muestra dinámicamente el estado de autenticación del usuario.
 */
export default function Header() {
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block font-headline">
              Laibell
            </span>
          </Link>
          {/* Menú de navegación para escritorio */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Servicios</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {services.map((service) => {
                      const IconComponent = iconMap[service.icon];
                      return (
                        <ListItem
                          key={service.title}
                          title={service.title}
                          href={`/#services`}
                        >
                          {IconComponent && <IconComponent className="h-4 w-4 mr-2 text-primary" />}
                          {service.description}
                        </ListItem>
                      );
                    })}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Planes</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[300px] gap-3 p-4">
                    {plans.map((plan) => (
                      <ListItem
                        key={plan.title}
                        title={plan.title}
                        href="/#plans"
                      >
                        {plan.audience}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href="/#faq">
                    FAQ
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
        {/* Menú de navegación para móvil */}
        <div className="flex flex-1 items-center justify-between space-x-2 md:hidden">
            <MobileNav />
            <Link href="/" className="flex items-center space-x-2">
              <Logo className="h-6 w-6 text-primary" />
              <span className="font-bold font-headline">Laibell</span>
            </Link>
        </div>

        {/* Botones de acción y menú de usuario */}
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            {user ? (
              <UserMenu />
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/login">Ingresar</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Cotizar Ahora</Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

/**
 * Menú desplegable para el usuario autenticado.
 */
function UserMenu() {
  const { user, signOut } = useAuth();
  
  // Si no hay usuario, no renderiza nada.
  if (!user) return null;

  // Extrae las iniciales del usuario para el AvatarFallback.
  const userInitials = user.displayName
    ? user.displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
    : user.email?.[0].toUpperCase() ?? "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.photoURL ?? ""} alt={user.displayName ?? "Usuario"} />
            <AvatarFallback>{userInitials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.displayName}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/dashboard">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/admin/copy-refinement">
              <BrainCircuit className="mr-2 h-4 w-4" />
              <span>AI Copy Tool</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <Settings className="mr-2 h-4 w-4" />
            <span>Ajustes</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Cerrar sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/**
 * Navegación para dispositivos móviles, mostrada en un Sheet (panel lateral).
 */
function MobileNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <AlignJustify className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <Link
          href="/"
          className="flex items-center space-x-2 mb-8"
          onClick={() => setOpen(false)}
        >
          <Logo className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline">Laibell</span>
        </Link>
        <div className="flex flex-col space-y-3">
          <h4 className="font-medium px-4">Servicios</h4>
          {services.map((service) => (
            <MobileLink key={service.id} href="/#services" onOpenChange={setOpen}>
              {service.title}
            </MobileLink>
          ))}
          <h4 className="font-medium px-4 pt-4">Planes</h4>
          {plans.map((plan) => (
            <MobileLink key={plan.id} href="/#plans" onOpenChange={setOpen}>
              {plan.title}
            </MobileLink>
          ))}
          <MobileLink href="/#faq" onOpenChange={setOpen}>FAQ</MobileLink>
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps extends React.PropsWithChildren {
  href: string;
  disabled?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

function MobileLink({ children, href, disabled, onOpenChange, className }: MobileLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "text-muted-foreground transition-colors hover:text-foreground",
        "px-4 py-2",
        disabled && "pointer-events-none opacity-60",
        className
      )}
      onClick={() => onOpenChange?.(false)}
    >
      {children}
    </Link>
  )
}

/**
 * Componente de item para las listas de NavigationMenu.
 * Simplifica la creación de enlaces con título y descripción.
 */
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent/50 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground flex items-center">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
