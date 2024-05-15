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
import { StarIcon } from "@chakra-ui/icons";
import Rating from "@mui/material/Rating";

const FeedBack = () => {
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  // State for showing teacher information
  const [showTeacherInfo, setShowTeacherInfo] = useState(Array(3).fill(false));

  // Dummy teacher data
  const [teachers, setTeachers] = useState([
    {
      name: "Tukaram Shingade",
      department: "Computer Engineering",
      subjects: [
        { name: "Web Development", rating: 4 },
        { name: "Database Management", rating: 3 },
        // Add more subjects and ratings as needed
      ],
    },
    {
      name: "Sandeep Udmale",
      department: "Information Technology",
      subjects: [
        { name: "Web Development", rating: 5 },
        { name: "Database Management", rating: 4 },
      ],
    },
    {
      name: "Vaibhav Dhore",
      department: "Computer Technology",
      subjects: [
        { name: "Web Development", rating: 5 },
        { name: "Database Management", rating: 4.5 },
      ],
    },
  ]);
  const getPrecision = (rating) => {
    // Fix function parameter
    if (rating % 1 === 0) {
      return 1; // Return 1 if the rating is a whole number
    } else {
      return 0.5; // Return 0.5 if the rating is a decimal
    }
  };

  // Function to toggle teacher information display
  const toggleTeacherInfo = (index) => {
    setShowTeacherInfo((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

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
      flexWrap="wrap"
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
          Teachers FeedBack
        </Text>
        {/* Search input */}
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
        {/* Sort by select */}
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
        <Box display="flex" flexWrap="wrap">
          {filteredTeachers.map((teacher, index) => (
            <Box
              key={index}
              width={{ base: "100%", sm: "calc(100% / 3 - 20px)" }}
              mb="20px"
              mr="20px"
              boxShadow="0 0 7px rgba(0, 0, 255, 0.5)"
              borderRadius="12px"
              p="20px"
              height={{ base: "auto", sm: "300px" }} // Adjust the height as needed
            >
              {/* Teacher name */}
              <Text fontSize="16px" fontWeight="bold" mb="8px">
                {teacher.name}
              </Text>
              {/* Department */}
              <Text fontSize="14px" mb="8px">
                Department: {teacher.department}
              </Text>
              {/* Subjects and ratings */}
              {teacher.subjects.map((subject, subjectIndex) => (
                <Box
                  key={subjectIndex}
                  mb="8px"
                  display="flex"
                  flexDirection="column" // Render stars below the course name
                >
                  {/* Course name */}
                  <Text fontSize="14px" fontWeight="bold" mb="4px">
                    Course: {subject.name}
                  </Text>
                  {/* Rating stars */}
                  <Box display="flex">
                    {/* Render Rating component with dynamic precision */}
                    <Rating
                      key={subjectIndex}
                      name={`rating-${index}-${subjectIndex}`}
                      value={subject.rating}
                      precision={getPrecision(subject.rating)}
                      readOnly
                    />
                  </Box>
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </Flex>
  );
};
export default FeedBack;
