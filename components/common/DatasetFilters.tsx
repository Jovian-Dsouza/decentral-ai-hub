"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload } from 'lucide-react'
import { useRecoilState } from 'recoil'
import { datasetsAtom } from '@/store/atoms/datasetAtoms'
import { Dataset } from '@/types/dataset'

type SortOption = 'revenue' | 'usage' | 'newest'

export function DatasetFilters() {
  const [datasets, setDatasets] = useRecoilState(datasetsAtom)

  const handleSort = (value: SortOption) => {
    const sortedDatasets = [...datasets].sort((a: Dataset, b: Dataset) => {
      switch (value) {
        case 'revenue':
          return b.revenue - a.revenue
        case 'usage':
          return b.usage - a.usage
        case 'newest':
          return b.id - a.id
        default:
          return 0
      }
    })
    setDatasets(sortedDatasets)
  }

  return (
    <div className="flex justify-between items-center mb-4">
      <Select onValueChange={(value) => handleSort(value as SortOption)}>
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