import React, { useState, useContext, createContext } from "react";
import { Box, Button, FormControl, FormLabel, Input, VStack, Text, Image, useToast } from "@chakra-ui/react";
import { FaCamera, FaSave, FaSearch } from "react-icons/fa";

// Create a context for the KYC data
const KYCContext = createContext();

// Component to provide KYC data context
const KYCProvider = ({ children }) => {
  const [kycData, setKycData] = useState(null);

  const saveData = (data) => {
    setKycData(data);
  };

  const getData = () => {
    return kycData;
  };

  return <KYCContext.Provider value={{ saveData, getData }}>{children}</KYCContext.Provider>;
};

const Index = () => {
  const { saveData, getData } = useContext(KYCContext);
  const [formData, setFormData] = useState({
    fullName: "",
    idNumber: "",
    selfie: 'https://images.unsplash.com/photo-1514582086679-4024becf927e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxzZWxmaWV8ZW58MHx8fHwxNzA4OTQzNDc1fDA&ixlib=rb-4.0.3&q=80&w=1080',
  });
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    saveData(formData);
    toast({
      title: "Information saved.",
      description: "We've saved your KYC data.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleCheckStatus = () => {
    const data = getData();
    if (data) {
      toast({
        title: "KYC Status",
        description: "KYC data found. Name: " + data.fullName,
        status: "info",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "KYC Status",
        description: "No KYC data found.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <KYCProvider>
      <Box p={5}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Full Name</FormLabel>
            <Input placeholder="Enter your full name" name="fullName" onChange={handleChange} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>ID Number</FormLabel>
            <Input placeholder="Enter your ID number" name="idNumber" onChange={handleChange} />
          </FormControl>
          <Box textAlign="center">
            <Text mb={2}>Selfie</Text>
            <Button leftIcon={<FaCamera />}>Take a selfie</Button>
          </Box>
          <Image src={formData.selfie} alt="Selfie" borderRadius="full" boxSize="100px" objectFit="cover" mt={3} />
          <Button leftIcon={<FaSave />} colorScheme="blue" onClick={handleSave}>
            Save KYC Data
          </Button>
          <Button leftIcon={<FaSearch />} colorScheme="green" onClick={handleCheckStatus}>
            Check KYC Status
          </Button>
        </VStack>
      </Box>
    </KYCProvider>
  );
};

export default Index;
