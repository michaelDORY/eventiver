import { ChipField, DateField, Labeled, ReferenceField, Show, SimpleShowLayout, TextField } from 'react-admin'
import { Stack, Typography } from '@mui/material'

const EventShow = () => {
  return (
    <Show sx={{ width: 'fit-content', mx: 'auto' }}>
      <SimpleShowLayout>
        <TextField source="name" variant="h4" sx={{ display: 'block', textAlign: 'center' }} sortable label={false} />
        <DateField source="date" sortable showDate locales="en" />
        <TextField source="time" />
        <TextField source="location" sortable />
        <ChipField source="status" sortable />
        <TextField source="eventType.name" label="Event type" />
        <DateField source="createdAt" showDate locales="en" />
        <DateField source="updatedAt" showDate locales="en" />
        <ReferenceField
          reference="manager"
          source="managerId"
          label={false}
          link={(record, reference) => `/${reference}/${record.id}/show`}
        >
          <Typography variant="body1" sx={{ fontWeight: 'bold' }} component="div">
            Manager
          </Typography>
          <Stack direction="row" gap={3}>
            <Labeled label="Id">
              <TextField source="id" />
            </Labeled>
            <Labeled label="Name">
              <TextField source="user.name" />
            </Labeled>
            <Labeled label="Email">
              <TextField source="user.email" />
            </Labeled>
            <Labeled label="Phone">
              <TextField source="phone" />
            </Labeled>
          </Stack>
        </ReferenceField>
      </SimpleShowLayout>
    </Show>
  )
}

export default EventShow
