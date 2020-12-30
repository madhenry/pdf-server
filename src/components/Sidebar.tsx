import React from 'react'
import {
  Input,
  Stack,
  HStack,
  InputGroup,
  InputLeftAddon,
  IconButton,
  Select,
  Spacer,
} from '@chakra-ui/react'
import { DownloadIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import { useEditor } from 'src/components/EditorProvider'
import Skeleton from 'src/components/Skeleton'
import useSWR from 'swr'
import { allowedFiles } from 'utils/getFigmaFile'

const Sidebar = () => {
  const { file, setFile, texts, setTexts } = useEditor()
  const { isValidating, error, data: availableTexts } = useSWR(file && `/api/template?onlyFields=1&file=${file}`, { dedupingInterval: 30000 })

  const onFileEnter = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const input = event.target.value
    if (input.length) {
      const fileId = (input.includes('/file/') ? input.split('/file/')[1].split('/')[0] : input)
      setTexts({})
      setFile(fileId)
    } else {
      setFile(null)
    }
  }

  const onTextUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: input, name } = event.target
    setTexts({ ...texts, [name]: input })
  }

  const addonStyle = { width: '40%', minWidth: 200 }

  return (
    <Stack spacing={3}>
      <HStack>
        <IconButton aria-label="Search database" icon={<DownloadIcon />} />
        <Spacer />
        <IconButton aria-label="Open Figma file" icon={<ExternalLinkIcon />} />
      </HStack>
      <InputGroup>
        <InputLeftAddon children={'Figma File ID'} style={addonStyle} />
        {!allowedFiles.length && <Input defaultValue={file} placeholder="https://... or ID" onChange={onFileEnter} />}
        {allowedFiles.length && (
          <Select variant="filled" defaultValue={allowedFiles[0]} onChange={onFileEnter}>
            {allowedFiles.map((file, i) => (
              <option key={`file-${i}`} value={file}>{file}</option>
            ))}
          </Select>
        )}
      </InputGroup>
      {!error && availableTexts?.length && availableTexts.map(({ name, characters }: { name: string, characters: string }) => (
        <InputGroup>
          <InputLeftAddon children={name} style={addonStyle} />
          <Input variant="filled" name={name} placeholder={`${characters}`} onChange={onTextUpdate} />
        </InputGroup>
      ))}
      {isValidating && !error && !availableTexts && <Skeleton />}
    </Stack>
  )
}

export default Sidebar
