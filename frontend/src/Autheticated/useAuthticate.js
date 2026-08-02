import { useSelector } from "react-redux";

const useAuthenticate = (setOpen) => {
  const { user } = useSelector((state) => state.auth);

  const requireAuth = () => {
    if (!user) {
      setOpen(true);
      return false;
    }

    return true;
  };

  return requireAuth;
};

export default useAuthenticate;