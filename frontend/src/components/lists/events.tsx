import {
  ChipField,
  Datagrid,
  DateField,
  DeleteWithConfirmButton,
  EditButton,
  InfiniteList,
  SearchInput,
  TextField,
} from 'react-admin'

const eventFilters = [<SearchInput key="name" source="name" alwaysOn name="name" />]

const EventList = () => {
  return (
    <InfiniteList filters={eventFilters} hasShow hasCreate hasEdit>
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="id" />
        <TextField source="name" sortable />
        <DateField source="date" sortable showDate locales="en" />
        <TextField source="time" />
        <TextField source="location" sortable />
        <ChipField source="status" sortable />
        <TextField source="managerId" label="Manager Id" />
        <TextField source="eventType.name" label="Event type" />
        <DateField source="createdAt" showDate locales="en" />
        <DateField source="updatedAt" showDate locales="en" />
        <EditButton />
        <DeleteWithConfirmButton />
      </Datagrid>
    </InfiniteList>
  )
}

export default EventList
