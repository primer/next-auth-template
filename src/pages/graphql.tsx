import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Octokit } from "octokit";
import { Box } from "@primer/react";
import { ListContainer, ListItem } from "../components/ListViewLite";

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
    <Box as="main" sx={{ margin: "0 auto", maxWidth: 1200 }}>
      <ListContainer title="Followers">
        {followers.map((follower) => (
          <ListItem follower={follower} />
        ))}
      </ListContainer>
    </Box>
  );
}
