import { useState, useEffect, useContext } from "react";
import AppContext from "../context/AppContext";
import serverAccess from "../api/serverAccess";
import sendAuthTokenHeader from "../api/tokenConfig";

const useAxiosFetch = (dataUrl) => {
  const { token } = useContext(AppContext);
  const [data, setData] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async (url) => {
      setIsLoading(true);
      try {
        const response = await serverAccess.get(
          url,
          sendAuthTokenHeader(token)
        );
        if (isMounted) {
          setData(response.data);
          setFetchError(null);
        }
      } catch (err) {
        if (isMounted) {
          setFetchError(err.message);
          setData([]);
        }
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    fetchData(dataUrl);

    const cleanUp = () => {
      isMounted = false;
    };

    return cleanUp;
  }, [dataUrl]);

  return { data, fetchError, isLoading };
};

export default useAxiosFetch;
