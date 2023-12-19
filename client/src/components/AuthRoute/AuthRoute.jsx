import { Navigate } from "react-router-dom";
import { AuthorizeContext } from "../../contexts/auth";
import { useContext } from "react";

const AuthRoute = ({ children }) => {
  const { initialized, currentUser } = useContext(AuthorizeContext);
  if (!initialized) return null;
  if (initialized && !currentUser) return <Navigate to="/" replace />;

  return <>{children}</>;
};
export default AuthRoute;
