import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Divider,
  Badge,
  Button,
  Input,
  Select,
} from "@chakra-ui/react";

const AllTeachers = () => {
  const [showTeacherInfo, setShowTeacherInfo] = useState(Array(3).fill(false));
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const toggleTeacherInfo = (index) => {
    setShowTeacherInfo((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  // Dummy teacher data
  const [teachers, setTeachers] = useState([
    {
      name: "Tukaram Shingade",
      department: "Computer Engineering",
      education: "Ph.D. in Computer Engineering",
      experience: "15 years",
      courses: ["Computer Networks", "Database Management Systems"],
      contact: {
        email: "tukaram.shingade@example.com",
      },
      img: "https://img.freepik.com/premium-photo/poised-indian-college-boy-tailored-formal-suit_878783-15102.jpg",
    },
    {
      name: "Sandeep Udmale",
      department: "Information Technology",
      education: "M.Tech. in Information Technology",
      experience: "12 years",
      courses: ["Web Development", "Software Engineering"],
      contact: {
        email: "sandeep.udmale@example.com",
      },
      img: "https://img.freepik.com/premium-photo/business-man-suit-white-transparent-background_457222-12059.jpg",
    },
    {
      name: "Vaibhav Dhore",
      department: "Computer Technology",
      education: "B.Tech. in Computer Technology",
      experience: "8 years",
      courses: ["Programming Fundamentals", "Object-Oriented Programming"],
      contact: {
        email: "vaibhav.dhore@example.com",
      },
      img: "https://img.freepik.com/free-photo/close-up-photo-young-successful-business-man-black-suit_171337-9509.jpg",
    },
    {
      name: "Shubham Patil",
      department: "Computer Engineering",
      education: "Ph.D. in Computer Science",
      experience: "10 years",
      courses: ["Data Structures", "Algorithms"],
      contact: {
        email: "shubham.patil@example.com",
      },
    },
    {
      name: "Priya Singh",
      department: "Electrical Engineering",
      education: "M.Tech. in Electrical Engineering",
      experience: "8 years",
      courses: ["Circuit Analysis", "Power Systems"],
      contact: {
        email: "priya.singh@example.com",
      },
    },
    {
      name: "Rahul Sharma",
      department: "Mechanical Engineering",
      education: "B.Tech. in Mechanical Engineering",
      experience: "15 years",
      courses: ["Thermodynamics", "Fluid Mechanics"],
      contact: {
        email: "rahul.sharma@example.com",
      },
    },
    {
      name: "Kiran Deshmukh",
      department: "Civil Engineering",
      education: "M.Tech. in Civil Engineering",
      experience: "12 years",
      courses: ["Structural Analysis", "Transportation Engineering"],
      contact: {
        email: "kiran.deshmukh@example.com",
      },
    },
    {
      name: "Neha Gupta",
      department: "Chemical Engineering",
      education: "Ph.D. in Chemical Engineering",
      experience: "9 years",
      courses: ["Chemical Reaction Engineering", "Process Control"],
      contact: {
        email: "neha.gupta@example.com",
      },
    },
    {
      name: "Akash Verma",
      department: "Aerospace Engineering",
      education: "B.Tech. in Aerospace Engineering",
      experience: "7 years",
      courses: ["Aerodynamics", "Flight Mechanics"],
      contact: {
        email: "akash.verma@example.com",
      },
    },
  ]);

  const sortTeachersByName = () => {
    const sortedTeachers = [...teachers].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setTeachers(sortedTeachers);
  };

  const sortTeachersByDepartment = () => {
    const sortedTeachers = [...teachers].sort((a, b) =>
      a.department.localeCompare(b.department)
    );
    setTeachers(sortedTeachers);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    if (e.target.value === "sortName") {
      sortTeachersByName();
    } else if (e.target.value === "sortBranch") {
      sortTeachersByDepartment();
    }
  };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.department.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <Flex
      flex="1"
      justify="start"
      align="start"
      paddingTop="20px"
      marginLeft="260px"
    >
      <Box
        bg="white"
        p="50px"
        boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px"
        border="1px solid lightgray"
        borderRadius="12px"
        position="relative"
        minWidth="1200px" // Minimum width for the box
      >
        <Text
          fontSize="24px"
          fontWeight="bold"
          mb="50px"
          left="360px"
          position="relative" // Added position to make use of left prop
        >
          Teachers in the Institute
        </Text>
        <Input
          type="text"
          placeholder="Search for Teachers"
          position="absolute"
          top="90px"
          right="20px"
          w="250px" // Increased width to 250px
          borderRadius="md"
          borderColor="gray.300"
          fontSize="18px"
          value={searchTerm}
          onChange={handleSearch}
        />
        <Select
          placeholder="Sort by"
          position="absolute"
          top="90px"
          left="50px"
          w="150px"
          variant="unstyled"
          borderRadius="md"
          borderColor="gray.300"
          fontSize="18px"
          mb="50px"
          value={sortBy}
          onChange={handleSortChange}
        >
          <option value="sortName">Sort by Name A-Z</option>
          <option value="sortBranch">Sort by Branch A-Z</option>
        </Select>
        {filteredTeachers.map((teacher, index) => (
          <Box
            key={index}
            mb="20px"
            boxShadow="0 0 7px rgba(0, 0, 255, 0.5)" // Blue glowing border
            borderRadius="12px" // Curved border
            p="8px"
          >
            <Flex align="center" justify="space-between">
              <Text fontSize="16px" fontWeight="bold">
                {teacher.name} ({teacher.department})
              </Text>
              <Button
                onClick={() => toggleTeacherInfo(index)}
                bg="transparent"
                color="blue.500"
                fontSize="24px"
                fontWeight="bold"
                _hover={{
                  bg: "transparent",
                }}
              >
                {showTeacherInfo[index] ? "-" : "+"}
              </Button>
            </Flex>
            {showTeacherInfo[index] && (
              <>
                <Text fontSize="20px" mb="2" color="gray.600">
                  {teacher.bio}
                </Text>
                <Divider mb="6" />
                <Box mb="6">
                  <Text fontSize="20px" fontWeight="bold" mb="2">
                    Profile Information
                  </Text>
                  <Text fontSize="20px">Education: {teacher.education}</Text>
                  <Text fontSize="20px">Experience: {teacher.experience}</Text>
                </Box>
                <Divider mb="6" />
                <Box mb="6">
                  <Text fontSize="20px" fontWeight="bold" mb="2">
                    Courses Taught
                  </Text>
                  {teacher.courses.map((course, index) => (
                    <React.Fragment key={index}>
                      <Badge colorScheme="blue" fontSize="20px" mr="2" mb="2">
                        {course}
                      </Badge>
                      {index !== teacher.courses.length - 1 && (
                        <Text as="span" fontSize="20px" fontWeight="bold">
                          ,{" "}
                        </Text>
                      )}
                    </React.Fragment>
                  ))}
                </Box>
                <Divider mb="6" />
                <Box>
                  <Text fontSize="20px" fontWeight="bold" mb="2">
                    Contact Information
                  </Text>
                  <Text fontSize="20px">Email: {teacher.contact.email}</Text>
                </Box>
              </>
            )}
          </Box>
        ))}

        {teachers.map((teacher, index) => (
          <Box
            key={index}
            mb="20px"
            position="relative" // Position relative to contain the absolute positioning of the image
            boxShadow="0 0 7px rgba(0, 0, 255, 0.5)" // Blue glowing border
            borderRadius="12px" // Curved border
            p="8px"
          >
            <Flex align="center" justify="space-between">
              <Text fontSize="16px" fontWeight="bold">
                {teacher.name} ({teacher.department})
              </Text>
              <Button
                onClick={() => toggleTeacherInfo(index)}
                bg="transparent"
                color="blue.500"
                fontSize="24px"
                fontWeight="bold"
                _hover={{
                  bg: "transparent",
                }}
              >
                {showTeacherInfo[index] ? "-" : "+"}
              </Button>
            </Flex>
            {showTeacherInfo[index] && (
              <>
                <Text fontSize="20px" mb="2" color="gray.600">
                  {teacher.bio}
                </Text>
                <Divider mb="6" />
                <Box mb="6">
                  <Text fontSize="20px" fontWeight="bold" mb="2">
                    Profile Information
                  </Text>
                  <Text fontSize="20px">Education: {teacher.education}</Text>
                  <Text fontSize="20px">Experience: {teacher.experience}</Text>
                </Box>
                <Divider mb="6" />
                <Box mb="6">
                  <Text fontSize="20px" fontWeight="bold" mb="2">
                    Courses Taught
                  </Text>
                  {teacher.courses.map((course, index) => (
                    <React.Fragment key={index}>
                      <Badge colorScheme="blue" fontSize="20px" mr="2" mb="2">
                        {course}
                      </Badge>
                      {index !== teacher.courses.length - 1 && (
                        <Text as="span" fontSize="20px" fontWeight="bold">
                          ,{" "}
                        </Text>
                      )}
                    </React.Fragment>
                  ))}
                </Box>
                <Divider mb="6" />
                <Box>
                  <Text fontSize="20px" fontWeight="bold" mb="2">
                    Contact Information
                  </Text>
                  <Text fontSize="20px">Email: {teacher.contact.email}</Text>
                  {/* Add more contact info if needed */}
                </Box>
                {/* Conditionally render the image */}
                {showTeacherInfo[index] && (
                  <img
                    src={teacher.img}
                    alt={`${teacher.name}'s Photo`}
                    style={{
                      position: "absolute",
                      top: "calc(15% + 10px)", // Position the image below the teacher's information
                      right: "80px", // Add padding from the right border
                      width: "200px",
                      height: "200px",
                      borderRadius: "8px",
                      boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)", // Optional: Add a shadow to the image
                    }}
                  />
                )}
              </>
            )}
          </Box>
        ))}
      </Box>
    </Flex>
  );
};

export default AllTeachers;
