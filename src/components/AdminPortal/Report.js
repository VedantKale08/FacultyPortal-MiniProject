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
      setShowTextBox(true);
    } else {
      setShowTextBox(false);
    }
  };

  const handleSendCopyChange = () => {
    setSendCopy(!sendCopy);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Your form submission logic goes here
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
            type="email"
            mb="4"
            variant="filled"
            id="email"
            placeholder="Enter the body of the message"
            value={email}
            onChange={handleEmailChange}
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
              Whom would you like to send the message?
            </FormLabel>
            <RadioGroup defaultValue="no" onChange={handleRadioChange}>
              <Box mb="2">
                <Radio value="yes">Yes</Radio>
              </Box>
              <Box mb="2">
                <Radio value="no">No</Radio>
              </Box>
            </RadioGroup>
            <FormHelperText>
              Choose "Yes" to display a small text box.
            </FormHelperText>
          </FormControl>
          {showTextBox && (
            <Box mt="4" mb="20" textAlign="center">
              {/* Display a small text box when "Yes" is clicked */}
              <text>enter the email-id of teachers </text>
              <Input
                type="text"
                placeholder="Enter the Email Id"
                width="200px"
              />
            </Box>
          )}
          {!showTextBox && (
            <Box mt="4" mb="20" textAlign="center">
              {/* Display a small text box when "Yes" is clicked */}
              <Text>This message will be send to all the teachers</Text>
            </Box>
          )}
          <Box mb="4" textAlign="center">
            <input
              type="checkbox"
              id="sendCopy"
              checked={sendCopy}
              onChange={handleSendCopyChange}
            />
            <label htmlFor="sendCopy">Send me a copy of this message</label>
          </Box>

          <Button
            type="submit"
            mb="4"
            mt="20"
            colorScheme="blue"
            width="100%"
            fontSize="xl" // Set the font size to extra large
            py="4" // Set padding on the y-axis to increase height
            bg="blue.500" // Set background color to blue
            _hover={{ bg: "blue.600" }} // Change background color on hover
            _active={{ bg: "blue.700" }} // Change background color on active state
          >
            Submit
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default Report;
