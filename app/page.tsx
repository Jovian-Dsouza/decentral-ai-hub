"use client"

import { Header } from '@/components/common/Header'
import { DatasetFilters } from '@/components/common/DatasetFilters'
import { DatasetCard } from '@/components/common/DatasetCard'
import { datasetsAtom } from '@/store/atoms/datasetAtoms'
import { useRecoilValue } from 'recoil'

export default function Home() {
  const datasets = useRecoilValue(datasetsAtom)

  return (
    <div className="container mx-auto p-4">
      <Header />
      <DatasetFilters />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {datasets.map((dataset) => (
          <DatasetCard key={dataset.id} dataset={dataset} />
        ))}
      </div>
    </div>
  )
}