import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, Zap, CloudSun, Plane, Users, ArrowRight, Plus, FileText } from "lucide-react"
import Link from "next/link"

const metrics = [
  { label: "Active Policies", value: "847", icon: Shield },
  { label: "Total Claims", value: "2,340", icon: FileText },
  { label: "Risk Pool TVL", value: "1,240,000 XLM", icon: Users },
  { label: "Payout Rate", value: "98.7%", icon: Zap },
]

const recentActivity = [
  { action: "Policy created", detail: "Weather insurance · 5,000 XLM coverage", time: "2 min ago", status: "active" },
  { action: "Claim approved", detail: "Flight delay · 2,500 XLM payout", time: "1 hr ago", status: "success" },
  { action: "Claim submitted", detail: "Smart contract exploit · 10,000 XLM", time: "3 hrs ago", status: "pending" },
  { action: "Premium paid", detail: "Health insurance · 1,200 XLM", time: "5 hrs ago", status: "success" },
]

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8 p-6 pt-24 md:p-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Parametric insurance management on Stellar</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map(({ label, value, icon: Icon }) => (
          <Card key={label} className="bg-card border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{label}</CardTitle>
              <Icon className="text-muted-foreground" />
            </CardHeader>
            <CardContent><p className="text-2xl font-semibold tracking-tight">{value}</p></CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="bg-card border">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Activity</CardTitle>
            <Button variant="ghost" size="sm" render={<Link href="/claims" />} nativeButton={false}>
              View All <ArrowRight data-icon="inline-end" />
            </Button>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {recentActivity.map((item) => (
              <div key={item.detail} className="flex items-center justify-between gap-4">
                <div className="flex flex-col gap-0.5"><p className="text-sm font-medium">{item.action}</p><p className="text-muted-foreground text-sm">{item.detail}</p></div>
                <div className="flex items-center gap-3">
                  <Badge variant={item.status === "success" ? "default" : item.status === "pending" ? "secondary" : "outline"}>{item.status}</Badge>
                  <span className="text-muted-foreground text-xs">{item.time}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-card border">
          <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
          <CardContent className="flex flex-col gap-3">
            {[
              { label: "Create New Policy", href: "/policies", icon: Plus },
              { label: "Submit a Claim", href: "/claims", icon: FileText },
              { label: "View Treasury", href: "/treasury", icon: Shield },
              { label: "Manage Settings", href: "/settings", icon: CloudSun },
            ].map(({ label, href, icon: Icon }) => (
              <Button key={label} variant="outline" className="justify-start" render={<Link href={href} />} nativeButton={false}>
                <Icon data-icon="inline-start" />{label}<ArrowRight data-icon="inline-end" className="ml-auto" />
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
