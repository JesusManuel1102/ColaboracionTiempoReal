import { useGetProfile } from "../queries";

export const useProfile = () => {
  const { data, isLoading, isError, error } = useGetProfile();

  return {
    data,
    isLoading,
    isError,
    error,
  }
}