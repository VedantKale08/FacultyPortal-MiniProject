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

const Dashboard = () => {
  const [numberOfStudents, setNumberOfStudents] = useState(0);
  const [numberOfClasses, setNumberOfClasses] = useState(0);
  const [teacherAttendance, setTeacherAttendance] = useState(0); // Assume this data is fetched from an API

  useEffect(() => {
    // Fetch data for the Teacher's Dashboard
    // For example, you might fetch the number of students, classes, and teacher attendance
  }, []);

  return (
    <Box p={8} ml={{ base: 0, md: 60 }} bg="gray.100" minHeight="100vh" marginLeft="240px">
      <Heading as="h1" p={50} mb={8} mt={8} textAlign="center" fontSize="35px" fontWeight="bold">
        Welcome to Teacher's Dashboard
      </Heading>
      <Flex justify="space-around">
        {/* Display total number of students */}
        <Box p={6} borderRadius="xl" boxShadow="md" bg={useColorModeValue("white", "gray.700")} borderRadius="10%" boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px">
          <Stat>
            <Flex
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              padding="20px" 
            >
              <Box
                as="span"
                fontSize="5xl"
                color="blue.500"
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
        {/* Display teacher's attendance */}
        <Box p={6} borderRadius="10%" boxShadow="md" bg={useColorModeValue("white", "gray.700")} borderRadius="10%" boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px">
          <Stat>
            <Flex
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              padding="20px"
            >
              <Box
                as="span"
                fontSize="5xl"
                color="green.500"
                mb={4}
                flexShrink={0}
              >
                <FiCheckCircle fontSize={20} />
              </Box>
              <StatLabel fontSize="20px">Teacher's Attendance</StatLabel>
              <StatNumber fontSize="20px">{teacherAttendance}%</StatNumber>
            </Flex>
          </Stat>
        </Box>
        {/* Display total number of classes */}
        <Box p={6} borderRadius="10%" boxShadow="md" bg={useColorModeValue("white", "gray.700")} borderRadius="10%" boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px">
          <Stat>
            <Flex
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              padding="20px"
            >
              <Box
                as="span"
                fontSize="5xl"
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
