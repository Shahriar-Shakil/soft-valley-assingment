import useSWR from "swr";
import { API_LEAD_SOURCE } from "../lib/api-endpoints";

export function useLeadsSource() {
  const { data, error } = useSWR(API_LEAD_SOURCE);

  return {
    data: data?.data,
    loading: !data && !error,
    error,
  };
}
