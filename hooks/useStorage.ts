'use client'

import { useState, useEffect } from 'react';
import { StorageService } from '@/services/StorageService';

export function useStorage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [storageService, setStorageService] = useState<StorageService | null>(null);
  
  // Initialize StorageService on client-side only
  useEffect(() => {
    // Ensure we're on client side
    if (typeof window !== 'undefined') {
      setStorageService(new StorageService());
    }
  }, []);

  const uploadFile = async (file: File) => {
    if (!storageService) {
      throw new Error('Storage service not initialized');
    }

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
    if (!storageService) {
      throw new Error('Storage service not initialized');
    }

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
    progress,
    uploadFile,
    downloadFile,
    isReady: !!storageService
  };
}

// Create a client-side only component wrapper if needed
export default function ClientStorageHook() {
  return useStorage();
}