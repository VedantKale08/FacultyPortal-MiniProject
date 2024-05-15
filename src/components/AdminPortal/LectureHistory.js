import React, { useEffect, useState } from "react";
import { Box, Flex, Text, Button, Input, Select } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

const AdminLectureHistory = () => {
  const [showTeacherInfo, setShowTeacherInfo] = useState(Array(3).fill(false));
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState(""); // Define selectedDepartment
  const [selectedDate, setSelectedDate] = useState("");

  const [teachers, setTeachers] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/teachers/all_history");
      console.log(res.data);
      setTeachers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
      a.teacher.fname.localeCompare(b.teacher.fname)
    );
    setTeachers(sortedTeachers);
  };

  const sortTeachersByDepartment = () => {
    const sortedTeachers = [...teachers].sort((a, b) =>
      a.teacher.departmentName.localeCompare(b.teacher.departmentName)
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
      teacher.teacher.fname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.teacher.departmentName
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
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
        minWidth="1200px"
      >
        <Text
          fontSize="24px"
          fontWeight="bold"
          mb="50px"
          position="relative"
          textAlign={"center"}
        >
          Lectures History
        </Text>
        <div className="flex gap-8 my-8">
          <select
            placeholder="Sort by"
            variant="unstyled"
            borderRadius="md"
            borderColor="gray.300"
            fontSize="18px"
            mb="20px"
            value={sortBy}
            onChange={handleSortChange}
            px="15"
            py="4"
            border="1px solid lightgray"
            className="rounded-lg flex-1 bg-transparent border border-gray-300 px-4"
          >
            <option value="sortName">Sort by Name A-Z</option>
            <option value="sortBranch">Sort by Branch A-Z</option>
          </select>

          <select
            placeholder="Select Department"
            borderRadius="md"
            borderColor="gray.300"
            fontSize="18px"
            mb="20px"
            value={selectedDepartment}
            onChange={handleDepartmentChange}
            px="15"
            py="4"
            border="1px solid lightgray"
            className="rounded-lg flex-1 bg-transparent border border-gray-300 px-4"
          >
            <option value="">All Departments</option>
            {departments.map((department, index) => (
              <option key={index} value={department}>
                {department}
              </option>
            ))}
          </select>

          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            placeholderText="Select Date"
            dateFormat="yyyy-MM-dd"
            className="date-picker px-4 py-1 border border-gray-300 rounded-lg text-lg flex-1 bg-transparent"
          />

          <Input
            type="text"
            placeholder="Search for Teachers"
            borderRadius="md"
            borderColor="gray.300"
            fontSize="18px"
            value={searchTerm}
            onChange={handleSearch}
            px="15"
            py="4"
            border="1px solid lightgray"
            className="rounded-lg flex-1"
          />
        </div>

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
    p="20px"
  >
    <Flex align="center" justify="space-between">
      <Text fontSize="16px" fontWeight="bold">
        Prof. {teacher.teacher.fname} {teacher.teacher.lname} (
        {teacher.teacher.departmentName} Engineering)
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
      <SubjectsList lectureHistory={teacher.lectureHistory} />
    )}
  </Box>
);

const SubjectsList = ({ lectureHistory }) => (
  <Box>
    <Text fontSize="20px" fontWeight="bold" mb="10" textAlign="center">
      Subjects Taught
    </Text>
    <Flex flexWrap="wrap">
      {lectureHistory?.map((subject, index) => (
        <Box
          key={index}
          p={4}
          borderRadius="md"
          boxShadow="0 0 7px rgba(0, 0, 255, 0.5)"
          bg="white"
          color="black"
          mb={4}
          flex="1 0 calc(50% - 1rem)"
          marginRight="1rem"
        >
          <Text fontSize="16px" fontWeight="bold" mb="2">
            Subject: {subject.course}
          </Text>
          <Text fontSize="14px">Topic: {subject.topicsCovered[0]}</Text>
          <Text fontSize="14px">Attendees: {subject.attendance}</Text>
          <Text fontSize="14px">
            Date: {new Date(subject.createdAt).toLocaleDateString("en-GB")}
          </Text>
        </Box>
      ))}
    </Flex>
  </Box>
);

export default AdminLectureHistory;
