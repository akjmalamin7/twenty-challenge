import { Container } from "@/shared/ui";
import { BlockStack, Box, Divider, Text } from "@/shared/uiLibrary/components";
import { Form } from "./ui";

const DemoForm = () => {
  return (
    <Container size="xs">
      <BlockStack>
        <Box>
          <Text as="h4" weight="semibold" >Create Form</Text>
          <Divider />
        </Box>
        <Box className="mt-4">
          <Form />
        </Box>
      </BlockStack>
    </Container>
  );
};
export default DemoForm;