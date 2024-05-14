import React from "react";
import { Box, Flex, Text, Divider, Badge, Button, Heading } from "@chakra-ui/react";
import SideBarTeacher from "./SideBarTeacher";

const TeacherProfile = () => {
  // Dummy teacher data
  const teacher = {
    name: "John Doe",
    subject: "Mathematics",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat.",
    education: "Ph.D. in Mathematics",
    experience: "10 years",
    courses: ["Algebra 101", "Calculus Fundamentals"],
    contact: {
      email: "john.doe@example.com",
      // Add more contact info if needed
    },
  };

  return (
    <Flex>
      <SideBarTeacher />
      <Flex flex="1" justify="start" align="start" paddingTop="80px" marginLeft="280px">
        <Box
          bg="white"
          p="70px"
          boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px"
          border="1px solid lightgray"
          borderRadius="12px"
        >
          {/* Box containing teacher data */}
          <Text fontSize="24px" fontWeight="bold" mb="4">{teacher.name}</Text>
          <Text fontSize="20px" mb="2" color="gray.600">{teacher.subject}</Text>
          <Text fontSize="20px" mb="4" color="gray.700">{teacher.bio}</Text>
          <Divider mb="6" />
          <Box mb="6">
            <Text fontSize="20px" fontWeight="bold" mb="2">Profile Information</Text>
            <Text fontSize="20px">Education: {teacher.education}</Text>
            <Text fontSize="20px">Experience: {teacher.experience}</Text>
          </Box>
          <Divider mb="6" />
          <Box mb="6">
            <Text fontSize="20px" fontWeight="bold" mb="2">Courses Taught</Text>
            {teacher.courses.map((course, index) => (
              <Badge key={index} colorScheme="blue" fontSize="20px" mr="2" mb="2">{course}</Badge>
            ))}
          </Box>
          <Divider mb="6" />
          <Box>
            <Text fontSize="20px" fontWeight="bold" mb="2">Contact Information</Text>
            <Text fontSize="20px">Email: {teacher.contact.email}</Text>
            {/* Add more contact info if needed */}
          </Box>
        </Box>
        {/* Edit Profile Button */}
        <Button
          bg="#3652AD"
          borderRadius="12%"
          color="white"
          padding="10"
          _hover={{ bg: "blue.600" }}
          position="absolute"
          bottom="20px"
          right="20px"
        >
          Edit Profile
        </Button>
      </Flex>
    </Flex>
  );
};

export default TeacherProfile;
