import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  Icon,
  
  useColorModeValue,
} from "@chakra-ui/react";
import { getCookie, setCookie } from "cookies-next";
import { FiBook, FiUser,FiHome, FiSettings, FiBookmark, FiBell } from "react-icons/fi";

const SidebarContent = () => {
  const LinkItems = [
    { name: "Dashboard", icon: FiHome, to: "/Dashboard" },
    { name: "LecturesTT", icon: FiBook, to: "/teacherLectureTT" },
    { name: "Lecture History", icon: FiBookmark, to: "/lecture_history" },
    { name: "Profile", icon: FiUser, to: "/teacher_profile" },
    { name: "Notification", icon: FiBell, to: "/TeacherNotification" },
  ];

  const [selectedNav, setSelectedNav] = useState("Dashboard");


  return (
    <Box
      bg="white"
      borderRight="1px solid #f0f0f0"
      w="16vw"
      h="100vh"
      pos="fixed"
      // borderRadius="20"
      className="shadow-md"
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
        <NavItem
          key={link.name}
          icon={link.icon}
          to={link.to}
          name={link.name}
          setSelectedNav={setSelectedNav}
          selectedNav={selectedNav}
        />
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, to, name, setSelectedNav, selectedNav }) => {
  return (
    <Link to={to}>
      <Box
        _hover={{
          bg: "#3652AD",
          color: "white",
        }}
        py="3"
        px="16"
        cursor="pointer"
        transition="background-color 0.3s"
        marginBottom="5"
        borderRadius="5%"
        onClick={() => setSelectedNav(name)}
        backgroundColor={selectedNav === name ? "#3652AD" : ""}
        textColor={selectedNav === name ? "#fff" : ""}
      >
        <Flex align="center">
          <Icon mr="2" fontSize="20" as={icon} /> {/* Adjust icon size */}
          <Text padding="8px" fontSize="18" ml="2">
            {name}
          </Text>{" "}
          {/* Adjust text size and add left margin */}
        </Flex>
      </Box>
    </Link>
  );
};

const SideBarTeacher = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!getCookie("token")) {
      navigate("/");
    }
  }, []);
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
