import React, { useState } from "react";
import { Box, Flex, Text, Button, Input, Select } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const LectureHistory = () => {
  const [showTeacherInfo, setShowTeacherInfo] = useState(Array(3).fill(false));
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState(""); // Define selectedDepartment
  const [selectedDate, setSelectedDate] = useState("");

  const [teachers, setTeachers] = useState([
    {
      name: "Tukaram Shingade",
      department: "Computer Engineering",
      subjects: [
        {
          subject: "Web Development",
          topic: "Introduction to HTML",
          studentsPresent: 25,
          date: "2024-05-15",
        },
        {
          subject: "Database Management",
          topic: "SQL Queries",
          studentsPresent: 20,
          date: "2024-05-15",
        },
        {
          subject: "Web Development",
          topic: "Introduction to HTML",
          studentsPresent: 25,
          date: "2024-05-15",
        },
        {
          subject: "Database Management",
          topic: "SQL Queries",
          studentsPresent: 20,
          date: "2024-05-15",
        },
        {
          subject: "Web Development",
          topic: "Introduction to HTML",
          studentsPresent: 25,
          date: "2024-05-15",
        },
        {
          subject: "Database Management",
          topic: "SQL Queries",
          studentsPresent: 20,
          date: "2024-05-15",
        },
      ],
    },
    {
      name: "Sandeep Udmale",
      department: "Information Technology",
      subjects: [
        {
          subject: "Web Development",
          topic: "Introduction to HTML",
          studentsPresent: 25,
        },
        {
          subject: "Database Management",
          topic: "SQL Queries",
          studentsPresent: 20,
        },
      ],
    },
    {
      name: "Vaibhav Dhore",
      department: "Computer Technology",
      subjects: [
        {
          subject: "Web Development",
          topic: "Introduction to HTML",
          studentsPresent: 25,
        },
        {
          subject: "Database Management",
          topic: "SQL Queries",
          studentsPresent: 20,
        },
      ],
    },
    {
      name: "Shubham Patil",
      department: "Computer Engineering",
      subjects: [
        {
          subject: "Web Development",
          topic: "Introduction to HTML",
          studentsPresent: 25,
        },
        {
          subject: "Database Management",
          topic: "SQL Queries",
          studentsPresent: 20,
        },
      ],
    },
    {
      name: "Priya Singh",
      department: "Electrical Engineering",
      subjects: [
        {
          subject: "Web Development",
          topic: "Introduction to HTML",
          studentsPresent: 25,
        },
        {
          subject: "Database Management",
          topic: "SQL Queries",
          studentsPresent: 20,
        },
      ],
    },
    {
      name: "Rahul Sharma",
      department: "Mechanical Engineering",
      subjects: [
        {
          subject: "Web Development",
          topic: "Introduction to HTML",
          studentsPresent: 25,
        },
        {
          subject: "Database Management",
          topic: "SQL Queries",
          studentsPresent: 20,
        },
      ],
    },
    {
      name: "Kiran Deshmukh",
      department: "Civil Engineering",
      subjects: [
        {
          subject: "Web Development",
          topic: "Introduction to HTML",
          studentsPresent: 25,
        },
        {
          subject: "Database Management",
          topic: "SQL Queries",
          studentsPresent: 20,
        },
      ],
    },
    {
      name: "Neha Gupta",
      department: "Chemical Engineering",
      subjects: [
        {
          subject: "Web Development",
          topic: "Introduction to HTML",
          studentsPresent: 25,
        },
        {
          subject: "Database Management",
          topic: "SQL Queries",
          studentsPresent: 20,
        },
      ],
    },
    {
      name: "Akash Verma",
      department: "Aerospace Engineering",
      subjects: [
        {
          subject: "Web Development",
          topic: "Introduction to HTML",
          studentsPresent: 25,
        },
        {
          subject: "Database Management",
          topic: "SQL Queries",
          studentsPresent: 20,
        },
      ],
    },
  ]);

  const departments = [
    "Computer Engineering",
    "Electrical Engineering",
    "Information Technology",
    "Civil Engineering",
  ];

  const toggleTeacherInfo = (index) => {
    setShowTeacherInfo((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };
  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
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
  const sortTeachersByDate = () => {
    const sortedTeachers = teachers.map((teacher) => ({
      ...teacher,
      subjects: teacher.subjects
        .slice()
        .sort((a, b) => new Date(a.date) - new Date(b.date)),
    }));
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
          Lectures History
        </Text>
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
          mb="20px"
          value={sortBy}
          onChange={handleSortChange}
        >
          <option value="sortName">Sort by Name A-Z</option>
          <option value="sortBranch">Sort by Branch A-Z</option>
        </Select>

        <Select
          placeholder="Select Department"
          position="absolute"
          top="90px"
          left="230px"
          w="200px"
          borderRadius="md"
          borderColor="gray.300"
          fontSize="18px"
          mb="20px"
          value={selectedDepartment}
          onChange={handleDepartmentChange}
        >
          <option value="">All Departments</option>
          {departments.map((department, index) => (
            <option key={index} value={department}>
              {department}
            </option>
          ))}
        </Select>

        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          placeholderText="Select Date"
          position="absolute"
          top="90px"
          left="450px" // Adjusted left position
          w="200px"
          dateFormat="yyyy-MM-dd"
          className="date-picker"
        />

        <Input
          type="text"
          placeholder="Search for Teachers"
          position="absolute"
          top="90px"
          left="680px" // Adjusted left position
          w="250px"
          borderRadius="md"
          borderColor="gray.300"
          fontSize="18px"
          value={searchTerm}
          onChange={handleSearch}
        />

        {filteredTeachers.map((teacher, index) => (
          <TeacherCard
            key={index}
            teacher={teacher}
            index={index}
            showTeacherInfo={showTeacherInfo}
            toggleTeacherInfo={toggleTeacherInfo}
          />
        ))}
      </Box>
    </Flex>
  );
};

const TeacherCard = ({
  teacher,
  index,
  showTeacherInfo,
  toggleTeacherInfo,
}) => (
  <Box
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
    {showTeacherInfo[index] && <SubjectsList subjects={teacher.subjects} />}
  </Box>
);

const SubjectsList = ({ subjects }) => (
  <Box>
    <Text fontSize="20px" fontWeight="bold" mb="10" textAlign="center">
      Subjects Taught
    </Text>
    <Flex flexWrap="wrap">
      {subjects.map((subject, index) => (
        <Box
          key={index}
          p={4}
          borderRadius="md"
          boxShadow="0 0 7px rgba(0, 0, 255, 0.5)" // Blue glowing border
          bg="white" // Directly specify background color
          color="black" // Set text color
          mb={4}
          flex="1 0 calc(50% - 1rem)" // Adjust width as needed
          marginRight="1rem" // Add margin between boxes
        >
          <Text fontSize="16px" fontWeight="bold" mb="2">
            Subject: {subject.subject}
          </Text>
          <Text fontSize="14px">Topic: {subject.topic}</Text>
          <Text fontSize="14px">Attendees: {subject.studentsPresent}</Text>
        </Box>
      ))}
    </Flex>
  </Box>
);

export default LectureHistory;
