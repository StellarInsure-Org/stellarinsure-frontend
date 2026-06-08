"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Shield, Plus, Clock, CheckCircle, XCircle, RefreshCw } from "lucide-react"

const policies = [
  { id: "POL-001", type: "Weather", coverage: "50,000 XLM", premium: "875 XLM", status: "Active", trigger: "rainfall < 50mm", beneficiary: "GA...XYZ", expires: "2026-09-15" },
  { id: "POL-002", type: "Flight", coverage: "2,500 XLM", premium: "25 XLM", status: "Active", trigger: "delay > 120min", beneficiary: "GB...ABC", expires: "2026-06-30" },
  { id: "POL-003", type: "Smart Contract", coverage: "100,000 XLM", premium: "1,500 XLM", status: "Active", trigger: "exploit detected", beneficiary: "GC...DEF", expires: "2027-01-01" },
  { id: "POL-004", type: "Asset", coverage: "200,000 XLM", premium: "2,500 XLM", status: "Expired", trigger: "USDC < $0.95", beneficiary: "GD...GHI", expires: "2026-04-01" },
]

export default function PoliciesPage() {
  return (
    <div className="flex flex-col gap-6 p-6 pt-24 md:p-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-semibold tracking-tight">Policies</h1>
          <p className="text-muted-foreground">Create and manage insurance policies on Stellar</p>
        </div>
        <Dialog>
          <DialogTrigger render={<Button><Plus data-icon="inline-start" />Create Policy</Button>} />
          <DialogContent className="sm:max-w-lg">
            <DialogHeader><DialogTitle>Create New Policy</DialogTitle></DialogHeader>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2"><label className="text-sm font-medium">Policy Type</label>
                <Select defaultValue="Weather"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Weather">Weather</SelectItem><SelectItem value="Flight">Flight</SelectItem><SelectItem value="SmartContract">Smart Contract</SelectItem><SelectItem value="Health">Health</SelectItem><SelectItem value="Asset">Asset</SelectItem></SelectContent></Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2"><label className="text-sm font-medium">Coverage (XLM)</label><Input placeholder="50000" /></div>
                <div className="flex flex-col gap-2"><label className="text-sm font-medium">Duration (days)</label><Input placeholder="90" /></div>
              </div>
              <div className="flex flex-col gap-2"><label className="text-sm font-medium">Trigger Condition</label><Input placeholder="e.g. rainfall < 50mm" maxLength={256} /></div>
              <div className="flex flex-col gap-2"><label className="text-sm font-medium">Beneficiary Address</label><Input placeholder="G..." /></div>
              <Button>Create Policy</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[{ label: "Active", value: "3", icon: Shield }, { label: "Expiring Soon", value: "1", icon: Clock }, { label: "Total Coverage", value: "352,500 XLM", icon: Shield }, { label: "Premiums Paid", value: "3,900 XLM", icon: CheckCircle }].map(({ label, value, icon: Icon }) => (
          <Card key={label} className="bg-card border"><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">{label}</CardTitle><Icon className="text-muted-foreground" /></CardHeader><CardContent><p className="text-2xl font-semibold tracking-tight">{value}</p></CardContent></Card>
        ))}
      </div>

      <Tabs defaultValue="active" className="flex flex-col gap-4">
        <TabsList><TabsTrigger value="active">Active</TabsTrigger><TabsTrigger value="all">All Policies</TabsTrigger></TabsList>
        <TabsContent value="active" className="flex flex-col gap-4">
          {policies.filter(p => p.status === "Active").map(p => (
            <Card key={p.id} className="bg-card border"><CardContent className="flex flex-col gap-4 p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2"><span className="font-mono text-sm">{p.id}</span><Badge>{p.type}</Badge><Badge variant="outline">Active</Badge></div>
                  <p className="text-muted-foreground text-sm">Coverage: {p.coverage} · Premium: {p.premium} · Trigger: {p.trigger}</p>
                </div>
                <Button size="sm" variant="outline"><RefreshCw data-icon="inline-start" />Modify</Button>
              </div>
              <div className="flex items-center gap-4 text-muted-foreground text-xs"><span>Beneficiary: {p.beneficiary}</span><span>·</span><span>Expires: {p.expires}</span></div>
            </CardContent></Card>
          ))}
        </TabsContent>
        <TabsContent value="all">
          <Card className="bg-card border"><CardContent className="p-0"><Table><TableHeader><TableRow><TableHead>Policy</TableHead><TableHead>Type</TableHead><TableHead>Coverage</TableHead><TableHead>Status</TableHead><TableHead>Expires</TableHead></TableRow></TableHeader>
            <TableBody>{policies.map(p => (<TableRow key={p.id}><TableCell className="font-mono text-sm">{p.id}</TableCell><TableCell><Badge variant="outline">{p.type}</Badge></TableCell><TableCell>{p.coverage}</TableCell><TableCell><Badge variant={p.status === "Active" ? "default" : "secondary"}>{p.status}</Badge></TableCell><TableCell>{p.expires}</TableCell></TableRow>))}</TableBody></Table></CardContent></Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
