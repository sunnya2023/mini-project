import { Navigate } from "react-router-dom";
import { auth } from "../routes/Firebase";

function ProtectRouter({ children }: { children: React.ReactNode }) {
  const user = auth.currentUser;
  console.log(user);
  if (user === null) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default ProtectRouter;
