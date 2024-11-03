import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, GitBranch, Star, Users, FileText, Image, CheckCircle, AlertTriangle } from 'lucide-react'

export default function DatasetDetails() {
  const dataset = {
    id: 1,
    name: "Large-scale Image Classification Dataset",
    description: "A comprehensive dataset of labeled images across 1000 categories, ideal for training computer vision models.",
    version: "2.3",
    category: "Image",
    size: "250 GB",
    files: 1500000,
    quality: "Verified",
    usage: 1520,
    revenue: 7500,
    price: 499,
    creator: "AI Research Lab",
    createdAt: "2023-05-15",
    lastUpdated: "2023-11-02",
    license: "CC BY-NC-SA 4.0"
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">{dataset.name}</h1>
          <p className="text-muted-foreground mb-4">{dataset.description}</p>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-sm">
              <GitBranch className="mr-1 h-3 w-3" />
              v{dataset.version}
            </Badge>
            <Badge variant="outline" className="text-sm">
              <FileText className="mr-1 h-3 w-3" />
              {dataset.category}
            </Badge>
            <Badge variant="outline" className="text-sm">
              <Image className="mr-1 h-3 w-3" />
              {dataset.files.toLocaleString()} files
            </Badge>
            <Badge variant={dataset.quality === 'Verified' ? 'default' : 'secondary'} className="text-sm">
              {dataset.quality === 'Verified' ? <CheckCircle className="mr-1 h-3 w-3" /> : <AlertTriangle className="mr-1 h-3 w-3" />}
              {dataset.quality}
            </Badge>
          </div>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          Purchase for ${dataset.price}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Usage Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Downloads</span>
                <span className="font-medium">{dataset.usage}</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Total Revenue</span>
              <span className="text-xl font-bold">${dataset.revenue.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dataset Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Size</span>
              <span className="font-medium">{dataset.size}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Creator</span>
              <span className="font-medium">{dataset.creator}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Created</span>
              <span className="font-medium">{dataset.createdAt}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Last Updated</span>
              <span className="font-medium">{dataset.lastUpdated}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">License</span>
              <span className="font-medium">{dataset.license}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full">
              <Download className="mr-2 h-4 w-4" /> Download Sample
            </Button>
            <Button variant="outline" className="w-full">
              <Star className="mr-2 h-4 w-4" /> Add to Favorites
            </Button>
            <Button variant="outline" className="w-full">
              <Users className="mr-2 h-4 w-4" /> Share Dataset
            </Button>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="preview">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="metadata">Metadata</TabsTrigger>
          <TabsTrigger value="usage">Usage Examples</TabsTrigger>
        </TabsList>
        <TabsContent value="preview" className="p-4 bg-muted rounded-md">
          <h3 className="text-lg font-semibold mb-2">Dataset Preview</h3>
          <p>Preview of the dataset would be shown here, such as sample images or data points.</p>
        </TabsContent>
        <TabsContent value="metadata" className="p-4 bg-muted rounded-md">
          <h3 className="text-lg font-semibold mb-2">Metadata</h3>
          <pre className="text-sm">{JSON.stringify(dataset, null, 2)}</pre>
        </TabsContent>
        <TabsContent value="usage" className="p-4 bg-muted rounded-md">
          <h3 className="text-lg font-semibold mb-2">Usage Examples</h3>
          <p>Code snippets or examples of how to use this dataset would be provided here.</p>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Related Datasets</CardTitle>
          <CardDescription>You might also be interested in these datasets</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle className="text-md">Related Dataset {i}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Brief description of related dataset {i}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">View Details</Button>
              </CardFooter>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}