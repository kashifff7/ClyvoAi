import type { Metadata } from 'next'
import { GitBranch, FileText, CheckSquare, BarChart2 } from 'lucide-react'
import { ServicePageShell } from '@/components/clyvo/service-page-shell'

export const metadata: Metadata = {
  title: 'Workflow & Process Automation | Clyvo AI',
  description:
    'End-to-end automation of repetitive business processes using AI decision logic — eliminate manual work and free your team to focus on what matters.',
}

export default function WorkflowAutomationPage() {
  return (
    <ServicePageShell
      badge="Service"
      title="Workflow & Process Automation"
      tagline="Eliminate the manual work eating your team's time."
      description="End-to-end automation of repetitive business processes — lead routing, document handling, reporting pipelines, approval workflows, and data entry elimination using AI decision logic. We map your current manual processes, identify automation opportunities, and build robust pipelines that run without human intervention. The result: your team focuses on high-value work, not admin."
      useCases={[
        {
          icon: <GitBranch className="h-5 w-5" />,
          title: 'Lead Routing & Assignment',
          description:
            'Automatically score, segment, and assign inbound leads to the right rep based on firmographic and behavioural signals.',
        },
        {
          icon: <FileText className="h-5 w-5" />,
          title: 'Document Processing',
          description:
            'Extract, classify, and route data from invoices, contracts, and forms — with zero manual data entry.',
        },
        {
          icon: <CheckSquare className="h-5 w-5" />,
          title: 'Approval Workflows',
          description:
            'Automate multi-step approvals with intelligent routing, reminders, audit trails, and escalation logic.',
        },
        {
          icon: <BarChart2 className="h-5 w-5" />,
          title: 'Reporting Automation',
          description:
            'Auto-generate and distribute daily, weekly, or monthly reports from live data — no spreadsheet wrangling.',
        },
      ]}
      steps={[
        {
          number: '01',
          title: 'Process mapping',
          description:
            'We audit your current workflows, identify bottlenecks, and map exactly which steps are ripe for automation.',
        },
        {
          number: '02',
          title: 'Build & integrate',
          description:
            'We build the automation pipelines, connect to your existing tools (CRM, ERP, databases), and test against real data.',
        },
        {
          number: '03',
          title: 'Monitor & optimise',
          description:
            'Live dashboards track throughput, error rates, and time saved. We refine logic based on edge cases that emerge in production.',
        },
      ]}
      outcomes={[
        { metric: '90%', label: 'Reduction in manual data entry' },
        { metric: '5×', label: 'Faster processing time' },
        { metric: '40h', label: 'Avg. hours saved per week' },
        { metric: '4 wks', label: 'Avg. time to first automation' },
      ]}
    />
  )
}
