import { useQuery } from "@tanstack/react-query";
import { apiV1 } from "@/lib/api";

export function useGetTotalExpenses() {
  return useQuery({
    queryKey: ["expenses", "total"],
    queryFn: async () => {
      const resp = await apiV1.expenses["total"].$get();

      const data = await resp.json();

      if (!resp.ok) {
        throw new Error("Somthing went wrong");
      }

      return data;
    },
  });
}
