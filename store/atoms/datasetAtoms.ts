import { atom } from 'recoil'
import { Dataset } from '@/types/dataset'
import { initialDatasets } from '@/data/sampleData'

export const datasetsAtom = atom<Dataset[]>({
  key: 'datasetsAtom',
  default: initialDatasets,
})