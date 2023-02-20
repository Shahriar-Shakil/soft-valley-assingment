import useSWR from "swr";
import { API_LEAD_ASSIGNEE } from "../lib/api-endpoints";

export function useLeadsAssignee() {
  const { data, error } = useSWR(API_LEAD_ASSIGNEE);

  return {
    data: data?.data,
    loading: !data && !error,
    error,
  };
}
