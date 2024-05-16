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
import {getCookie} from "cookies-next";

const AdminDashboard = () => {
  const [numberOfTeachers, setnumberOfTeachers] = useState(0);
  const [numberOfClasses, setNumberOfClasses] = useState(0);
  const [teacherAttendance, setTeacherAttendance] = useState(0);

   const getData = async () => {
     try {
       const res = await axios.get(
         "http://localhost:3001/api/admin_dashboard",
         {
           headers: {
             Authorization: "Bearer " + getCookie("token"),
           },
         }
       );
       setnumberOfTeachers(res.data.totalTeachers);
       setNumberOfClasses(res.data.totalLectures);
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
      ml={{ base: 0, md: 60 }}
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
        Welcome to Admin's Dashboard
      </Heading>
      <Flex justify="space-around" gap="80" mx="50">
        {/* Display total number of students */}
        <Box
          p={6}
          // boxShadow="md"
          bg={useColorModeValue("white", "gray.700")}
          className="rounded-xl"
          boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px"
          flex="1"
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
                fontSize="5xl"
                color="blue.500"
                mb={4}
                flexShrink={0}
              >
                <FiUsers fontSize={25} />
              </Box>
              <StatLabel fontSize="20px">Total Teachers</StatLabel>
              <StatNumber fontSize="20px">{numberOfTeachers}</StatNumber>
            </Flex>
          </Stat>
        </Box>
        {/* Display teacher's attendance */}
        <Box
          p={6}
          // boxShadow="md"
          bg={useColorModeValue("white", "gray.700")}
          className="rounded-xl"
          boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px"
          flex="1"
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
                fontSize="5xl"
                color="green.500"
                mb={4}
                flexShrink={0}
              >
                <FiCheckCircle fontSize={20} />
              </Box>
              <StatLabel fontSize="20px">Avg. student's Attendance</StatLabel>
              <StatNumber fontSize="20px">{teacherAttendance}</StatNumber>
            </Flex>
          </Stat>
        </Box>
        {/* Display total number of classes */}
        <Box
          p={6}
          // boxShadow="md"
          bg={useColorModeValue("white", "gray.700")}
          className="rounded-xl"
          boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px"
          flex="1"
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

export default AdminDashboard;
