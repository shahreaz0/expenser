import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiV1 } from "@/lib/api";

export const currentUserQueryOptions = queryOptions({
  queryKey: ["user"],
  queryFn: async () => {
    const resp = await apiV1.me.$get();

    if (!resp.ok) {
      return Promise.reject(resp);
    }

    const data = await resp.json();

    return data;
  },
});

export function useGetCurrentUser() {
  return useQuery(currentUserQueryOptions);
}
