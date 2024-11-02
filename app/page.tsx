"use client"

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Upload, Star, BarChart2, GitBranch, CheckCircle } from 'lucide-react'

export default function Home() {
  const [datasets, setDatasets] = useState([
    { id: 1, name: 'Image Classification Dataset', description: 'High-quality labeled images for computer vision tasks', version: '2.3', quality: 'Verified', usage: 1520, revenue: 750 },
    { id: 2, name: 'NLP Corpus', description: 'Multilingual text data for natural language processing', version: '1.7', quality: 'Pending', usage: 890, revenue: 420 },
    { id: 3, name: 'Time Series Financial Data', description: 'Historical stock market data for predictive modeling', version: '3.1', quality: 'Verified', usage: 2100, revenue: 1100 },
    // Add more sample datasets as needed
  ])

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">DecentralAI Hub</h1>
        <div className="flex items-center space-x-2">
          <Input className="w-64" placeholder="Search datasets..." />
          <Button variant="outline" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <div className="flex justify-between items-center mb-4">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="revenue">Highest Revenue</SelectItem>
            <SelectItem value="usage">Most Used</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
          </SelectContent>
        </Select>
        <Button>
          <Upload className="mr-2 h-4 w-4" /> Upload Dataset
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {datasets.map((dataset) => (
          <Card key={dataset.id}>
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
        ))}
      </div>
    </div>
  )
}