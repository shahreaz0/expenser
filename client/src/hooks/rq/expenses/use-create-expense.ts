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

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["expense", "list"] });
    },
  });
}
