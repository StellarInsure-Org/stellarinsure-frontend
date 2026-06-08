"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Shield, Users, Key, Settings2 } from "lucide-react"

const admins = [
  { address: "GA...XYZ", role: "Owner", since: "2026-01-15", votes: 47 },
  { address: "GB...ABC", role: "Admin", since: "2026-01-20", votes: 32 },
  { address: "GC...DEF", role: "Admin", since: "2026-03-01", votes: 18 },
]

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6 p-6 pt-24 md:p-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Multi-sig governance and protocol configuration</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[{ label: "Multi-Sig Admins", value: "3", icon: Users }, { label: "Approval Threshold", value: "2 of 3", icon: Key }, { label: "Active Policies", value: "847", icon: Shield }].map(({ label, value, icon: Icon }) => (
          <Card key={label} className="bg-card border"><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">{label}</CardTitle><Icon className="text-muted-foreground" /></CardHeader><CardContent><p className="text-2xl font-semibold tracking-tight">{value}</p></CardContent></Card>
        ))}
      </div>

      <Card className="bg-card border">
        <CardHeader><CardTitle>Multi-Sig Admins</CardTitle></CardHeader>
        <CardContent className="p-0"><Table><TableHeader><TableRow><TableHead>Address</TableHead><TableHead>Role</TableHead><TableHead>Since</TableHead><TableHead>Votes Cast</TableHead></TableRow></TableHeader>
          <TableBody>{admins.map(a => (<TableRow key={a.address}><TableCell className="font-mono text-sm">{a.address}</TableCell><TableCell><Badge variant={a.role === "Owner" ? "default" : "secondary"}>{a.role}</Badge></TableCell><TableCell>{a.since}</TableCell><TableCell>{a.votes}</TableCell></TableRow>))}</TableBody></Table></CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="bg-card border">
          <CardHeader><CardTitle className="flex items-center gap-2"><Key />Threshold Configuration</CardTitle></CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2"><label className="text-sm font-medium">Current: 2 of 3 approvals required</label>
              <div className="flex items-center gap-3"><Input placeholder="2" className="w-20" /><span className="text-muted-foreground text-sm">of</span><Input placeholder="3" className="w-20" /></div>
            </div>
            <Button>Update Threshold</Button>
          </CardContent>
        </Card>
        <Card className="bg-card border">
          <CardHeader><CardTitle className="flex items-center gap-2"><Settings2 />Protocol Pause</CardTitle></CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-muted-foreground text-sm">Emergency circuit breaker. Pausing blocks policy creation, premium payments, and claim submissions. Existing policies and claims in-flight remain operational.</p>
            <Button variant="destructive">Pause Protocol</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
