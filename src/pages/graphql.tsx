import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useSession } from "next-auth/react";
// import { GraphQLClient } from "@octokit/graphql";
import { Octokit } from "@octokit-next/core";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data } = useSession();
  const [loading, setLoading] = useState(true);
  const [followers, setFollowers] = useState<any[]>([]);
  const [client, setClient] = useState<Octokit>();

  useEffect(() => {
    if (data?.accessToken) {
      setClient(
        new Octokit({
          auth: data.accessToken,
        })
      );
      setLoading(false);
    }
  }, [data]);

  async function getFollowers() {
    const query = `
      query {
        viewer {
          followers(first: 10) {
            nodes {
              name
              login
              avatarUrl
            }
          }
        }
      }
    `;
    const { viewer } = await client?.graphql(query);
    setFollowers(viewer.followers.nodes);
  }

  useEffect(() => {
    if (client) {
      getFollowers();
    }
  }, [client]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <main className={`${styles.main} ${inter.className}`}>
        <pre>{JSON.stringify(data, null, 2)}</pre>
        {followers.map((follower) => (
          <div key={follower.login}>
            <img
              src={follower.avatarUrl}
              alt={follower.name}
              width={50}
              height={50}
            />
            <h4>{follower.name}</h4>
            <p>{follower.login}</p>
          </div>
        ))}
      </main>
    </>
  );
}
