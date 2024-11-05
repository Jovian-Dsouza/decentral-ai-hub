import { useState } from 'react';
import { StorageService } from '@/services/StorageService';


export function useStorage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [progress, setProgress] = useState<number>(0);
  
  const storageService = new StorageService();

  const uploadFile = async (file: File) => {
    setIsLoading(true);
    setError(null);
    setProgress(0);
    
    try {
      const result = await storageService.uploadFile(file);
      if (result instanceof Error) {
        throw result;
      }
      setProgress(100);
      return result;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const downloadFile = async (rootHash: string, fileName: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const success = await storageService.downloadFile(rootHash, fileName);
      return success;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    uploadFile,
    downloadFile
  };
}