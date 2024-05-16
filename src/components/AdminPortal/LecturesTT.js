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
import axios from "axios";
import { getCookie } from "cookies-next";

const AllTeachers = () => {
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showTeacherInfo, setShowTeacherInfo] = useState(Array(3).fill(false));
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const [teachers, setTeachers] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/teachers");
      setTeachers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const toggleTeacherInfo = (index) => {
    setShowTeacherInfo((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };
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

  const getTimeSlots = () => {
    let timeSlots = [];
    for (let i = 9; i <= 15; i++) {
      const startTime = i.toString().padStart(2, "0") + ":00";
      const endTime = (i + 1).toString().padStart(2, "0") + ":00";
      timeSlots.push({ time: `${startTime} - ${endTime}` });
    }
    return timeSlots;
  };

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
          left="360px"
          position="relative"
        >
          Lectures TimeTable
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
        <Divider mb="20"/>
        {filteredTeachers.map((teacher, index) => (
          <Box
            key={index}
            mb="20px"
            boxShadow="0 0 7px rgba(0, 0, 255, 0.5)" 
            borderRadius="12px"
            p="20px"
          >
            <Flex align="center" justify="space-between">
              <Text fontSize="16px" fontWeight="bold">
                Prof. {teacher.fname} {teacher.lname} ({teacher.departmentName}{" "}
                Engineering)
              </Text>
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
            {showTeacherInfo[index] && (
              <div className="flex justify-center">
                <Box mt="5px">
                  <Text
                    fontSize="18px"
                    fontWeight="bold"
                    mb="2"
                    textAlign="center"
                  >
                    Timetable
                  </Text>
                  <table
                    style={{
                      borderCollapse: "collapse",
                      marginLeft: "60px",
                      marginTop: "25px",
                    }}
                    className="mb-10"
                  >
                    <thead>
                      <tr>
                        <th
                          style={{
                            border: "1px solid black",
                            padding: "8px",
                          }}
                        >
                          Time
                        </th>
                        {daysOfWeek.map((day) => (
                          <th
                            key={day}
                            style={{
                              border: "1px solid black",
                              padding: "8px",
                            }}
                          >
                            {day}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {getTimeSlots().map((timeSlot, timeIndex) => (
                        <tr
                          key={timeIndex}
                          style={{ border: "1px solid black" }}
                        >
                          <td
                            style={{
                              border: "1px solid black",
                              padding: "8px",
                            }}
                          >
                            {timeSlot.time}
                          </td>
                          {daysOfWeek.map((day, dayIndex) => {
                            const lecture = teacher.subjects.find(
                              (item) =>
                                item.timeSlot.weekday === day &&
                                parseFloat(item.timeSlot.startTime) <=
                                  timeIndex + 9 &&
                                parseFloat(item.timeSlot.endTime) >
                                  timeIndex + 9
                            );
                            return (
                              <td
                                key={timeIndex + "-" + dayIndex}
                                style={{
                                  border: "1px solid black",
                                  padding: "8px",
                                }}
                              >
                                {lecture ? lecture.course : "-"}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Box>
              </div>
            )}
          </Box>
        ))}
      </Box>
    </Flex>
  );
};
export default AllTeachers;
