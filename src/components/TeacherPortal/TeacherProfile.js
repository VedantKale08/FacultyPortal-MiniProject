import React, { useState } from "react";
import { Box, Flex, Text, Divider, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input } from "@chakra-ui/react";
import SideBarTeacher from "./SideBarTeacher";

const TeacherProfile = () => {
  // Dummy teacher data
  const initialTeacherData = {
    name: "John Doe",
    subject: "Mathematics",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat.",
    education: "Ph.D. in Mathematics",
    contact: {
      email: "john.doe@example.com",
      // Add more contact info if needed
    },
  };

  const [isOpen, setIsOpen] = useState(false);
  const [teacherData, setTeacherData] = useState(initialTeacherData);

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTeacherData({
      ...teacherData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    // You can add code here to handle form submission, such as sending updated data to the server
    console.log("Updated teacher data:", teacherData);
    onClose(); // Close the modal after submission
  };

  return (
    <Flex>
      <SideBarTeacher />
      <Flex flex="1" justify="start" align="start" paddingTop="80px" marginLeft="280px">
        <Box
          bg="white"
          p="70px"
          boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px"
          border="1px solid lightgray"
          borderRadius="12px"
        >
          {/* Box containing teacher data */}
          <Text fontSize="24px" fontWeight="bold" mb="4">{teacherData.name}</Text>
          <Text fontSize="20px" mb="2" color="gray.600">{teacherData.subject}</Text>
          {/* <Text fontSize="20px" mb="4" color="gray.700">{teacherData.bio}</Text> */}
          <Divider mb="6" />
          <Box mb="6">
            <Text fontSize="20px" fontWeight="bold" mb="2">Profile Information</Text>
            <Text fontSize="20px">Qualifications: {teacherData.education}</Text>
          </Box>
          <Divider mb="6" />
          <Box>
            <Text fontSize="20px" fontWeight="bold" mb="2">Contact Information</Text>
            <Text fontSize="20px">Email: {teacherData.contact.email}</Text>
            {/* Add more contact info if needed */}
          </Box>
        </Box>
        {/* Edit Profile Button */}
        <Button
          bg="#3652AD"
          borderRadius="12%"
          color="white"
          padding="10"
          _hover={{ bg: "blue.600" }}
          position="absolute"
          bottom="20px"
          right="20px"
          onClick={onOpen}
        >
          Edit Profile
        </Button>
        {/* Edit Profile Modal */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent style={{backgroundColor:"#ffffff", maxWidth:"380px", marginLeft:"600px", border:"1px solid black", padding:"15px", borderRadius:"5%"}}>
            <ModalHeader style={{fontWeight:"bold", fontSize:"20px", marginBottom:"15px"}}>Edit Profile</ModalHeader>
            {/* <ModalCloseButton /> */}
            <ModalBody>
              <Input name="name" value={teacherData.name} onChange={handleInputChange} mb="4" placeholder="Name" style={{marginBottom:"10px"}}/>
              <Input name="subject" value={teacherData.subject} onChange={handleInputChange} mb="4" placeholder="Subject" style={{marginBottom:"10px"}} />
              {/* <Input name="bio" value={teacherData.bio} onChange={handleInputChange} mb="4" placeholder="Bio" /> */}
              <Input name="education" value={teacherData.education} onChange={handleInputChange} mb="4" placeholder="Education" style={{marginBottom:"10px"}} />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}  style={{backgroundColor:"#3652AD", color:"#ffffff", padding:"7px", borderRadius:"10%", marginRight:"10PX"}}>
                Close
              </Button>
              <Button variant="ghost" onClick={handleSubmit}  style={{backgroundColor:"#3652AD", color:"#ffffff", padding:"7px", borderRadius:"10%"}}>Save changes</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </Flex>
  );
};

export default TeacherProfile;
