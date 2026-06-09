import type { Metadata } from 'next'
import { Database, Link2, RefreshCw, Layers } from 'lucide-react'
import { ServicePageShell } from '@/components/clyvo/service-page-shell'

export const metadata: Metadata = {
  title: 'System Integrations | Clyvo AI',
  description:
    'Connect your AI layer into your existing tech stack — CRMs, ERPs, databases, and third-party APIs — so your AI works within the systems your team already uses.',
}

export default function SystemIntegrationsPage() {
  return (
    <ServicePageShell
      badge="Service"
      title="System Integrations"
      tagline="Your AI connected to everything you already use."
      description="AI that sits in isolation is AI that doesn't get used. We build the integration layer that connects your AI systems into your existing tech stack: CRMs (Salesforce, HubSpot), ERPs (SAP, NetSuite), databases, APIs, and third-party tools. Bi-directional data flows, real-time sync, and robust error handling so your AI always has the context it needs to act."
      useCases={[
        {
          icon: <Link2 className="h-5 w-5" />,
          title: 'CRM Integration',
          description:
            'Connect AI agents to Salesforce, HubSpot, or Pipedrive — auto-logging activity, updating records, and triggering workflows based on AI decisions.',
        },
        {
          icon: <Database className="h-5 w-5" />,
          title: 'ERP Connection',
          description:
            'Feed AI models live operational data from SAP, NetSuite, or Odoo — enabling real-time decisions grounded in your actual business state.',
        },
        {
          icon: <RefreshCw className="h-5 w-5" />,
          title: 'Database Sync',
          description:
            'Real-time bi-directional sync between your AI layer and source-of-truth databases — no stale data, no manual exports.',
        },
        {
          icon: <Layers className="h-5 w-5" />,
          title: 'API Orchestration',
          description:
            'Build intelligent orchestration layers that coordinate multiple APIs, handle errors gracefully, and maintain data consistency across systems.',
        },
      ]}
      steps={[
        {
          number: '01',
          title: 'Tech stack audit',
          description:
            'We map your current systems, data flows, and integration points — identifying what connects where and what needs to be built.',
        },
        {
          number: '02',
          title: 'Build integration layer',
          description:
            'We build secure, scalable connectors using your platform APIs, webhooks, or direct database connections — with full error handling and retry logic.',
        },
        {
          number: '03',
          title: 'Test, monitor & maintain',
          description:
            'End-to-end testing before go-live, then ongoing monitoring of data flow health, sync latency, and failure alerts.',
        },
      ]}
      outcomes={[
        { metric: '100%', label: 'Data sync accuracy' },
        { metric: '<1s', label: 'Real-time sync latency' },
        { metric: '0', label: 'Manual data transfer steps' },
        { metric: '6 wks', label: 'Avg. full integration timeline' },
      ]}
    />
  )
}
