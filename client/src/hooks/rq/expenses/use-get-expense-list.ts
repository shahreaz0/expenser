import { useQuery } from "@tanstack/react-query";
import { apiV1 } from "@/lib/api";

export function useGetExpenseList() {
  return useQuery({
    queryKey: ["expense", "list"],
    queryFn: async () => {
      const resp = await apiV1.expenses.$get();

      const data = await resp.json();

      if (!resp.ok) {
        Promise.reject(data);
      }

      return data.data;
    },
  });
}
