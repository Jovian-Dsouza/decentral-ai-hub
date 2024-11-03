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

export function UploadDatasetForm() {
  const [files, setFiles] = useState<File[]>([])
  const [datasets, setDatasets] = useRecoilState(datasetsAtom)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    // Create new dataset
    const newDataset = {
      id: datasets.length + 1,
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      version: formData.get('version') as string,
      quality: 'Pending' as const,
      usage: 0,
      revenue: 0,
    }

    // Add new dataset to state
    setDatasets([...datasets, newDataset])
    
    // Reset form and close dialog
    e.currentTarget.reset()
    setFiles([])
  }

  return (
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
  )
}