import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiV1 } from "@/lib/api";

export function useCreateExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["expense", "create"],
    mutationFn: async (payload: { title: string; amount: string }) => {
      const resp = await apiV1.expenses.$post({ json: payload });

      const data = await resp.json();

      if (!resp.ok) {
        Promise.reject(data);
      }

      return data.data;
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["expense", "list"] });
    },
  });
}
