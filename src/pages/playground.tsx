import {
  Box,
  Text,
  Link,
  StyledOcticon,
  PageLayout,
  NavList,
} from "@primer/react";
import {
  CheckIcon,
  CommentIcon,
  MortarBoardIcon,
} from "@primer/octicons-react";

export default function Playground() {
  return (
    <PageLayout containerWidth="xlarge">
      <PageLayout.Pane position="start">
        <NavList>
          <NavList.Item href="#" aria-current="page">
            Home
          </NavList.Item>
          <NavList.Item href="#">Jungle Gym</NavList.Item>
          <NavList.Item href="#">Monkey Bars</NavList.Item>
          <NavList.Item href="#">Turbo Tube Slide</NavList.Item>
        </NavList>
      </PageLayout.Pane>
      <PageLayout.Content>
        <Box
          bg="canvas.default"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="start"
        >
          <Box
            maxWidth={800}
            width="100%"
            height={300}
            bg="neutral.emphasisPlus"
            borderRadius={2}
            p={4}
            mb={3}
          >
            <CodeLine icon={CheckIcon} iconColor="success.fg">
              Mona's playground successfully initialised...
            </CodeLine>
            <CodeLine icon={CommentIcon} iconColor="accent.fg">
              Visit <Text color="text.warning">src/pages/index.js</Text> and
              start building your own layouts using Primer.
            </CodeLine>
          </Box>
        </Box>
      </PageLayout.Content>
      <PageLayout.Footer>
        <Box
          py={3}
          mb={3}
          borderTopColor="border.default"
          borderTopWidth={1}
          borderTopStyle="solid"
        >
          <Footer />
        </Box>
      </PageLayout.Footer>
    </PageLayout>
  );
}

function CodeLine({ icon, iconColor, children }) {
  return (
    <Box display="flex" color="fg.onEmphasis" mb={2}>
      <Box display="flex" mt="2px" width={20} minWidth={20}>
        <StyledOcticon icon={icon} size={16} color={iconColor} />
      </Box>
      <Text as="p" flex={1} fontSize={1} fontFamily="mono" ml={2}>
        {children}
      </Text>
    </Box>
  );
}

function Footer() {
  return (
    <Box textAlign="center" mb={3}>
      <Box mr={2} display="inline-block">
        <StyledOcticon
          icon={MortarBoardIcon}
          size={16}
          color="attention.fg"
          sx={{ mr: 1 }}
        />
        <Text color="attention.fg">Tip</Text>
      </Box>
      <Text>
        Before you get started check out our{" "}
        <Link href="https://primer.style/react" target="_blank">
          Primer React Documentation
        </Link>
      </Text>
    </Box>
  );
}
