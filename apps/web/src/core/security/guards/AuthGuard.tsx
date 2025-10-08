import { Outlet, Navigate } from "react-router-dom";
import { useGlobalStore } from "../../store/global_store";

interface Props {
  validation: boolean;
}

const privateFragment = <Outlet />;
const publicFragment = <Navigate replace to={"/"} />;

export const AuthGuards: React.FC<Props> = ({
  validation,
}): React.ReactNode => {
  const { isAuthenticated } = useGlobalStore();

  return isAuthenticated ? (
    validation ? (
      privateFragment
    ) : (
      publicFragment
    )
  ) : (
    <Navigate replace to={"/login"} />
  );
};
