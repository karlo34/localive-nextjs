export interface Job {
  country: string;
  region: string;
  city: string;
  company_name: string;
  created_at: Date;
  description: string;
  expires_at: Date;
  job_id: number;
  is_active: number;
  location_id: number;
  posted_by: number;
  title: string;
  application_count: number;
}