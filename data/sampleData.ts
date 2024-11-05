import { Dataset } from '@/types/dataset';

export const initialDatasets: Dataset[] = [
  {
    id: 1,
    name: 'Image Classification Dataset',
    description: 'High-quality labeled images for computer vision tasks',
    version: '2.3',
    category: 'Computer Vision',
    quality: 'Verified',
    usage: 1520,
    revenue: 750,
  },
  { id: 2, name: 'NLP Corpus', description: 'Multilingual text data for natural language processing', version: '1.7', category: 'Natural Language Processing', quality: 'Pending', usage: 890, revenue: 420, rootHash: '0x3da44c58b1000211a0ce3db38feb48d82641fe874c15d078b0e64a2ca8801cb3' },
  { id: 3, name: 'Time Series Financial Data', description: 'Historical stock market data for predictive modeling', version: '3.1', category: 'Finance', quality: 'Verified', usage: 2100, revenue: 1100 },
];
