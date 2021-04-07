import Head from "next/head";
import styles from "../styles/Home.module.css";
import React from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/client";

export default function Home() {
  const [session, loading] = useSession();
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {!session && (
          <>
            Not signed in
            <br />
            <button onClick={signIn}>Sign in</button>
          </>
        )}
        {session && (
          <>
            Signed in as {session.user.email}
            <br />
            <div>Now you can access the page</div>
            <button>
              <Link href="/secret"> To the secret page</Link>
            </button>
            <button onClick={signOut}>Sign out</button>
          </>
        )}
      </main>
    </div>
  );
}
