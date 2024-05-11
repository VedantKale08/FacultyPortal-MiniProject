import React from "react";
import { Flex, Box, Text, Spacer, Avatar } from "@chakra-ui/react";

const Navbar = ({ userName }) => {
  return (
    <Flex bg="blue.500" p="4" alignItems="center">
      <Box>
        <Text color="white" fontSize="xl">My App</Text>
      </Box>
      <Spacer />
      <Box>
        <Avatar name={userName} size="sm" />
        <Text color="white" fontSize="md" ml="2">{userName}</Text>
      </Box>
    </Flex>
  );
};

const Sidebar = () => {
  return (
    <Box bg="gray.200" h="100vh" w="200px" p="4">
      <Text fontSize="xl" fontWeight="bold">Sidebar</Text>
      {/* Add sidebar content here */}
    </Box>
  );
};

const Layout = ({ children, userName }) => {
  return (
    <Flex>
      <Sidebar />
      <Flex direction="column" flex="1">
        <Navbar userName={userName} />
        <Box flex="1" p="4">
          {children}
        </Box>
      </Flex>
    </Flex>
  );
};

export default Layout;
