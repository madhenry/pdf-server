import {
  Flex,
  Box,
} from '@chakra-ui/react'
import { DarkModeSwitch } from 'src/components/DarkModeSwitch'
import { EditorProvider } from 'src/components/EditorProvider'
import Sidebar from 'src/components/Sidebar'
import Preview from 'src/components/Preview'

const Index = () => (
  <EditorProvider>
    <Flex h="100vh">
      <Box w="30%" p={10} style={{ overflowY: 'scroll' }}>
        <Sidebar />
        <DarkModeSwitch />
      </Box>
      <Box flex="1" bg="black">
        <Preview />
      </Box>
    </Flex>
  </EditorProvider>
)

export default Index
