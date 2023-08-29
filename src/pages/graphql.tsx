import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Octokit } from "octokit";
import { Box } from "@primer/react";
import { ListContainer, ListItem } from "../components/ListViewLite";

interface QueryResponse {
  viewer: {
    followers: {
      nodes: {
        name: string;
        login: string;
        avatarUrl: string;
      }[];
    };
  };
}

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

  const getFollowers = useCallback(async () => {
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
    const response = await client?.graphql<QueryResponse>(query);
    const viewer = response?.viewer;
    if (viewer) setFollowers(viewer.followers.nodes);
  }, [client])

  useEffect(() => {
    if (client) {
      getFollowers();
    }
  }, [client, getFollowers]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box as="main" sx={{ margin: "0 auto", maxWidth: 1200 }}>
      <ListContainer title="Followers">
        {followers.map((follower, index) => (
          <ListItem follower={follower} key={index} />
        ))}
      </ListContainer>
    </Box>
  );
}
