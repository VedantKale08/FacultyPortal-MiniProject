import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCookie, setCookie } from "cookies-next";
import { Box, Flex, Text, Icon, useColorModeValue } from "@chakra-ui/react";
import {
  FiBook,
  FiUser,
  FiHome,
  FiSettings,
  FiBookmark,
  FiInfo,
} from "react-icons/fi";
import { LogOut } from "lucide-react";

const SidebarContent = () => {
  const LinkItems = [
    { name: "Dashboard", icon: FiHome, to: "/AdminDashboard" },
    { name: "All Teachers", icon: FiUser, to: "/AllTeachers" },
    { name: "LecturesTT", icon: FiBook, to: "/LecturesTT" },
    { name: "Lecture History", icon: FiBookmark, to: "/AdminLectureHistory" },
    { name: "FeedBacks", icon: FiHome, to: "/FeedBack" },
    { name: "Report", icon: FiInfo, to: "/Report" },
  ];
  const [selectedNav, setSelectedNav] = useState("Dashboard");
  const navigate = useNavigate();

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
          Admin Portal
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
      <Box
        _hover={{
          bg: "red",
          color: "white",
        }}
        py="3"
        px="16"
        cursor="pointer"
        transition="background-color 0.3s"
        marginBottom="5"
        borderRadius="5%"
        textColor="red"
        onClick={() => {
          setCookie("token","");
          setCookie("is_admin",false);
          navigate("/")
          
        }}
      >
        <Flex align="center">
          <Icon mr="2" fontSize="20" as={LogOut} /> {/* Adjust icon size */}
          <Text padding="8px" fontSize="18" ml="2">
            Logout
          </Text>{" "}
          {/* Adjust text size and add left margin */}
        </Flex>
      </Box>
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

const SideBarAdmin = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!getCookie("token")) {
      navigate("/");
    }
    if (getCookie("is_admin") === "false") {
      navigate("/dashboard");
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

export default SideBarAdmin;
