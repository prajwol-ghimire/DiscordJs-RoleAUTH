import { signIn, signOut, useSession } from "next-auth/react";
import Link from 'next/link';
import Layout from '../components/Layout';

export default function Home() {
  const { data: session } = useSession();

  return (
    <Layout>
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h1>Welcome to the Landing Page</h1>

        {!session ? (
          <button
            onClick={() => signIn('discord')}
            style={{
              padding: '10px 20px',
              backgroundColor: '#5865F2',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              margin: '10px'
            }}
          >
            Login with Discord
          </button>
        ) : (
          <div>
            <p>Welcome back, {session.user.name}!</p>

            <div style={{ marginTop: '20px' }}>
              <Link href="/admin" passHref>
                <button
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    margin: '10px'
                  }}
                >
                  Go to Admin Page
                </button>
              </Link>

              <Link href="/mod" passHref>
                <button
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#FFA500',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    margin: '10px'
                  }}
                >
                  Go to Mod Page
                </button>
              </Link>
            </div>

            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              style={{
                padding: '10px 20px',
                backgroundColor: '#FF4444',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                margin: '10px'
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}