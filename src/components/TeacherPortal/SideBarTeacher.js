import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  Icon,
  
  useColorModeValue,
} from "@chakra-ui/react";
import { FiBook, FiUser,FiHome, FiSettings, FiBookmark } from "react-icons/fi";

const SidebarContent = () => {
  const LinkItems = [
    { name: "Profile", icon: FiUser, to: "/teacher_profile" },
    { name: "LecturesTT", icon: FiBook, to: "/teacherLectureTT" },
    { name: "Dashboard", icon: FiHome, to: "/Dashboard" },
    { name: "Lecture History", icon: FiBookmark, to: "/lecture_history" },
  ];

  return (
    <Box
      bg="white"
      borderRight="1px solid #f0f0f0"
      w="16vw"
      h="100vh"
      pos="fixed"
      borderRadius="20"
    >
      <Flex
        h="30"
        alignItems="center"
        mx="8"
        mt="20"
        mb="20"
        justifyContent="space-between"
        borderBottom="1px solid #f0f0f0"
        pb="4"
      >
        <Text padding="20px" fontSize="25px" fontWeight="bold">
          Teacher Portal
        </Text>
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} to={link.to} name={link.name} />
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, to, name }) => {
  return (
    <Link to={to}>
      <Box
        _hover={{
          bg: "#3652AD",
          color: "white",
        }}
        py="3"
        px="4"
        cursor="pointer"
        transition="background-color 0.3s"
        borderRadius="5%"
      >
        <Flex align="center" >
          <Icon mr="2" fontSize="20" as={icon} /> {/* Adjust icon size */}
          <Text padding="8px" fontSize="18" ml="2">{name}</Text> {/* Adjust text size and add left margin */}
        </Flex>
      </Box>
    </Link>
  );
};

const SideBarTeacher = ({ children }) => {
  return (
    <Box minH="100vh" bg="gray.100">
      <SidebarContent />
      <Box ml={{ base: 0, md: "15vw" }} p="4">
        {children}
      </Box>
    </Box>
  );
};

export default SideBarTeacher;
