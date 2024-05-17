import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@chakra-ui/react";
import { EditIcon, AddIcon, DeleteIcon } from "@chakra-ui/icons";
import axios from "axios";
import { getCookie } from "cookies-next";

const LectureHistory = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedSubject, setEditedSubject] = useState("");
  const [editedProgram, setEditedProgram] = useState("");
  const [editedTopics, setEditedTopics] = useState("");
  const [editedAttendance, setEditedAttendance] = useState(0);
  const [isNewLectureModalOpen, setIsNewLectureModalOpen] = useState(false);
  const [newSubject, setNewSubject] = useState("");
  const [newProgram, setNewProgram] = useState("");
  const [newTopics, setNewTopics] = useState("");
  const [newAttendance, setNewAttendance] = useState(0);
  const [lec, setlec] = useState();

  const [lectures, setLectures] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/teachers/history", {
        headers:{
          Authorization: "Bearer " + getCookie('token')
        }
      });
      setLectures(res.data.lectureHistory);
      setlec(res.data.teacher.subjects)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleEditClick = (lecture) => {
    setEditedSubject(lecture._id);
    setEditedProgram(lecture.program);
    setEditedTopics(lecture.topicsCovered.join(", "));
    setEditedAttendance(lecture.attendance);
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    try {
       const newLecture = {
         topicsCovered: editedTopics.split(", "),
         attendance: editedAttendance,
       };
      const res = await axios.put(
        "http://localhost:3001/api/lecturehistory/" + editedSubject,
        newLecture,
        {
          headers:{
            Authorization:"Bearer " +getCookie("token")
          }
        }
      );
      setLectures(res.data.data);
      setNewTopics("")
      setNewAttendance(0)
    } catch (error) {
      console.log(error);
    }
    setIsEditing(false);
  };

  const handleDeleteClick = async (lecture) => {
     try {
      const res = await axios.delete(
        "http://localhost:3001/api/lecturehistory/" + lecture._id,
        {
          headers: {
            Authorization: "Bearer " + getCookie("token"),
          },
        }
      );
      setLectures(res.data.data);
      setNewTopics("")
      setNewAttendance(0)
    } catch (error) {
      console.log(error);
    }
  };

  const handleNewLectureSubmit = async () => {
    const newLecture = {
      topicsCovered: newTopics.split(", "),
      attendance: newAttendance,
    };

    try {
          const res = await axios.put(
            "http://localhost:3001/api/teachers/lectures/" + newSubject,
            newLecture,
            {
              headers:{
                Authorization:"Bearer " +getCookie("token")
              }
            }
          );
          setLectures([...lectures, res.data.lectureHistory]);
          setNewTopics("")
          setNewAttendance(0)
        } catch (error) {
          console.log(error);
        }
    setIsNewLectureModalOpen(false);
  };

  return (
    <Flex
      direction="column"
      p="4"
      mt="8"
      ml="246px"
      pr="50px"
      pb="50px"
      style={{ marginTop: "50px" }}
    >
      <Box position="absolute" bottom="20px" right="10px">
        <Button
          variant="ghost"
          onClick={() => setIsNewLectureModalOpen(true)}
          style={{
            backgroundColor: "#3652AD",
            color: "#ffffff",
            padding: "7px",
            borderRadius: "10%",
          }}
        >
          Add new Lecture
        </Button>
      </Box>
      <div
        className="container"
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "2%",
          paddingRight: "50px",
        }}
      >
        <div
          style={{
            paddingLeft: "40px",
            paddingRight: "40px",
            paddingBottom: "40px",
          }}
        >
          <Text
            fontSize="30px"
            fontWeight="bold"
            mb="4"
            align="center"
            padding="15px"
          >
            Lecture History
          </Text>
          <Box overflowX="auto" className="flex justify-center">
            <Table variant="simple" fontSize="20px">
              <Thead>
                <Tr>
                  <Th borderWidth="1px" padding="20px">
                    No.
                  </Th>
                  <Th borderWidth="1px" padding="20px">
                    Subject
                  </Th>
                  <Th borderWidth="1px" padding="20px">
                    Program
                  </Th>
                  <Th borderWidth="1px" padding="20px">
                    Topics Covered
                  </Th>
                  <Th borderWidth="1px" padding="20px">
                    Attendance
                  </Th>
                  <Th borderWidth="1px" padding="20px">
                    Actions
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {lectures.map((lecture, index) => (
                  <Tr key={index}>
                    <Td borderWidth="1px" padding="20px">
                      {index + 1}
                    </Td>
                    <Td borderWidth="1px" padding="20px">
                      {lecture.course}
                    </Td>
                    <Td borderWidth="1px" padding="20px">
                      {lecture.program}
                    </Td>
                    <Td borderWidth="1px" padding="20px">
                      {lecture.topicsCovered.join(", ")}
                    </Td>
                    <Td borderWidth="1px" padding="20px">
                      {lecture.attendance}
                    </Td>
                    <Td borderWidth="1px" padding="20px">
                      <IconButton
                        aria-label="Edit"
                        icon={<EditIcon style={{ marginLeft: "8px" }} />}
                        onClick={() => handleEditClick(lecture)}
                        mr="2"
                      />
                      <IconButton
                        aria-label="Delete"
                        icon={<DeleteIcon style={{ marginLeft: "10px" }} />}
                        onClick={() => handleDeleteClick(lecture)}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </div>
      </div>
      <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
        <ModalOverlay />
        <ModalContent
          marginLeft={500}
          style={{
            backgroundColor: "white",
            marginRight: "600px",
            minHeight: "300px",
            fontSize: "20px",
            padding: "10px",
            border: "2px solid gray",
            borderRadius: "5%",
          }}
        >
          <ModalHeader style={{ fontWeight: "bold", padding: "10px" }}>
            Update History
          </ModalHeader>
          <ModalBody style={{ padding: "12px" }}>
            <Flex direction="column">
              <select
                onChange={(e) => setNewSubject(e.target.value)}
                className="border border-gray-300 px-4 py-2 rounded-lg mb-2 bg-transparent"
              >
                <option disabled selected>
                  Select
                </option>
                {lec?.map((data) => {
                  return (
                    <option key={data._id} value={data._id}>
                      {data.course}
                    </option>
                  );
                })}
              </select>
              <Input
                placeholder="Topics Covered"
                value={editedTopics}
                onChange={(e) => setEditedTopics(e.target.value)}
                mb="4"
                className="border border-gray-300 px-4 py-2 rounded-lg"
              />
              <Input
                placeholder="Attendance"
                type="number"
                value={editedAttendance}
                onChange={(e) => setEditedAttendance(e.target.value)}
                className="border border-gray-300 px-4 py-2 rounded-lg"
              />
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleUpdate}
              style={{
                backgroundColor: "#3652AD",
                color: "#ffffff",
                padding: "5px",
                borderRadius: "10%",
                marginRight: "15px",
                marginTop: "20px",
              }}
            >
              Update
            </Button>
            <Button
              onClick={() => setIsEditing(false)}
              style={{
                backgroundColor: "#3652AD",
                color: "#ffffff",
                padding: "5px",
                borderRadius: "10%",
                marginRight: "15px",
                marginTop: "20px",
              }}
            >
              {" "}
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isNewLectureModalOpen}
        onClose={() => setIsNewLectureModalOpen(false)}
      >
        <ModalOverlay />
        <ModalContent
          marginLeft={500}
          style={{
            backgroundColor: "white",
            marginRight: "600px",
            minHeight: "300px",
            fontSize: "20px",
            padding: "10px",
            border: "2px solid gray",
            borderRadius: "5%",
          }}
        >
          <ModalHeader style={{ fontWeight: "bold", padding: "10px" }}>
            Add New Lecture
          </ModalHeader>
          <ModalBody style={{ padding: "12px" }}>
            <Flex direction="column">
              <select
                onChange={(e) => setNewSubject(e.target.value)}
                className="border border-gray-300 px-4 py-2 rounded-lg mb-4 bg-transparent"
              >
                <option disabled selected>
                  Select
                </option>
                {lec?.map((data) => {
                  return (
                    <option key={data._id} value={data._id}>
                      {data.course}
                    </option>
                  );
                })}
              </select>
              <Input
                placeholder="Topics Covered"
                style={{ marginBottom: "10px" }}
                value={newTopics}
                onChange={(e) => setNewTopics(e.target.value)}
                mb="4"
                className="border border-gray-300 px-4 py-2 rounded-lg"
              />
              <Input
                placeholder="Attendance"
                type="number"
                value={newAttendance}
                onChange={(e) => setNewAttendance(e.target.value)}
                className="border border-gray-300 px-4 py-2 rounded-lg"
              />
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleNewLectureSubmit}
              style={{
                backgroundColor: "#3652AD",
                color: "#ffffff",
                padding: "7px",
                borderRadius: "10%",
                marginRight: "15px",
                marginTop: "20px",
              }}
            >
              Add
            </Button>
            <Button
              onClick={() => setIsNewLectureModalOpen(false)}
              style={{
                backgroundColor: "#3652AD",
                color: "#ffffff",
                padding: "7px",
                borderRadius: "10%",
                marginRight: "15px",
                marginTop: "20px",
              }}
            >
              {" "}
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default LectureHistory;
