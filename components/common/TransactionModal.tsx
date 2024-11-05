import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Loader2, CheckCircle2, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TransactionModalProps {
  isOpen: boolean
  onClose: () => void
  status: 'processing' | 'success' | 'error'
  txHash?: string
  rootHash?: string
  error?: string
}

export function TransactionModal({ 
  isOpen, 
  onClose, 
  status, 
  txHash, 
  rootHash,
  error 
}: TransactionModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <div className="flex flex-col items-center justify-center space-y-4 py-8">
          {status === 'processing' && (
            <>
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <h3 className="text-lg font-semibold">Processing Transaction</h3>
              <p className="text-sm text-muted-foreground text-center">
                Please wait while we process your transaction. This may take a few moments.
              </p>
            </>
          )}

          {status === 'success' && (
            <>
              <CheckCircle2 className="h-12 w-12 text-green-500" />
              <h3 className="text-lg font-semibold">Transaction Successful!</h3>
              <div className="w-full space-y-2 px-4">
                {txHash && txHash !== '' && <div className="rounded-lg bg-muted p-3">
                  <p className="text-sm font-medium">Transaction Hash</p>
                  <p className="text-xs text-muted-foreground break-all">{txHash}</p>
                </div>}
                {rootHash && rootHash !== '' && <div className="rounded-lg bg-muted p-3">
                  <p className="text-sm font-medium">Root Hash</p>
                  <p className="text-xs text-muted-foreground break-all">{rootHash}</p>
                </div>}
              </div>
              <Button onClick={onClose} className="mt-4">Close</Button>
            </>
          )}

          {status === 'error' && (
            <>
              <XCircle className="h-12 w-12 text-destructive" />
              <h3 className="text-lg font-semibold">Transaction Failed</h3>
              <p className="text-sm text-muted-foreground text-center">
                {error || 'An error occurred while processing your transaction.'}
              </p>
              <Button onClick={onClose} variant="destructive">Close</Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}