import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useExpenseStore } from "@/store/expenses";

export function ExpensesUpsertDialog() {
  const { isExpensesDialogOpen, setIsExpensesDialogOpen } = useExpenseStore();

  return (
    <Dialog open={isExpensesDialogOpen} onOpenChange={setIsExpensesDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account and
            remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
