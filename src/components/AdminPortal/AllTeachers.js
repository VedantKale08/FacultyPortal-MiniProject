import React, { useEffect, useState } from "react";
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
import axios from 'axios'

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
  const [teachers, setTeachers] = useState([]);

  // const [teachers, setTeachers] = useState([
  //   {
  //     name: "Tukaram Shingade",
  //     department: "Computer Engineering",
  //     education: "Ph.D. in Computer Engineering",
  //     experience: "15 years",
  //     courses: ["Computer Networks", "Database Management Systems"],
  //     contact: {
  //       email: "tukaram.shingade@example.com",
  //     },
  //     img: "https://img.freepik.com/premium-photo/poised-indian-college-boy-tailored-formal-suit_878783-15102.jpg",
  //   },
  //   {
  //     name: "Sandeep Udmale",
  //     department: "Information Technology",
  //     education: "M.Tech. in Information Technology",
  //     experience: "12 years",
  //     courses: ["Web Development", "Software Engineering"],
  //     contact: {
  //       email: "sandeep.udmale@example.com",
  //     },
  //     img: "https://img.freepik.com/premium-photo/business-man-suit-white-transparent-background_457222-12059.jpg",
  //   },
  //   {
  //     name: "Vaibhav Dhore",
  //     department: "Computer Technology",
  //     education: "B.Tech. in Computer Technology",
  //     experience: "8 years",
  //     courses: ["Programming Fundamentals", "Object-Oriented Programming"],
  //     contact: {
  //       email: "vaibhav.dhore@example.com",
  //     },
  //     img: "https://img.freepik.com/free-photo/close-up-photo-young-successful-business-man-black-suit_171337-9509.jpg",
  //   },
  //   {
  //     name: "Shubham Patil",
  //     department: "Computer Engineering",
  //     education: "Ph.D. in Computer Science",
  //     experience: "10 years",
  //     courses: ["Data Structures", "Algorithms"],
  //     contact: {
  //       email: "shubham.patil@example.com",
  //     },
  //   },
  //   {
  //     name: "Priya Singh",
  //     department: "Electrical Engineering",
  //     education: "M.Tech. in Electrical Engineering",
  //     experience: "8 years",
  //     courses: ["Circuit Analysis", "Power Systems"],
  //     contact: {
  //       email: "priya.singh@example.com",
  //     },
  //   },
  //   {
  //     name: "Rahul Sharma",
  //     department: "Mechanical Engineering",
  //     education: "B.Tech. in Mechanical Engineering",
  //     experience: "15 years",
  //     courses: ["Thermodynamics", "Fluid Mechanics"],
  //     contact: {
  //       email: "rahul.sharma@example.com",
  //     },
  //   },
  //   {
  //     name: "Kiran Deshmukh",
  //     department: "Civil Engineering",
  //     education: "M.Tech. in Civil Engineering",
  //     experience: "12 years",
  //     courses: ["Structural Analysis", "Transportation Engineering"],
  //     contact: {
  //       email: "kiran.deshmukh@example.com",
  //     },
  //   },
  //   {
  //     name: "Neha Gupta",
  //     department: "Chemical Engineering",
  //     education: "Ph.D. in Chemical Engineering",
  //     experience: "9 years",
  //     courses: ["Chemical Reaction Engineering", "Process Control"],
  //     contact: {
  //       email: "neha.gupta@example.com",
  //     },
  //   },
  //   {
  //     name: "Akash Verma",
  //     department: "Aerospace Engineering",
  //     education: "B.Tech. in Aerospace Engineering",
  //     experience: "7 years",
  //     courses: ["Aerodynamics", "Flight Mechanics"],
  //     contact: {
  //       email: "akash.verma@example.com",
  //     },
  //   },
  // ]);

  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/teachers");
      console.log(res.data);
      setTeachers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const sortTeachersByName = () => {
    const sortedTeachers = [...teachers].sort((a, b) =>
      a.fname.localeCompare(b.fname)
    );
    setTeachers(sortedTeachers);
  };

  const sortTeachersByDepartment = () => {
    const sortedTeachers = [...teachers].sort((a, b) =>
      a.departmentName.localeCompare(b.departmentName)
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
      teacher.fname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.departmentName.toLowerCase().includes(searchTerm.toLowerCase())
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
          right="50px"
          w="250px" // Increased width to 250px
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
          px="15"
          py="4"
          backgroundColor="transparent"
          outline="none"
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
              <Text fontSize="16px" fontWeight="bold" className="px-6">
                Prof. {teacher.fname} {teacher.lname} ({teacher.departmentName})
              </Text>
              <Button
                onClick={() => toggleTeacherInfo(index)}
                bg="transparent"
                color="blue.500"
                fontSize="24px"
                fontWeight="bold"
                px="10"
                _hover={{
                  bg: "transparent",
                }}
              >
                {showTeacherInfo[index] ? "-" : "+"}
              </Button>
            </Flex>
            {showTeacherInfo[index] && (
              <div className="flex p-6">
                <div className="flex-1">
                  <Text fontSize="20px" mb="2" color="gray.600">
                    {teacher.bio}
                  </Text>
                  <Divider mb="6" />
                  <Box mb="6">
                    <Text fontSize="20px" fontWeight="bold" mb="2">
                      Profile Information
                    </Text>
                    <Text fontSize="20px">
                      Education: {teacher.qualifications}
                    </Text>
                    <Text fontSize="20px">Experience: 5 years</Text>
                  </Box>
                  <Divider mb="6" />
                  <Box mb="6">
                    <Text fontSize="20px" fontWeight="bold" mb="2">
                      Courses Taught
                    </Text>
                    {teacher?.subjects?.map((course, index) => (
                      <React.Fragment key={index}>
                        <Badge colorScheme="blue" fontSize="20px" mr="2" mb="2">
                          {course.course}
                        </Badge>
                        {index !== teacher.subjects.length - 1 && (
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
                    <Text fontSize="20px">Email: {teacher.email}</Text>
                  </Box>
                </div>
                {showTeacherInfo[index] && (
                  <img
                    src={teacher.photo}
                    alt={`${teacher.fname}'s Photo`}
                    style={{
                      // position: "absolute",
                      // top: "calc(15% + 10px)",
                      // right: "80px",
                      width: "200px",
                      height: "200px",
                      borderRadius: "8px",
                      boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
                    }}
                  />
                )}
              </div>
            )}
          </Box>
        ))}

        {/* {teachers.map((teacher, index) => ( */}
        {/* <Box
            key={index}
            mb="20px"
            position="relative" // Position relative to contain the absolute positioning of the image
            boxShadow="0 0 7px rgba(0, 0, 255, 0.5)" // Blue glowing border
            borderRadius="12px" // Curved border
            p="8px"
          >
            <Flex align="center" justify="space-between">
              <Text fontSize="16px" fontWeight="bold">
                Prof. {teacher.fname} {teacher.lname} ({teacher.departmentName})
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
                  <Text fontSize="20px">
                    Education: {teacher.qualifications}
                  </Text>
                  <Text fontSize="20px">Experience: 5 years </Text>
                </Box>
                <Divider mb="6" />
                <Box mb="6">
                  <Text fontSize="20px" fontWeight="bold" mb="2">
                    Courses Taught
                  </Text>
                  {teacher?.subjects?.map((course, index) => (
                    <React.Fragment key={index}>
                      <Badge colorScheme="blue" fontSize="20px" mr="2" mb="2">
                        {course.course}
                      </Badge>
                      {index !== teacher.subjects.length - 1 && (
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
                  <Text fontSize="20px">Email: {teacher.email}</Text>
                  Add more contact info if needed
                </Box>
                Conditionally render the image
                {showTeacherInfo[index] && (
                  <img
                    src={teacher.photo}
                    alt={`${teacher.fname}'s Photo`}
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
          </Box> */}
        {/* ))} */}
      </Box>
    </Flex>
  );
};

export default AllTeachers;
