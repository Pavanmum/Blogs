import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Protected({ children }) {
  const { user } = useSelector((state) => state.auth);

  // Check if the user is authenticated
  if (!user) {
    // If not authenticated, check if there's a token in local storage
    const token = localStorage.getItem("token");
    if (!token) {
      // If no token found, navigate to the login page
      return <Navigate to="/login" replace={true}></Navigate>;
    }
  }

  // If user is authenticated or token is found, render the protected content
  return children;
}

export default Protected;
