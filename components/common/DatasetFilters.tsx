import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload } from 'lucide-react'

export function DatasetFilters() {
  return (
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
  )
}