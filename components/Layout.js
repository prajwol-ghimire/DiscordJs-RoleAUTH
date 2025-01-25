import Head from 'next/head';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Authorization System</title>
      </Head>
      <main>
        {children}
      </main>
    </>
  );
}