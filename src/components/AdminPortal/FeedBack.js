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
  const [showTeacherInfo, setShowTeacherInfo] = useState(Array(3).fill(false));

  const [teachers, setTeachers] = useState([
    {
      name: "Tukaram Shingade",
      department: "Computer Engineering",
      subjects: [
        { name: "Web Development", rating: 4 },
        { name: "Database Management", rating: 3 },
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
    if (rating % 1 === 0) {
      return 1;
    } else {
      return 0.5;
    }
  };

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
        minWidth="1200px"
      >
        <Text
          fontSize="24px"
          fontWeight="bold"
          mb="50px"
          left="360px"
          position="relative"
        >
          Teachers FeedBack
        </Text>
        <Input
          type="text"
          placeholder="Search for Teachers"
          position="absolute"
          top="90px"
          right="50px"
          w="250px"
          borderRadius="md"
          borderColor="gray.300"
          fontSize="18px"
          value={searchTerm}
          onChange={handleSearch}
          px="15"
          py="4"
          border="1px solid lightgray"
          className="rounded-lg"
        />
        <select
          placeholder="Sort by"
          backgroundColor="transparent"
          outline="none"
          value={sortBy}
          onChange={handleSortChange}
          className="border border-gray-200 bg-transparent rounded-lg px-4 py-2 absolute top-[90px] left-[50px]"
        >
          <option value="sortName">Sort by Name A-Z</option>
          <option value="sortBranch">Sort by Branch A-Z</option>
        </select>
        <Box display="flex" flexWrap="wrap" >
          {filteredTeachers.map((teacher, index) => (
            <Box
              key={index}
              width={{ base: "100%", sm: "calc(100% / 3 - 20px)" }}
              mb="20px"
              mr="20px"
              boxShadow="0 0 7px rgba(0, 0, 255, 0.5)"
              borderRadius="12px"
              p="20px"
              height={{ base: "auto", sm: "300px" }}
            >
              <Text fontSize="16px" fontWeight="bold" mb="8px">
                {teacher.name}
              </Text>
              <Text fontSize="14px" mb="8px">
                Department: {teacher.department}
              </Text>
              {teacher.subjects.map((subject, subjectIndex) => (
                <Box
                  key={subjectIndex}
                  mb="8px"
                  display="flex"
                  flexDirection="column"
                >
                  <Text fontSize="14px" fontWeight="bold" mb="4px">
                    Course: {subject.name}
                  </Text>
                  <Box display="flex">
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
