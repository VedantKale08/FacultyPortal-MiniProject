import React, { useEffect, useState } from "react";
import { Box, Flex, Text, Divider, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input } from "@chakra-ui/react";
import SideBarTeacher from "./SideBarTeacher";
import axios from "axios";
import {getCookie} from "cookies-next";

const TeacherProfile = () => {

  const [userData, setUserData] = useState([]);
  const getData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3001/api/teachers/profile",
        {
          headers: {
            Authorization: "Bearer " + getCookie("token"),
          },
        }
      );
      setUserData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
          const res = await axios.put(
            "http://localhost:3001/api/teachers/profile",
            userData,
            {
              headers: {
                Authorization: "Bearer " + getCookie("token"),
              },
            }
          );
        } catch (error) {
          console.log(error);
        }
    onClose();
  };

  return (
    <Flex>
      <Flex
        flex="1"
        justify="start"
        align="start"
        paddingTop="80px"
        marginLeft="280px"
      >
        <Box
          bg="white"
          p="25px"
          boxShadow="rgba(54, 82, 173, 0.4) 0px 4px 12px"
          border="1px solid lightgray"
          borderRadius="12px"
          className="flex gap-28"
        >
          <div>
            <Text fontSize="24px" fontWeight="bold" mb="4">
              Prof. {userData.fname} {userData.lname}
            </Text>
            <Divider mb="15" />
            <Box mb="6">
              <Text fontSize="20px" fontWeight="bold" mb="2">
                Profile Information
              </Text>
              <Text fontSize="20px">
                Qualifications: {userData.qualifications}
              </Text>
              <Text fontSize="20px">Experience: 5 years</Text>
              <Text fontSize="20px">Department: {userData.departmentName}</Text>
            </Box>
            <Divider mb="15" />
            <Box>
              <Text fontSize="20px" fontWeight="bold" mb="2">
                Contact Information
              </Text>
              <Text fontSize="20px">Email: {userData.email}</Text>
              <Text fontSize="20px">Phone Number: {userData.phoneNumber}</Text>
            </Box>
          </div>
          <img
            src={userData.photo}
            alt="image"
            className="w-52 object-cover h-52"
          ></img>
        </Box>
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
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay className="relative bg-black bg-opacity-65" />
          <ModalContent
            style={{
              backgroundColor: "#ffffff",
              maxWidth: "40vw",
              border: "1px solid black",
              padding: "30px",
              borderRadius: "10px",
            }}
            className="absolute top-32 left-[30%]"
          >
            <ModalHeader
              style={{
                fontWeight: "bold",
                fontSize: "20px",
                marginBottom: "15px",
              }}
            >
              Edit Profile
            </ModalHeader>
            <ModalBody>
              <Input
                name="fname"
                value={userData.fname}
                onChange={handleInputChange}
                mb="4"
                placeholder="First Name"
                style={{ marginBottom: "10px" }}
                className="border border-gray-300 px-4 py-2 rounded-lg w-full"
              />
              <Input
                name="lname"
                value={userData.lname}
                onChange={handleInputChange}
                mb="4"
                placeholder="Last Name"
                style={{ marginBottom: "10px" }}
                className="border border-gray-300 px-4 py-2 rounded-lg w-full"
              />
              <Input
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                mb="4"
                placeholder="Email"
                style={{ marginBottom: "10px" }}
                className="border border-gray-300 px-4 py-2 rounded-lg w-full"
              />
              <Input
                name="phoneNumber"
                value={userData.phoneNumber}
                onChange={handleInputChange}
                mb="4"
                placeholder="Phone Number"
                style={{ marginBottom: "10px" }}
                className="border border-gray-300 px-4 py-2 rounded-lg w-full"
              />
              <Input
                name="departmentName"
                value={userData.departmentName}
                onChange={handleInputChange}
                mb="4"
                placeholder="Department"
                style={{ marginBottom: "10px" }}
                className="border border-gray-300 px-4 py-2 rounded-lg w-full"
              />
              <Input
                name="qualifications"
                value={userData.qualifications}
                onChange={handleInputChange}
                mb="4"
                placeholder="Qualifications"
                style={{ marginBottom: "10px" }}
                className="border border-gray-300 px-4 py-2 rounded-lg w-full"
              />
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={onClose}
                style={{
                  backgroundColor: "#3652AD",
                  color: "#ffffff",
                  padding: "7px",
                  borderRadius: "10%",
                  marginRight: "10PX",
                }}
              >
                Close
              </Button>
              <Button
                variant="ghost"
                onClick={handleSubmit}
                style={{
                  backgroundColor: "#3652AD",
                  color: "#ffffff",
                  padding: "7px",
                  borderRadius: "10%",
                }}
              >
                Save changes
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </Flex>
  );
};

export default TeacherProfile;
