import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Octokit } from "octokit";
import { Box, Avatar, Text, Heading } from "@primer/react";

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

function ListContainer({ children, title }: any) {
  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "border.default",
        borderRadius: 6,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          px: 3,
          py: "12px",
          backgroundColor: "canvas.subtle",
        }}
      >
        <Heading as="h2" sx={{ fontSize: 20, fontWeight: "semibold" }}>
          {title}
        </Heading>
      </Box>
      {children}
    </Box>
  );
}
function ListItem({ follower }: any) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        px: 3,
        py: "12px",
        borderTop: "1px solid",
        borderColor: "border.default",
      }}
      key={follower.login}
    >
      <Avatar src={follower.avatarUrl} alt={follower.name} size={24} />
      <Heading as="h3" sx={{ fontWeight: "semibold", fontSize: 16 }}>
        {follower.name}
      </Heading>
      <Text as="p" sx={{ color: "fg.muted" }}>
        {follower.login}
      </Text>
    </Box>
  );
}
