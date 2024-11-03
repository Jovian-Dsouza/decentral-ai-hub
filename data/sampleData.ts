import { Dataset } from '@/types/dataset';

export const initialDatasets: Dataset[] = [
  {
    id: 1,
    name: 'Image Classification Dataset',
    description: 'High-quality labeled images for computer vision tasks',
    version: '2.3',
    quality: 'Verified',
    usage: 1520,
    revenue: 750,
  },
  { id: 2, name: 'NLP Corpus', description: 'Multilingual text data for natural language processing', version: '1.7', quality: 'Pending', usage: 890, revenue: 420 },
  { id: 3, name: 'Time Series Financial Data', description: 'Historical stock market data for predictive modeling', version: '3.1', quality: 'Verified', usage: 2100, revenue: 1100 },
];
