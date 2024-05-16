import React, { useState } from "react";
import {
  Flex,
  Box,
  Text,
  Input,
  Select,
  Button,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@chakra-ui/react";
import { MDBInput, MDBCheckbox, MDBBtn } from "mdb-react-ui-kit";
import axios from "axios";
import { getCookie } from "cookies-next";
import toast from "react-hot-toast";

const Report = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sendCopy, setSendCopy] = useState(true);
  const [showTextBox, setShowTextBox] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleRadioChange = (value) => {
    if (value === "yes") {
      setShowTextBox(false);
      setEmail("");
    } else {
      setShowTextBox(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(showTextBox && !email) {
      toast.error("Please enter your email address")
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:3001/api/message",
        {
          to_all:!showTextBox,
          teacher_email:email,
          subject:name,
          message:message
        },
      );
      toast.success(res.data.message)
      setEmail("")
      setName("")
      setMessage("")
    } catch (error) {
      console.log(error);      
      toast.error("Something went wrong!")
    }
  };
  return (
    <Flex
      flex="1"
      justify="center"
      align="center"
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
          mb="20px"
          left="505px"
          position="relative" // Added position to make use of left prop
        >
          Report
        </Text>

        <form onSubmit={handleSubmit}>
          <Input
            mb="4"
            variant="filled"
            id="name"
            placeholder="Enter Subject of the message"
            value={name}
            onChange={handleNameChange}
            display="block"
            textAlign="center"
            align="center"
            justifyContent="center"
            mx="auto"
            fontSize="lg"
            borderColor="blue.400"
            boxShadow="0 0 0 3px rgba(66, 153, 225, 0.6)"
            borderRadius="5px"
            width="800px" // Set the width to 300 pixels
            height="40px"
            mb={15}
          />
          <Input
            type="text"
            mb="4"
            variant="filled"
            id="email"
            placeholder="Enter the body of the message"
            value={message}
            onChange={handleMessageChange}
            display="block"
            textAlign="center"
            align="center"
            justifyContent="center"
            mx="auto"
            fontSize="lg"
            borderColor="blue.400"
            boxShadow="0 0 0 3px rgba(66, 153, 225, 0.6)"
            borderRadius="5px"
            width="800px" // Set the width to 300 pixels
            height="100px"
            mb={5}
          />
          <FormControl as="fieldser" mx="auto" textAlign="center">
            <FormLabel as="legend" mb="2" textAlign="center">
              Do you want to send this message to all teachers?
            </FormLabel>
            <RadioGroup
              defaultValue="no"
              onChange={handleRadioChange}
              className="flex gap-2 justify-center"
            >
              <Box
                mb="2"
                className="bg-[#3652AD] px-2 py-1 text-white rounded-xl w-[60px]"
              >
                <Radio value="yes">Yes</Radio>
              </Box>
              <Box
                mb="2"
                className="bg-[#3652AD] px-2 py-1 text-white rounded-xl w-[60px]"
              >
                <Radio value="no">No</Radio>
              </Box>
            </RadioGroup>
            <FormHelperText>
              Choose "No" to display a small text box.
            </FormHelperText>
          </FormControl>
          {showTextBox && (
            <Box
              mt="4"
              mb="20"
              textAlign="center"
              className="flex flex-col justify-center items-center"
            >
              {/* Display a small text box when "Yes" is clicked */}
              <text>Enter the email-id of teachers </text>
              <Input
                type="text"
                placeholder="Enter the Email Id"
                width="200px"
                className="border border-gray-300 px-4 py-2 rounded-lg"
                value={email}
                onChange={handleEmailChange}
              />
            </Box>
          )}
          {!showTextBox && (
            <Box mt="4" mb="20" textAlign="center">
              {/* Display a small text box when "Yes" is clicked */}
              <Text>Else this message will be send to all the teachers</Text>
            </Box>
          )}

          <div className="flex justify-center">
            <Button
              type="submit"
              mb="4"
              mt="10"
              colorScheme="blue"
              fontSize="xl"
              py="4"
              bg="blue.500"
              _hover={{ bg: "blue.600" }}
              _active={{ bg: "blue.700" }}
              className="bg-[#3652AD] px-10 py-3 text-white rounded-xl w-fit"
            >
              Submit
            </Button>
          </div>
        </form>
      </Box>
    </Flex>
  );
};

export default Report;
