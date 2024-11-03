import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, BarChart2, GitBranch, CheckCircle } from 'lucide-react'
import { Dataset } from "@/types/dataset"

interface DatasetCardProps {
  dataset: Dataset;
}

export function DatasetCard({ dataset }: DatasetCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-start">
          <span>{dataset.name}</span>
          <Badge variant={dataset.quality === 'Verified' ? 'default' : 'secondary'}>
            {dataset.quality === 'Verified' ? <CheckCircle className="h-4 w-4 mr-1" /> : null}
            {dataset.quality}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{dataset.description}</p>
        <div className="flex justify-between text-sm">
          <span className="flex items-center">
            <GitBranch className="h-4 w-4 mr-1" /> v{dataset.version}
          </span>
          <span className="flex items-center">
            <BarChart2 className="h-4 w-4 mr-1" /> {dataset.usage} uses
          </span>
          <span className="flex items-center">
            <Star className="h-4 w-4 mr-1" /> ${dataset.revenue}
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Use This Dataset</Button>
      </CardFooter>
    </Card>
  )
}