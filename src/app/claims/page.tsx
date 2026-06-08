"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { FileText, Plus, CheckCircle, XCircle, Clock, ThumbsUp, ThumbsDown } from "lucide-react"

const claims = [
  { id: "CLM-001", policyId: "POL-001", type: "Weather", amount: "50,000 XLM", status: "Pending", proof: "NOAA rainfall data below threshold", submitted: "2026-06-05", votes: { for: 2, against: 1, threshold: 3 } },
  { id: "CLM-002", policyId: "POL-002", type: "Flight", amount: "2,500 XLM", status: "Approved", proof: "Flight AA123 delayed 180min", submitted: "2026-06-01", votes: { for: 3, against: 0, threshold: 3 } },
  { id: "CLM-003", policyId: "POL-004", type: "Asset", amount: "200,000 XLM", status: "Rejected", proof: "USDC price $0.97, above threshold", submitted: "2026-05-28", votes: { for: 1, against: 3, threshold: 3 } },
]

export default function ClaimsPage() {
  return (
    <div className="flex flex-col gap-6 p-6 pt-24 md:p-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-semibold tracking-tight">Claims</h1>
          <p className="text-muted-foreground">Submit and vote on insurance claims</p>
        </div>
        <Dialog>
          <DialogTrigger render={<Button><Plus data-icon="inline-start" />Submit Claim</Button>} />
          <DialogContent>
            <DialogHeader><DialogTitle>Submit New Claim</DialogTitle></DialogHeader>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2"><label className="text-sm font-medium">Policy ID</label><Input placeholder="POL-..." /></div>
              <div className="flex flex-col gap-2"><label className="text-sm font-medium">Claim Amount (XLM)</label><Input placeholder="0.00" /></div>
              <div className="flex flex-col gap-2"><label className="text-sm font-medium">Proof / Evidence</label><Input placeholder="Describe the trigger event..." maxLength={256} /></div>
              <Button>Submit Claim</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        {[{ label: "Pending", value: "1", icon: Clock }, { label: "Approved", value: "1", icon: CheckCircle }, { label: "Rejected", value: "1", icon: XCircle }, { label: "Total Payouts", value: "52,500 XLM", icon: FileText }].map(({ label, value, icon: Icon }) => (
          <Card key={label} className="bg-card border"><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">{label}</CardTitle><Icon className="text-muted-foreground" /></CardHeader><CardContent><p className="text-2xl font-semibold tracking-tight">{value}</p></CardContent></Card>
        ))}
      </div>

      <Tabs defaultValue="pending" className="flex flex-col gap-4">
        <TabsList><TabsTrigger value="pending">Pending</TabsTrigger><TabsTrigger value="all">All Claims</TabsTrigger></TabsList>
        <TabsContent value="pending" className="flex flex-col gap-4">
          {claims.filter(c => c.status === "Pending").map(c => (
            <Card key={c.id} className="bg-card border"><CardContent className="flex flex-col gap-4 p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2"><span className="font-mono text-sm">{c.id}</span><Badge>{c.type}</Badge><Badge variant="secondary">Pending</Badge></div>
                  <p className="text-muted-foreground text-sm">Policy: {c.policyId} · Amount: {c.amount} · {c.proof}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm"><ThumbsUp data-icon="inline-start" />Approve</Button>
                  <Button size="sm" variant="outline"><ThumbsDown data-icon="inline-start" />Reject</Button>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-sm"><span className="text-muted-foreground">Votes</span><span className="font-medium">{c.votes.for} / {c.votes.threshold}</span></div>
                <Progress value={(c.votes.for / c.votes.threshold) * 100} />
              </div>
            </CardContent></Card>
          ))}
        </TabsContent>
        <TabsContent value="all">
          <Card className="bg-card border"><CardContent className="p-0"><Table><TableHeader><TableRow><TableHead>Claim</TableHead><TableHead>Policy</TableHead><TableHead>Amount</TableHead><TableHead>Status</TableHead><TableHead>Submitted</TableHead></TableRow></TableHeader>
            <TableBody>{claims.map(c => (<TableRow key={c.id}><TableCell className="font-mono text-sm">{c.id}</TableCell><TableCell>{c.policyId}</TableCell><TableCell>{c.amount}</TableCell><TableCell><Badge variant={c.status === "Approved" ? "default" : c.status === "Pending" ? "secondary" : "destructive"}>{c.status}</Badge></TableCell><TableCell>{c.submitted}</TableCell></TableRow>))}</TableBody></Table></CardContent></Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
