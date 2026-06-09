import type { Metadata } from 'next'
import { Phone, Calendar, PhoneOutgoing, UserCheck } from 'lucide-react'
import { ServicePageShell } from '@/components/clyvo/service-page-shell'

export const metadata: Metadata = {
  title: 'AI Voice Agents | Clyvo AI',
  description:
    'Intelligent AI voice systems for inbound and outbound calls — customer service, appointment booking, qualification, and follow-up on modern speech pipelines.',
}

export default function VoiceAgentsPage() {
  return (
    <ServicePageShell
      badge="Service"
      title="AI Voice Agents"
      tagline="Intelligent voice systems that handle calls like your best rep."
      description="Intelligent voice systems for inbound and outbound calls — customer service, appointment booking, qualification, follow-up. Built on modern speech-to-text and text-to-speech pipelines with sub-200ms latency. Natural, context-aware conversations that adapt mid-call, handle interruptions, and know when to hand off to a human. Your phone lines covered 24/7 without adding headcount."
      useCases={[
        {
          icon: <Phone className="h-5 w-5" />,
          title: 'Inbound Customer Service',
          description:
            'Handle high-volume inbound calls — FAQs, order status, account queries — with natural, intelligent responses and smart escalation.',
        },
        {
          icon: <Calendar className="h-5 w-5" />,
          title: 'Appointment Booking',
          description:
            'Let callers book, reschedule, and cancel appointments 24/7 — synced directly to your calendar or scheduling system.',
        },
        {
          icon: <PhoneOutgoing className="h-5 w-5" />,
          title: 'Outbound Follow-up',
          description:
            'Automate post-purchase follow-ups, payment reminders, and satisfaction surveys at scale — with a human-like conversational tone.',
        },
        {
          icon: <UserCheck className="h-5 w-5" />,
          title: 'Lead Qualification Calls',
          description:
            'Call inbound leads within 60 seconds, qualify them with your exact criteria, and book meetings for your team to close.',
        },
      ]}
      steps={[
        {
          number: '01',
          title: 'Script & flow design',
          description:
            'We design conversation flows, objection handling logic, and escalation triggers based on your actual call recordings and use cases.',
        },
        {
          number: '02',
          title: 'Voice pipeline build',
          description:
            'We build the STT/TTS pipeline, connect to your telephony provider (Twilio, Vonage, etc.), and integrate with your CRM and calendar.',
        },
        {
          number: '03',
          title: 'Test, deploy & optimise',
          description:
            'Stress-tested against real call scenarios before go-live. Post-launch, we analyse call recordings and refine conversation flows weekly.',
        },
      ]}
      outcomes={[
        { metric: '24/7', label: 'Phone coverage without extra headcount' },
        { metric: '<60s', label: 'Speed to first contact on inbound leads' },
        { metric: '70%', label: 'Calls resolved without human transfer' },
        { metric: '5 wks', label: 'Avg. time to live voice agent' },
      ]}
    />
  )
}
