export type ContactSubmission = {
  id?: string
  created_at?: string
  name: string
  email: string
  company: string
  role: string
  message: string
  type: 'discovery_call' | 'application'
}

export type ApplicationSubmission = {
  id?: string
  created_at?: string
  business_name: string
  email: string
  phone: string
  business_type: string
  employee_count: string
  current_challenge: string
  desired_outcome: string
  budget_range: string
  timeline: string
}
