import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { SAVE_API_END_POINT } from "@/utils/constant";
import { setSavedJobs } from "@/redux/savedJobSlice";

const useGetSavedJobs = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      if (!user) {
        dispatch(setSavedJobs([]));
        return;
      }

      try {
        const res = await axios.get(`${SAVE_API_END_POINT}/get`, {
          withCredentials: true,
        });

        if (res.data.success) {
          const savedJobList = (res.data.savedJobs || [])
            .map((item) => item.job)
            .filter(Boolean);
          dispatch(setSavedJobs(savedJobList));
        } else {
          dispatch(setSavedJobs([]));
        }
      } catch (error) {
        dispatch(setSavedJobs([]));
      }
    };

    fetchSavedJobs();
  }, [user, dispatch]);
};

export default useGetSavedJobs;
