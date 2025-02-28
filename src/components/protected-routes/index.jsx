import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isCreator, creatorMode, isLoggedIn, children }) => {

  //console.log("isCreator:",isCreator,"creatorMode:",creatorMode,"isLoggedIn:",isLoggedIn)

  if (!isCreator || !creatorMode || !isLoggedIn) {
    console.log("Hello from Protected Routes")
    return <Navigate to="/home" />; // Redirect to home or login page
  }
  return children;
};

export default ProtectedRoute;
