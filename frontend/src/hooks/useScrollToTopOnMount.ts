import { useEffect } from 'react';

const useScrollToTopOnMount = () => {
  useEffect(() => {
    if (window) {
      window.scrollTo(0, 0);
    }
  }, []);
};

export default useScrollToTopOnMount;
