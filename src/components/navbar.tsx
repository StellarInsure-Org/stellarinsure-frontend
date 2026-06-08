"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Shield } from "lucide-react"

const navLinks = [
  { label: "Dashboard", href: "/" },
  { label: "Policies", href: "/policies" },
  { label: "Claims", href: "/claims" },
  { label: "Treasury", href: "/treasury" },
  { label: "Settings", href: "/settings" },
]

export default function Navbar() {
  const pathname = usePathname()
  return (
    <nav className="fixed inset-x-0 top-0 z-20 w-full border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-lg bg-primary">
            <Shield className="text-primary-foreground" size={14} />
          </div>
          <span className="text-lg font-semibold tracking-tight">StellarInsure</span>
        </Link>
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${pathname === l.href ? "text-foreground bg-muted" : "text-muted-foreground hover:text-foreground"}`}>{l.label}</Link>
          ))}
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <Button size="sm">Connect Wallet</Button>
        </div>
        <Sheet>
          <SheetTrigger className="md:hidden"><Button variant="ghost" size="icon"><Menu /></Button></SheetTrigger>
          <SheetContent side="right" className="w-72 pt-12">
            <SheetHeader><SheetTitle>StellarInsure</SheetTitle></SheetHeader>
            <div className="mt-6 flex flex-col gap-2">
              {navLinks.map((l) => (<Link key={l.href} href={l.href} className={`rounded-lg px-3 py-2 text-sm font-medium ${pathname === l.href ? "text-foreground bg-muted" : "text-muted-foreground"}`}>{l.label}</Link>))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
