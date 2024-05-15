import React, { useState } from "react";
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
import { EditIcon, AddIcon, DeleteIcon } from "@chakra-ui/icons"; // Import DeleteIcon

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
  const [lectures, setLectures] = useState([
    {
      subject: "Mathematics",
      program: "Computer Engineering",
      topicsCovered: ["Algebra", "Calculus"],
      attendance: 50,
    },
    {
      subject: "Physics",
      program: "Civil Engineering",
      topicsCovered: ["Mechanics", "Thermodynamics"],
      attendance: 45,
    },
    {
      subject: "Biology",
      program: "Biotechnology",
      topicsCovered: ["Cell Biology", "Genetics"],
      attendance: 40,
    },
    {
      subject: "Chemistry",
      program: "Chemical Engineering",
      topicsCovered: ["Organic Chemistry", "Inorganic Chemistry"],
      attendance: 55,
    },
    {
      subject: "Computer Science",
      program: "Computer Science",
      topicsCovered: ["Data Structures", "Algorithms"],
      attendance: 60,
    },
    {
      subject: "Electrical Engineering",
      program: "Electrical Engineering",
      topicsCovered: ["Circuit Analysis", "Electromagnetics"],
      attendance: 48,
    },
    {
      subject: "English",
      program: "Literature",
      topicsCovered: ["Poetry", "Fiction"],
      attendance: 42,
    },
    {
      subject: "History",
      program: "History",
      topicsCovered: ["Ancient History", "Modern History"],
      attendance: 38,
    },
    {
      subject: "Psychology",
      program: "Psychology",
      topicsCovered: ["Cognitive Psychology", "Developmental Psychology"],
      attendance: 47,
    },
    {
      subject: "Sociology",
      program: "Sociology",
      topicsCovered: ["Social Theory", "Cultural Studies"],
      attendance: 50,
    },
  ]);

  const handleEditClick = (lecture) => {
    setEditedSubject(lecture.subject);
    setEditedProgram(lecture.program);
    setEditedTopics(lecture.topicsCovered.join(", "));
    setEditedAttendance(lecture.attendance);
    setIsEditing(true);
  };

  const handleUpdate = () => {
    // Implement update logic here
    setIsEditing(false);
  };

  const handleDeleteClick = (index) => {
    const updatedLectures = lectures.filter((_, i) => i !== index);
    setLectures(updatedLectures);
  };

  const handleNewLectureSubmit = () => {
    const newLecture = {
      subject: newSubject,
      program: newProgram,
      topicsCovered: newTopics.split(", "),
      attendance: newAttendance,
    };
    setLectures([...lectures, newLecture]); // In a real app, you would send this to the server
    setIsNewLectureModalOpen(false);
  };

  return (
    <Flex direction="column" p="4" mt="8" ml="246px" pr="50px" pb="50px" style={{ marginTop: "50px" }}>
      <Box position="absolute" top="10px" right="10px">
        <IconButton
          aria-label="Add lecture"
          icon={<AddIcon style={{ backgroundColor: "#3652AD", color: "#ffffff", padding: "10px", fontSize: "40px", borderRadius: "50%", marginRight: "5px", marginTop: "5px" }} />}
          onClick={() => setIsNewLectureModalOpen(true)}
        />
      </Box>
      <div className="container" style={{ backgroundColor: "#ffffff", borderRadius: "2%", paddingRight: "50px" }}>
        <div style={{ paddingLeft: "40px", paddingRight: "40px", paddingBottom: "40px" }}>
          <Text fontSize="30px" fontWeight="bold" mb="4" align="center" padding="15px">
            Lecture History
          </Text>
          <Box overflowX="auto">
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
                    <Td borderWidth="1px" padding="20px">{index + 1}</Td>
                    <Td borderWidth="1px" padding="20px">{lecture.subject}</Td>
                    <Td borderWidth="1px" padding="20px">{lecture.program}</Td>
                    <Td borderWidth="1px" padding="20px">{lecture.topicsCovered.join(", ")}</Td>
                    <Td borderWidth="1px" padding="20px">{lecture.attendance}</Td>
                    <Td borderWidth="1px" padding="20px">
                      <IconButton
                        aria-label="Edit"
                        icon={<EditIcon style={{marginLeft:"8px"}} />}
                        onClick={() => handleEditClick(lecture)}
                        mr="2"
                      />
                      <IconButton
                        aria-label="Delete"
                        icon={<DeleteIcon style={{marginLeft:"10px"}} />}
                        onClick={() => handleDeleteClick(index)}
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
        <ModalContent marginLeft={500} style={{ backgroundColor: "white", marginRight: "600px", minHeight: "300px", fontSize: "20px", padding: "10px", border: "2px solid gray", borderRadius: "5%" }}>
          <ModalHeader style={{ fontWeight: "bold", padding: "10px" }}>Update History</ModalHeader>
          <ModalBody style={{ padding: "12px" }}>
            <Flex direction="column">
              <Input placeholder="Subject" value={editedSubject} onChange={(e) => setEditedSubject(e.target.value)} mb="4" />
              <Input placeholder="Program" value={editedProgram} onChange={(e) => setEditedProgram(e.target.value)} mb="4" />
              <Input placeholder="Topics Covered" value={editedTopics} onChange={(e) => setEditedTopics(e.target.value)} mb="4" />
              <Input placeholder="Attendance" type="number" value={editedAttendance} onChange={(e) => setEditedAttendance(e.target.value)} />
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleUpdate} style={{ backgroundColor: "#3652AD", color: "#ffffff", padding: "5px", borderRadius: "10%", marginRight: "15px", marginTop: "20px" }}>
              Update
            </Button>
            <Button onClick={() => setIsEditing(false)} style={{ backgroundColor: "#3652AD", color: "#ffffff", padding: "5px", borderRadius: "10%", marginRight: "15px", marginTop: "20px" }}> Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isNewLectureModalOpen} onClose={() => setIsNewLectureModalOpen(false)}>
        <ModalOverlay />
        <ModalContent marginLeft={500} style={{ backgroundColor: "white", marginRight: "600px", minHeight: "300px", fontSize: "20px", padding: "10px", border: "2px solid gray", borderRadius: "5%" }}>
          <ModalHeader style={{ fontWeight: "bold", padding: "10px" }}>Add New Lecture</ModalHeader>
          <ModalBody style={{ padding: "12px" }}>
            <Flex direction="column">
              <Input placeholder="Subject" style={{ marginBottom: "10px" }} value={newSubject} onChange={(e) => setNewSubject(e.target.value)} mb="4" />
              <Input placeholder="Program" style={{ marginBottom: "10px" }} value={newProgram} onChange={(e) => setNewProgram(e.target.value)} mb="4" />
              <Input placeholder="Topics Covered" style={{ marginBottom: "10px" }} value={newTopics} onChange={(e) => setNewTopics(e.target.value)} mb="4" />
              <Input placeholder="Attendance" type="number" value={newAttendance} onChange={(e) => setNewAttendance(e.target.value)} />
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleNewLectureSubmit} style={{ backgroundColor: "#3652AD", color: "#ffffff", padding: "7px", borderRadius: "10%", marginRight: "15px", marginTop: "20px" }}>
              Add
            </Button>
            <Button onClick={() => setIsNewLectureModalOpen(false)} style={{ backgroundColor: "#3652AD", color: "#ffffff", padding: "7px", borderRadius: "10%", marginRight: "15px", marginTop: "20px" }}> Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default LectureHistory;
