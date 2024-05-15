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
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  // State for showing teacher information
  const [showTeacherInfo, setShowTeacherInfo] = useState(Array(3).fill(false));

  // Dummy teacher data
  const [teachers, setTeachers] = useState([
    {
      name: "Tukaram Shingade",
      department: "Computer Engineering",
      courses: ["Web Development", "Database Management"],
      timetable: {
        Monday: ["", "", "", "Web Development", "", "", "", "", ""],
        Tuesday: ["", "Database Management", "", "", "", "", "", "", ""],
        Wednesday: ["", "", "", "", "", "", "Web Development", "", ""],
        Thursday: ["", "", "", "Database Management", "", "", "", "", ""],
        Friday: [
          "",
          "Web Development",
          "",
          "",
          "",
          "",
          "",
          "Database Management",
          "",
        ],
      },
    },
    {
      name: "Sandeep Udmale",
      department: "Information Technology",
      courses: ["Algorithms", "Data Structures"],
      timetable: {
        Monday: ["Algorithms", "", "", "", "", "", "", "", ""],
        Tuesday: ["", "", "", "", "Data Structures", "", "", "", ""],
        Wednesday: ["", "", "", "", "", "", "", "Algorithms", ""],
        Thursday: ["", "", "", "", "", "", "", "", ""],
        Friday: ["", "", "", "Data Structures", "", "", "", "", "Algorithms"],
      },
    },
    {
      name: "Vaibhav Dhore",
      department: "Computer Technology",
      courses: ["Operating Systems", "Network Security"],
      timetable: {
        Monday: [
          "",
          "Operating Systems",
          "Network Security",
          "",
          "",
          "",
          "",
          "",
          "",
        ],
        Tuesday: ["", "", "", "", "", "", "", "", ""],
        Wednesday: [
          "",
          "",
          "Operating Systems",
          "",
          "Network Security",
          "",
          "",
          "",
          "",
        ],
        Thursday: ["", "", "", "", "", "", "", "", ""],
        Friday: [
          "",
          "",
          "",
          "Network Security",
          "",
          "",
          "",
          "",
          "Operating Systems",
        ],
      },
    },
  ]);

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
          Lectures TimeTable
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
        {/* Teacher cards */}
        {filteredTeachers.map((teacher, index) => (
          <Box
            key={index}
            mb="20px"
            boxShadow="0 0 7px rgba(0, 0, 255, 0.5)" // Blue glowing border
            borderRadius="12px" // Curved border
            p="7px"
          >
            {/* Teacher name and department */}
            <Flex align="center" justify="space-between">
              <Text fontSize="16px" fontWeight="bold">
                {teacher.name} ({teacher.department})
              </Text>
              {/* Button to toggle teacher information */}
              <Button
                onClick={() => toggleTeacherInfo(index)}
                bg="transparent"
                color="blue.500"
                fontSize="25px"
                fontWeight="bold"
                _hover={{
                  bg: "transparent",
                }}
              >
                {showTeacherInfo[index] ? "-" : "+"}
              </Button>
            </Flex>
            {/* Teacher information */}
            {showTeacherInfo[index] && (
              <>
                {/* Other content */}
                {/* Table for displaying timetable */}
                <Box mt="5px">
                  <Text
                    fontSize="18px"
                    fontWeight="bold"
                    mb="2"
                    textAlign="center"
                  >
                    Timetable
                  </Text>
                  {/* Styling for the table */}
                  <Box overflowX="auto">
                    {/* Enable horizontal scrolling */}
                    <table
                      style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        borderRadius: "8px",
                        overflow: "hidden",
                        boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <thead>
                        {/* Headers */}
                        <tr>
                          <th
                            style={{
                              padding: "3px",
                              borderBottom: "1px solid #e2e8f0",
                              background: "#f0f4f8",
                              color: "#718096",
                              textTransform: "uppercase",
                              fontSize: "14px",
                            }}
                          >
                            Time
                          </th>
                          {Object.keys(teacher.timetable).map((day, index) => (
                            <th
                              key={index}
                              style={{
                                padding: "3px",
                                borderBottom: "1px solid #e2e8f0",
                                background: "#f0f4f8",
                                color: "#718096",
                                textTransform: "uppercase",
                                fontSize: "14px",
                              }}
                            >
                              {day}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {/* Timetable rows */}
                        {[...Array(9)].map((_, rowIndex) => {
                          const hour = rowIndex + 9; // Start from 9 AM
                          if (hour <= 17) {
                            // Render rows only until 5 PM
                            const displayHour =
                              hour <= 12
                                ? `${hour}:00 AM`
                                : `${hour - 12}:00 PM`;
                            return (
                              <tr key={rowIndex}>
                                <td
                                  style={{
                                    padding: "3px",
                                    border: "1px solid #e2e8f0",
                                    background: "#f7fafc",
                                    color: "#4a5568",
                                    fontWeight: "bold",
                                    fontSize: "14px",
                                  }}
                                >
                                  {displayHour}
                                </td>
                                {Object.values(teacher.timetable).map(
                                  (courses, index) => (
                                    <td
                                      key={index}
                                      style={{
                                        padding: "3px",
                                        border: "1px solid #e2e8f0",
                                        background: "#ffffff",
                                        color: "#4a5568",
                                        fontSize: "14px",
                                      }}
                                    >
                                      {courses[rowIndex]}
                                    </td>
                                  )
                                )}
                              </tr>
                            );
                          } else {
                            return null;
                          }
                        })}
                      </tbody>
                    </table>
                  </Box>
                </Box>
              </>
            )}
          </Box>
        ))}
      </Box>
    </Flex>
  );
};
export default AllTeachers;
