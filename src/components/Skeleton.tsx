import {
  Skeleton,
  Stack,
} from '@chakra-ui/react'

const CustomSkeleton = () => (
  <Stack>
    <Skeleton height="40px" />
    <Skeleton height="40px" />
    <Skeleton height="40px" />
  </Stack>
)

export default CustomSkeleton
