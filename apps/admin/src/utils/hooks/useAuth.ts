import { useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';

import { auth } from '@gcp/client';

const useAuth = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(auth.currentUser);

  useEffect(() => {
    if (router.pathname !== '/sign-in' && !loading && !currentUser) {
      router.push('/sign-in');
    } else if (router.pathname === '/sign-in' && currentUser) {
      router.push('/');
    }
  }, [router, loading, currentUser]);

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
