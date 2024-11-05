import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, BarChart2, GitBranch, CheckCircle, ExternalLink } from 'lucide-react'
import { Dataset } from "@/types/dataset"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useState } from "react"
import { DownloadModal } from "./DownloadModal"

interface DatasetCardProps {
  dataset: Dataset;
  onUse?: (dataset: Dataset) => void;
}

export function DatasetCard({ dataset , onUse }: DatasetCardProps) {
  const [showDownloadModal, setShowDownloadModal] = useState(false)

  return (
    <>
    <Card className="h-[14rem] flex flex-col group hover:shadow-lg transition-all duration-300 relative">
      <CardHeader className="pb-3">
        <CardTitle className="flex justify-between items-start gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <span className="truncate text-lg font-semibold hover:text-primary cursor-pointer">
                  {dataset.name}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>{dataset.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <Badge 
            variant={dataset.quality === 'Verified' ? 'default' : 'secondary'}
            className="transition-colors duration-200 hover:bg-opacity-90"
          >
            {dataset.quality === 'Verified' && (
              <CheckCircle className="h-3.5 w-3.5 mr-1 text-green-500" />
            )}
            {dataset.quality}
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3 text-left hover:text-foreground transition-colors duration-200">
                {dataset.description}
              </p>
            </TooltipTrigger>
            <TooltipContent className="max-w-[300px]">
              <p>{dataset.description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="flex justify-between text-sm text-muted-foreground">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <span className="flex items-center hover:text-foreground transition-colors duration-200">
                  <GitBranch className="h-4 w-4 mr-1" /> v{dataset.version}
                </span>
              </TooltipTrigger>
              <TooltipContent>Version {dataset.version}</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <span className="flex items-center hover:text-foreground transition-colors duration-200">
                  <BarChart2 className="h-4 w-4 mr-1" /> {dataset.usage.toLocaleString()} uses
                </span>
              </TooltipTrigger>
              <TooltipContent>Used {dataset.usage.toLocaleString()} times</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <span className="flex items-center hover:text-foreground transition-colors duration-200">
                  <Star className="h-4 w-4 mr-1" /> ${dataset.revenue.toLocaleString()}
                </span>
              </TooltipTrigger>
              <TooltipContent>Revenue: ${dataset.revenue.toLocaleString()}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>

      <CardFooter className="pt-3">
        <Button 
          className="w-full group-hover:bg-primary/90 transition-colors duration-200"
          onClick={onUse ? () => onUse(dataset) : () => setShowDownloadModal(true)}
        >
          Use This Dataset <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
    <DownloadModal 
        dataset={dataset}
        isOpen={showDownloadModal}
        onClose={() => setShowDownloadModal(false)}
      />
    </>
  )
}