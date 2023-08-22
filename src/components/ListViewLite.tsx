import { Box, Avatar, Text, Heading } from "@primer/react";

export function ListContainer({ children, title }: any) {
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
        <Heading as="h2" sx={{ fontSize: 16, fontWeight: "semibold" }}>
          {title}
        </Heading>
      </Box>
      {children}
    </Box>
  );
}

export function ListItem({ follower }: any) {
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
      <Heading as="h3" sx={{ fontWeight: "semibold", fontSize: 14 }}>
        {follower.name}
      </Heading>
      <Text as="p" sx={{ color: "fg.muted" }}>
        {follower.login}
      </Text>
    </Box>
  );
}
