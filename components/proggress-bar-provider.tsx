'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { SessionProvider } from 'next-auth/react';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      {children}
      <ProgressBar
        height="4px"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </SessionProvider>
  );
};

export default Providers;
