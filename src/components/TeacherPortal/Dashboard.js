import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiUsers, FiCalendar, FiCheckCircle } from "react-icons/fi";
import axios from "axios";
import { getCookie, getCookies } from "cookies-next";

const Dashboard = () => {
  const [numberOfStudents, setNumberOfStudents] = useState(0);
  const [numberOfClasses, setNumberOfClasses] = useState(0);
  const [teacherAttendance, setTeacherAttendance] = useState(0);

  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/dashboard", {
        headers: {
          Authorization: "Bearer " + getCookie("token"),
        },
      });
      setNumberOfStudents(res.data.totalStudents);
      setNumberOfClasses(res.data.totalClasses);
      setTeacherAttendance(res.data.avgAttendance);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box
      p={8}
      bg="gray.100"
      minHeight="100vh"
      marginLeft="240px"
    >
      <Heading
        as="h1"
        p={50}
        mb={8}
        mt={8}
        textAlign="center"
        fontSize="35px"
        fontWeight="bold"
      >
        Welcome to Teacher's Dashboard
      </Heading>
      <Flex justify="space-around" gap="80" mx="50">
        <Box
          p={6}
          bg="white"
          boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px"
          flex="1"
          className="rounded-xl"
        >
          <Stat>
            <Flex
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              padding="20px"
            >
              <Box
                as="span"
                fontSize="20px"
                color="black"
                mb={4}
                flexShrink={0}
              >
                <FiUsers fontSize={25} />
              </Box>
              <StatLabel fontSize="20px">Total Students</StatLabel>
              <StatNumber fontSize="20px">{numberOfStudents}</StatNumber>
            </Flex>
          </Stat>
        </Box>
        <Box
          p={6}
          bg="white"
          boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px"
          flex="1"
          className="rounded-xl"
        >
          <Stat>
            <Flex
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              padding="20px"
            >
              <Box
                as="span"
                fontSize="20px"
                color="black"
                mb={4}
                flexShrink={0}
              >
                <FiCheckCircle fontSize={20} />
              </Box>
              <StatLabel fontSize="20px">Avg Student's Attendance</StatLabel>
              <StatNumber fontSize="20px">{teacherAttendance ? teacherAttendance : 0}</StatNumber>
            </Flex>
          </Stat>
        </Box>
        <Box
          p={6}
          bg="white"
          boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px"
          flex="1"
          className="rounded-xl"
        >
          <Stat>
            <Flex
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              padding="20px"
            >
              <Box
                as="span"
                fontSize="20px"
                color="purple.500"
                mb={4}
                flexShrink={0}
              >
                <FiCalendar fontSize={20} />
              </Box>
              <StatLabel fontSize="20px">Total Classes</StatLabel>
              <StatNumber fontSize="20px">{numberOfClasses}</StatNumber>
            </Flex>
          </Stat>
        </Box>
      </Flex>
    </Box>
  );
};

export default Dashboard;
