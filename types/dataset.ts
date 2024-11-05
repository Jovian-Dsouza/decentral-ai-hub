export interface Dataset {
  id: number;
  name: string;
  description: string;
  version: string;
  category: string;
  quality: 'Verified' | 'Pending';
  usage: number;
  revenue: number;
  rootHash?: string;
  filename?: string;
  size?: number;
}
