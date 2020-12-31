import React, { useState } from 'react'
import {
  Input,
  Stack,
  HStack,
  InputGroup,
  InputLeftAddon,
  IconButton,
  Select,
  Link,
} from '@chakra-ui/react'
import { DownloadIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import { useEditor, EditorValues } from 'src/components/EditorProvider'
import Skeleton from 'src/components/Skeleton'
import useSWR from 'swr'
import { allowedFiles } from 'utils/getFigmaFile'

const Sidebar = () => {
  const { file, setFile, template, texts, setTexts }: EditorValues = useEditor()
  const { isValidating, error, data: availableTexts } = useSWR(file ? `/api/template?onlyFields=1&file=${file}` : null, { dedupingInterval: 30000 })
  const [fileName, setFilename] = useState('download.pdf')

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

  const onFilenameUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilename(event.target.value)
  }

  const addonStyle = { width: '40%', minWidth: 200 }
  
  const vars = Object.keys(texts).map(key => `${key}=${texts[key]}`)
  const embedLink = `/api/PDF?file=${file}&${encodeURI(vars.join('&'))}`
  const downloadLink = `${embedLink}&fileName=${fileName}`

  return (
    <Stack spacing={3}>
      <HStack>
        <Link href={downloadLink} isExternal>
          <IconButton aria-label="Search database" icon={<DownloadIcon />} />
        </Link>
        <InputGroup key={`fileName`}>
          <InputLeftAddon children="Filename" />
          <Input variant="filled" defaultValue={fileName} onChange={onFilenameUpdate} />
        </InputGroup>
        <Link href={embedLink} isExternal>
          <IconButton aria-label="Open Figma file" icon={<ExternalLinkIcon />} />
        </Link>
      </HStack>
      <InputGroup>
        <InputLeftAddon children={'Figma File ID'} style={addonStyle} />
        {!allowedFiles.length && <Input defaultValue={file} placeholder="https://... or ID" onChange={onFileEnter} />}
        {allowedFiles.length && (
          <Select variant="filled" defaultValue={allowedFiles[0]} onChange={onFileEnter}>
            {allowedFiles.map((fileId, i) => (
              <option key={`file-${i}`} value={fileId}>{file === fileId ? template?.name : fileId}</option>
            ))}
          </Select>
        )}
      </InputGroup>
      {!error && availableTexts?.length && availableTexts.map(({ name, characters }: { name: string, characters: string }) => (
        <InputGroup key={`input-${name}`}>
          <InputLeftAddon children={name} style={addonStyle} />
          <Input variant="filled" defaultValue={texts?.[name]} name={name} placeholder={`${characters}`} onChange={onTextUpdate} />
        </InputGroup>
      ))}
      {isValidating && !error && !availableTexts && <Skeleton />}
    </Stack>
  )
}

export default Sidebar
