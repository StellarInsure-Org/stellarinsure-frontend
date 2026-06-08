"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Shield, ArrowDown, Users, Landmark, Clock } from "lucide-react"

const treasuryStats = { balance: "1,240,000 XLM", premiums: "892,000 XLM", payouts: "523,000 XLM", providers: 47, reserveRatio: 20 }
const providers = [
  { address: "GA...XYZ", contribution: "350,000 XLM", yield: "12,400 XLM", since: "2026-01-15" },
  { address: "GB...ABC", contribution: "200,000 XLM", yield: "7,100 XLM", since: "2026-02-20" },
  { address: "GC...DEF", contribution: "150,000 XLM", yield: "4,800 XLM", since: "2026-03-10" },
]

export default function TreasuryPage() {
  return (
    <div className="flex flex-col gap-6 p-6 pt-24 md:p-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-semibold tracking-tight">Treasury & Risk Pool</h1>
        <p className="text-muted-foreground">Community-funded insurance liquidity on Stellar</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Pool Balance", value: treasuryStats.balance, icon: Landmark },
          { label: "Premiums Collected", value: treasuryStats.premiums, icon: ArrowDown },
          { label: "Total Payouts", value: treasuryStats.payouts, icon: Shield },
          { label: "Liquidity Providers", value: String(treasuryStats.providers), icon: Users },
        ].map(({ label, value, icon: Icon }) => (
          <Card key={label} className="bg-card border"><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">{label}</CardTitle><Icon className="text-muted-foreground" /></CardHeader><CardContent><p className="text-2xl font-semibold tracking-tight">{value}</p></CardContent></Card>
        ))}
      </div>

      <Tabs defaultValue="providers" className="flex flex-col gap-4">
        <TabsList><TabsTrigger value="providers">Liquidity Providers</TabsTrigger><TabsTrigger value="stats">Pool Statistics</TabsTrigger></TabsList>
        <TabsContent value="providers">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Dialog>
                <DialogTrigger render={<Button><ArrowDown data-icon="inline-start" />Add Liquidity</Button>} />
                <DialogContent><DialogHeader><DialogTitle>Add Liquidity</DialogTitle></DialogHeader><div className="flex flex-col gap-4"><div className="flex flex-col gap-2"><label className="text-sm font-medium">Amount (XLM)</label><Input placeholder="0.00" /></div><Button>Deposit</Button></div></DialogContent>
              </Dialog>
              <Badge variant="outline">Reserve ratio: {treasuryStats.reserveRatio}%</Badge>
            </div>
            <Card className="bg-card border"><CardContent className="p-0"><Table><TableHeader><TableRow><TableHead>Provider</TableHead><TableHead>Contribution</TableHead><TableHead>Accrued Yield</TableHead><TableHead>Since</TableHead></TableRow></TableHeader>
              <TableBody>{providers.map(p => (<TableRow key={p.address}><TableCell className="font-mono text-sm">{p.address}</TableCell><TableCell>{p.contribution}</TableCell><TableCell className="text-primary font-medium">{p.yield}</TableCell><TableCell>{p.since}</TableCell></TableRow>))}</TableBody></Table></CardContent></Card>
          </div>
        </TabsContent>
        <TabsContent value="stats">
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="bg-card border"><CardHeader><CardTitle>Reserve Ratio</CardTitle></CardHeader><CardContent><div className="flex flex-col gap-2"><div className="flex items-center justify-between text-sm"><span>Protected</span><span>{treasuryStats.reserveRatio}%</span></div><Progress value={treasuryStats.reserveRatio} /><p className="text-muted-foreground text-xs">20% of pool capital is always retained to cover pending claims</p></div></CardContent></Card>
            <Card className="bg-card border"><CardHeader><CardTitle>Yield Distribution</CardTitle></CardHeader><CardContent><p className="text-muted-foreground text-sm">Yield is distributed pro-rata to all providers whenever a premium is paid. You can claim your accrued yield at any time.</p></CardContent></Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
