import { addDoc, collection } from 'firebase/firestore';

import { firestore } from '@gcp/firebase';

interface Data {
  musician: string;
  city: string;
  province: string;
  date: string;
  links: {
    apple?: string;
    bandcamp?: string;
    soundcloud?: string;
    spotify?: string;
    youtube?: string;
  };
}

// Submits artist suggestion to the db
// Verifies the token first
export const suggestMusician = async (data: Data, token: string) => {
  const response = await fetch('/api/captcha', {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
    },
    body: token,
  });

  const success = await response.json().catch(() => {
    throw new Error("Couldn't Connect to Google reCaptcha Server");
  });

  if (success) {
    await addDoc(
      collection(
        firestore,
        `${
          process.env.NEXT_PUBLIC_NODE_ENV === 'development'
            ? 'development-'
            : ''
        }musician-suggestions`
      ),
      data
    ).catch((err) => {
      throw new Error(err);
    });
  } else {
    throw new Error(`Couldn't verify that you're human`);
  }
};
