import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Dataset } from "@/types/dataset"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { 
  Download, 
  FileText, 
  GitBranch, 
  CheckCircle, 
  AlertTriangle,
  Copy,
  Loader2,
  FileDown
} from 'lucide-react'
import { useState } from "react"
import { toast } from 'react-toastify'
import { useStorage } from "@/hooks/useStorage"

interface DownloadModalProps {
  dataset: Dataset
  isOpen: boolean
  onClose: () => void
}

export function DownloadModal({ dataset, isOpen, onClose }: DownloadModalProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  const { downloadFile } = useStorage()

  const handleDownload = async () => {
    setIsDownloading(true)
    const toastId = toast.loading("Preparing your download...")
    
    try {
      await downloadFile(dataset.rootHash || '', dataset.filename || dataset.name)
      
      toast.update(toastId, {
        render: "Dataset download started!",
        type: "success",
        isLoading: false,
        autoClose: 5000
      })
    } catch (error) {
      toast.update(toastId, {
        render: "Download failed. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 5000
      })
    } finally {
      setIsDownloading(false)
    }
  }

  const copyHash = (hash: string) => {
    navigator.clipboard.writeText(hash)
    toast.success("Hash copied to clipboard!", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileDown className="h-5 w-5" />
              Download Dataset
            </div>
            <Badge 
              variant={dataset.quality === 'Verified' ? 'default' : 'secondary'}
            >
              {dataset.quality === 'Verified' ? 
                <CheckCircle className="mr-1 h-3 w-3" /> : 
                <AlertTriangle className="mr-1 h-3 w-3" />
              }
              {dataset.quality}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            <span className="font-medium">{dataset.name}</span> - {dataset.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Dataset Information */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">
              <GitBranch className="mr-1 h-3 w-3" />
              Version {dataset.version}
            </Badge>
            <Badge variant="outline">
              <FileText className="mr-1 h-3 w-3" />
              {dataset.usage.toLocaleString()} downloads
            </Badge>
            {/* <Badge variant="outline">
              Size: {dataset.size || "250MB"}
            </Badge> */}
          </div>

          {/* Hash Information */}
          {dataset.rootHash && <Card className="p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Root Hash</span>
                <div className="flex items-center gap-2">
                  <code className="bg-muted px-2 py-1 rounded text-xs">
                    {dataset.rootHash 
                        ? `${dataset.rootHash.slice(0, 6)}...${dataset.rootHash.slice(-4)}`
                        : 'No hash available'
                    }
                  </code>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => copyHash(dataset.rootHash || '')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                This hash uniquely identifies your dataset on the network. Save it for future reference.
              </p>
            </div>
          </Card>}

          {/* Download Options */}
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <h4 className="font-medium text-sm">Download Options</h4>
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  className="w-full"
                  onClick={handleDownload}
                  disabled={isDownloading}
                >
                  {isDownloading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" /> 
                      Full Dataset
                    </>
                  )}
                </Button>
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" /> Sample Only
                </Button>
              </div>
            </div>
          </div>

          <div className="text-xs text-muted-foreground">
            By downloading this dataset, you agree to the terms of use and licensing agreements.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}