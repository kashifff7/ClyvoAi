import type { Metadata } from 'next'
import { TrendingUp, Tag, AlertTriangle, Activity } from 'lucide-react'
import { ServicePageShell } from '@/components/clyvo/service-page-shell'

export const metadata: Metadata = {
  title: 'Custom AI Model Development | Clyvo AI',
  description:
    'Bespoke ML and LLM models trained on your data — predictive analytics, classification, anomaly detection, and forecasting tailored to your exact outcomes.',
}

export default function CustomAIModelsPage() {
  return (
    <ServicePageShell
      badge="Service"
      title="Custom AI Model Development"
      tagline="AI trained on your data. Built for your outcomes."
      description="Bespoke ML and LLM models trained on client data. Predictive analytics, classification, content generation, anomaly detection, forecasting. We don't hand you a pre-trained model and call it done — we build from your specific dataset, validate against your real-world KPIs, and deploy infrastructure you own. Your competitive edge, not a shared SaaS product."
      useCases={[
        {
          icon: <TrendingUp className="h-5 w-5" />,
          title: 'Predictive Analytics',
          description:
            'Forecast churn, revenue, demand, or risk with models trained on your historical data and validated against your benchmarks.',
        },
        {
          icon: <Tag className="h-5 w-5" />,
          title: 'Content Classification',
          description:
            'Auto-classify support tickets, documents, emails, or products into your taxonomy — at scale and with high accuracy.',
        },
        {
          icon: <AlertTriangle className="h-5 w-5" />,
          title: 'Anomaly Detection',
          description:
            'Surface unusual patterns in transactions, user behaviour, or operations before they become costly incidents.',
        },
        {
          icon: <Activity className="h-5 w-5" />,
          title: 'Demand Forecasting',
          description:
            'Optimise inventory, staffing, and procurement with multi-variable demand forecasts updated in real time.',
        },
      ]}
      steps={[
        {
          number: '01',
          title: 'Data audit & preparation',
          description:
            'We assess your existing data quality, volume, and structure — then clean, label, and engineer features for model training.',
        },
        {
          number: '02',
          title: 'Model training & validation',
          description:
            'We train, tune, and validate multiple model architectures against your specific success metrics, not generic benchmarks.',
        },
        {
          number: '03',
          title: 'Deploy & monitor',
          description:
            'Models are deployed to your infrastructure with automated retraining pipelines and drift monitoring to maintain accuracy over time.',
        },
      ]}
      outcomes={[
        { metric: '92%', label: 'Avg. model accuracy' },
        { metric: '60%', label: 'Reduction in false positives' },
        { metric: '8 wks', label: 'Avg. time to production model' },
        { metric: '100%', label: 'Ownership stays with you' },
      ]}
    />
  )
}
