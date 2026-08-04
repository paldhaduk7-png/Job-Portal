import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ children }) => {
    const { user } = useSelector((store) => store.auth);

    if (user) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PublicRoute;