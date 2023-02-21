import useSWR from "swr";
import { request } from "../config/api";
import { API_LEAD_LIST } from "../lib/api-endpoints";

const fetcher = ([url, filterState]) => {
  return request.post(url, { ...filterState }).then((r) => r.data);
};

export function useLeadList({ page, pageSize, filterState }) {
  // const cookieToken = cookie.get("token");
  const { data, error } = useSWR(
    [`${API_LEAD_LIST}?page=${page}&limit=${pageSize}`, filterState],
    fetcher
  );
  return {
    data: data?.data,
    loading: !data && !error,
    error,
  };
}
