import { useQuery } from "@tanstack/react-query";
import profileServices from "../service/user.service";

export const useGetProfile = () => {

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user/profile"],
    queryFn: () => profileServices.getProfile(),
  });

  return {
    data,
    isLoading,
    isError,
    error,
  }
};
