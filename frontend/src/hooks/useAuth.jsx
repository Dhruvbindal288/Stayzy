import { useQuery} from "@tanstack/react-query";
import axiosInstance from "../lib/axios";


function useAuth() {
   const { data: user,isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const response = await axiosInstance.get("/auth/me");
      return response.data.user;
    },retry: false,
  });
return {user,isLoading}
}

export default useAuth
