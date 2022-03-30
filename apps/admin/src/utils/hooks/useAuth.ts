import { useMemo, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '@gcp/client';

const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(auth.currentUser);

  onAuthStateChanged(auth, (user) => {
    setCurrentUser(user);
    setLoading(false);
  });

  const values = useMemo(() => {
    return [currentUser, loading];
  }, [currentUser, loading]);

  return values;
};

export default useAuth;
