import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Loader2, Check, AlertCircle } from "lucide-react"

interface SaveConfirmDialogProps {
  isOpen: boolean
  onConfirm: () => Promise<void>
  onCancel: () => void
  onViewArticle: () => void
  onContinueEditing: () => void
  isSaving: boolean
  status: 'idle' | 'saving' | 'success' | 'error'
  slug?: string
}

export function SaveConfirmDialog({
  isOpen,
  onConfirm,
  onCancel,
  onViewArticle,
  onContinueEditing,
  isSaving,
  status,
  slug
}: SaveConfirmDialogProps) {
  const getStatusContent = () => {
    switch (status) {
      case 'saving':
        return {
          icon: <Loader2 className="w-4 h-4 animate-spin" />,
          title: "Saving Article",
          description: "Publishing your article. Please wait...",
          showActions: false
        }
      case 'success':
        return {
          icon: <Check className="w-4 h-4 text-green-500" />,
          title: "Article Saved!",
          description: "Your article has been published successfully.",
          showActions: true
        }
      case 'error':
        return {
          icon: <AlertCircle className="w-4 h-4 text-red-500" />,
          title: "Save Failed",
          description: "Failed to save article. Please try again.",
          showActions: false
        }
      default:
        return {
          title: "Save Changes?",
          description: "Do you want to save your changes?",
          showActions: false
        }
    }
  }

  const content = getStatusContent()

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            {content.icon}
            {content.title}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {content.description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2">
          {content.showActions ? (
            <>
              <Button
                variant="outline"
                onClick={onContinueEditing}
              >
                Continue Editing
              </Button>
              <Button
                onClick={onViewArticle}
              >
                View Article
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={onCancel}
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button
                onClick={onConfirm}
                disabled={isSaving}
              >
                Save Changes
              </Button>
            </>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}