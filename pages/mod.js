import { useSession, signOut } from "next-auth/react";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';

export default function ModPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyAccess = async () => {
      try {
        const response = await fetch('/api/check-mod');
        
        if (!response.ok) {
          // await signOut({ redirect: false });
          router.replace('/');
          return;
        }

        setIsAuthorized(true);
      } catch (error) {
        console.error('Access verification failed:', error);
        await signOut({ redirect: false });
        router.replace('/');
      } finally {
        setIsLoading(false);
      }
    };

    if (session) verifyAccess();
    else router.replace('/');
  }, [session, router]);

  if (!session || isLoading) {
    return (
      <Layout>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <h2>Verifying access...</h2>
          <p>Please wait while we check your permissions</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h1>Moderator Dashboard</h1>
        {isAuthorized && (
          <div>
            <p>Welcome, {session.user.name}!</p>
            <p>You have access to the moderator panel.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}