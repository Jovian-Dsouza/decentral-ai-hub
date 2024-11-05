"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useRecoilState } from 'recoil'
import { datasetsAtom } from '@/store/atoms/datasetAtoms'
import { DialogClose } from '@/components/ui/dialog'
import { useStorage } from '@/hooks/useStorage'
import { TransactionModal } from "@/components/common/TransactionModal"
import { toast } from 'react-toastify'
import { Dataset } from '@/types/dataset'


export function UploadDatasetForm() {
  const [files, setFiles] = useState<File[]>([])
  const [datasets, setDatasets] = useRecoilState(datasetsAtom)
  const { uploadFile } = useStorage()
  const [transactionState, setTransactionState] = useState<{
    isOpen: boolean;
    status: 'processing' | 'success' | 'error';
    txHash?: string;
    rootHash?: string;
    error?: string;
  }>({
    isOpen: false,
    status: 'processing'
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if(files.length === 0) {
      toast.error("Please select at least one file to upload")
      return
    }

    console.log("Uploading files:", files)
    setTransactionState({
      isOpen: true,
      status: 'processing'
    })

    try {
      // Get form values directly from elements
      const form = e.currentTarget
      const formElements = form.elements as HTMLCollectionOf<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>

      const uploadResponse = await uploadFile(files[0])
 
      setTransactionState({
          isOpen: true,
          status: 'success',
          txHash: uploadResponse?.tx,
          rootHash: uploadResponse?.rootHash
        })
      console.log("Upload successful")

      // Create new dataset
      const newDataset: Dataset = {
        id: datasets.length + 1,
        name: formElements.namedItem('name')?.value || '',
        description: formElements.namedItem('description')?.value || '',
        version: formElements.namedItem('version')?.value || '',
        category: formElements.namedItem('category')?.value || '',
        quality: 'Pending' as const,
        usage: 0,
        revenue: 0,
        rootHash: uploadResponse?.rootHash,
        filename: files[0].name,
        size: files[0].size
      }
      console.log("New dataset:", newDataset)

      // Add new dataset to state
      setDatasets([...datasets, newDataset])

      // Reset form and close dialog
      form.reset()
      setFiles([])
    } catch (error) {
      console.error("Error uploading file:", error)
      setTransactionState({
        isOpen: true,
        status: 'error',
        error: error instanceof Error ? error.message : 'Something went wrong'
      })
    }
  }

  return (
    <>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Dataset Name</Label>
        <Input id="name" name="name" placeholder="Enter the name of your dataset" required />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea 
          id="description" 
          name="description" 
          placeholder="Describe your dataset" 
          required 
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="version">Version</Label>
        <Input id="version" name="version" placeholder="e.g., 1.0" required />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select name="category" required>
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="image">Image</SelectItem>
            <SelectItem value="text">Text</SelectItem>
            <SelectItem value="audio">Audio</SelectItem>
            <SelectItem value="video">Video</SelectItem>
            <SelectItem value="tabular">Tabular</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="file-upload">Upload Files</Label>
        <Input
          id="file-upload"
          type="file"
          multiple
          onChange={handleFileChange}
          className="h-[3.4rem] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
        />
      </div>

      <div className="flex justify-end gap-2">
        <DialogClose asChild>
          <Button type="button" variant="outline">Cancel</Button>
        </DialogClose>
        <Button type="submit">Upload Dataset</Button>
      </div>
    </form>
    <TransactionModal
        isOpen={transactionState.isOpen}
        onClose={() => setTransactionState(prev => ({ ...prev, isOpen: false }))}
        status={transactionState.status}
        txHash={transactionState.txHash}
        rootHash={transactionState.rootHash}
        error={transactionState.error}
      />
    </>
  )
}