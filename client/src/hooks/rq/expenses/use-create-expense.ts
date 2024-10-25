import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiV1 } from "@/lib/api";

import { CreateExpense } from "@server/types/expenses";

export function useCreateExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["expense", "create"],
    mutationFn: async (payload: CreateExpense) => {
      const resp = await apiV1.expenses.$post({ json: payload });

      const data = await resp.json();

      if (!resp.ok) {
        return Promise.reject(data);
      }

      return data.data;
    },

    onMutate: async (newExpense) => {
      await queryClient.cancelQueries({ queryKey: ["expense", "list"] });

      const previousTodos = queryClient.getQueryData(["expense", "list"]);

      queryClient.setQueryData(["expense", "list"], (old: (typeof newExpense)[]) => {
        return [newExpense, ...old];
      });

      return { previousTodos };
    },

    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData(["expense", "list"], context?.previousTodos);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["expense", "list"] });
    },
  });
}
