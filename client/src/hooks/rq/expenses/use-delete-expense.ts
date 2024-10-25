import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiV1 } from "@/lib/api";
import { toast } from "sonner";

export function useDeleteExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["expense", "delete"],
    mutationFn: async (id: number) => {
      const resp = await apiV1.expenses[":id{[0-9]+}"].$delete({
        param: { id: id.toString() },
      });

      const data = await resp.json();

      if (!resp.ok) {
        return Promise.reject(data);
      }

      return data.data;
    },

    onSuccess: () => {
      toast.success("Deleted!", {
        description: "Expense sucessfully deleted.",
      });
    },
    onError: () => {
      toast.success("Try Again!", {
        description: "Something went wrong.",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["expense", "list"] });
    },
  });
}
