import type { Metadata } from 'next'
import { MessageSquare, Users, BookOpen, HelpCircle } from 'lucide-react'
import { ServicePageShell } from '@/components/clyvo/service-page-shell'

export const metadata: Metadata = {
  title: 'AI Chatbots & Assistants | Clyvo AI',
  description:
    'Custom-trained conversational AI agents for customer support, sales qualification, onboarding, and internal knowledge bases — integrated into your existing platforms.',
}

export default function AIChatbotsPage() {
  return (
    <ServicePageShell
      badge="Service"
      title="AI Chatbots & Assistants"
      tagline="Conversations that convert, support, and qualify — 24/7."
      description="Custom-trained conversational agents for customer support, sales qualification, onboarding, and internal knowledge bases. Integrated directly into your existing platforms — your website, Slack, WhatsApp, CRM, or any system you already use. No generic off-the-shelf bot. Trained on your data, tuned to your tone, and built to handle your specific workflows."
      useCases={[
        {
          icon: <HelpCircle className="h-5 w-5" />,
          title: 'Customer Support Automation',
          description:
            'Handle 80%+ of inbound support tickets automatically — with human escalation for complex cases.',
        },
        {
          icon: <Users className="h-5 w-5" />,
          title: 'Sales Lead Qualification',
          description:
            'Qualify inbound leads 24/7, score intent, and book meetings directly into your sales team calendar.',
        },
        {
          icon: <BookOpen className="h-5 w-5" />,
          title: 'Employee Onboarding Assistant',
          description:
            'Answer HR, policy, and process questions instantly — reducing onboarding time and HR overhead.',
        },
        {
          icon: <MessageSquare className="h-5 w-5" />,
          title: 'Internal Knowledge Base',
          description:
            'Give your team instant access to SOPs, documentation, and institutional knowledge via natural language.',
        },
      ]}
      steps={[
        {
          number: '01',
          title: 'Train on your data',
          description:
            'We ingest your documentation, FAQs, product data, CRM history, and support logs to build a model that knows your business inside out.',
        },
        {
          number: '02',
          title: 'Integrate into your platforms',
          description:
            'We deploy the agent into your existing tools — website widget, Slack, Teams, WhatsApp, CRM, or custom API endpoint.',
        },
        {
          number: '03',
          title: 'Monitor and improve',
          description:
            'Live dashboards track resolution rates, escalations, and conversation quality. We iterate weekly in the first month.',
        },
      ]}
      outcomes={[
        { metric: '80%', label: 'Reduction in support tickets' },
        { metric: '24/7', label: 'Always-on availability' },
        { metric: '3×', label: 'Faster lead qualification' },
        { metric: '6 wks', label: 'Avg. time to deploy' },
      ]}
    />
  )
}
