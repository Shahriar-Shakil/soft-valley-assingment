import useSWR from "swr";
import { API_LEAD_STATUS } from "../lib/api-endpoints";

export function useLeadsStatus() {
  const { data, error } = useSWR(API_LEAD_STATUS);
  return {
    data: data?.data,
    loading: !data && !error,
    error,
  };
}
