import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from 'lucide-react'

export function Header() {
  return (
    <header className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">DecentralAI Hub</h1>
      <div className="flex items-center space-x-2">
        <Input className="w-64" placeholder="Search datasets..." />
        <Button variant="outline" size="icon">
          <Search className="h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}