"use client"

import { Header } from '@/components/common/Header'
import { DatasetFilters } from '@/components/common/DatasetFilters'
import { DatasetCard } from '@/components/common/DatasetCard'
import { UploadDatasetDialog } from '@/components/common/UploadDatasetDialog'
import { datasetsAtom } from '@/store/atoms/datasetAtoms'
import { useRecoilValue } from 'recoil'
import { ConnectButton } from '@rainbow-me/rainbowkit'


export default function Home() {
  const datasets = useRecoilValue(datasetsAtom)

  return (
    <div className="container mx-auto p-4">
      <Header />
      <div className="flex justify-between items-center mb-4">
        <DatasetFilters />
        <UploadDatasetDialog />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {datasets.map((dataset) => (
          <DatasetCard key={dataset.id} dataset={dataset} />
        ))}
      </div>
      <div className="fixed bottom-12 z-50">
        <ConnectButton />
      </div>
    </div>
  )
}