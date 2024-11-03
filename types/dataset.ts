export interface Dataset {
  id: number;
  name: string;
  description: string;
  version: string;
  quality: 'Verified' | 'Pending';
  usage: number;
  revenue: number;
}