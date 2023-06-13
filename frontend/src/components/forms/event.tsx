import { Stack, Typography } from '@mui/material'
import {
  AutocompleteInput,
  Create,
  DateInput,
  Edit,
  RadioButtonGroupInput,
  ReferenceInput,
  regex,
  SimpleForm,
  TextInput,
  useGetList,
} from 'react-admin'

export const EventCreate = () => {
  const handleTransformValues = async ({ date: dateFieldValue, ...values }: Record<string, string>) => {
    return { ...values, date: new Date(dateFieldValue).toISOString() }
  }

  return (
    <Create sx={{ maxWidth: 600, width: '100%', mx: 'auto' }} transform={handleTransformValues}>
      <SimpleForm>
        <Stack sx={{ alignItems: 'stretch', width: '100%' }}>
          <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
            Create new Event
          </Typography>
          <TextInput source="name" name="name" />
          <TextInput source="description" name="description" multiline />
          <DateInput name="date" source="date" />
          <TextInput
            name="time"
            source="time"
            validate={regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/, 'Invalid time format')}
            helperText="Format: 21:00"
          />
          <TextInput name="location" source="location" />
          <ReferenceInput source="eventTypeId" reference="event/types">
            <AutocompleteInput optionText="name" optionValue="id" label="Event type" />
          </ReferenceInput>
          <ReferenceInput source="managerId" reference="manager">
            <AutocompleteInput optionValue="id" label="Manager Id" />
          </ReferenceInput>
        </Stack>
      </SimpleForm>
    </Create>
  )
}

const EditableFields = ['name', 'description', 'date', 'time', 'location', 'status', 'eventTypeId']

const handleTransformValues = async (values: Record<string, string>) =>
  Object.entries(values).reduce((acc, [key, value]) => {
    if (EditableFields.includes(key)) {
      if (key === 'date') {
        acc[key] = new Date(value).toISOString()
      } else {
        acc[key] = value
      }
    }
    return acc
  }, {} as any)

export const EventEdit = () => {
  const { data, isLoading } = useGetList('event/types')

  return (
    <Edit sx={{ width: 'fit-content', mx: 'auto' }} transform={handleTransformValues}>
      <SimpleForm>
        <TextInput source="name" name="name" />
        <DateInput name="date" source="date" />
        <TextInput
          name="time"
          source="time"
          validate={regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/, 'Invalid time format')}
          helperText="Format: 21:00"
        />
        <TextInput name="location" source="location" />
        <RadioButtonGroupInput
          source="status"
          choices={[
            { id: 'planned', name: 'planned' },
            { id: 'ongoing', name: 'ongoing' },
            { id: 'finished', name: 'finished' },
            { id: 'cancelled', name: 'cancelled' },
          ]}
          name="status"
        />
        <AutocompleteInput
          name="eventTypeId"
          source="eventTypeId"
          optionText="name"
          optionValue="id"
          choices={data}
          isLoading={isLoading}
        />
      </SimpleForm>
    </Edit>
  )
}
