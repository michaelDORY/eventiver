import {
  ChipField,
  Datagrid,
  InfiniteList,
  ReferenceManyField,
  SearchInput,
  SingleFieldList,
  TextField,
} from 'react-admin'

const eventFilters = [<SearchInput key="name" source="name" alwaysOn name="name" />]

const ManagerList = () => {
  return (
    <InfiniteList filters={eventFilters} hasShow>
      <Datagrid bulkActionButtons={false}>
        <TextField source="user.name" sortable />
        <TextField source="phone" />
        <TextField source="rating" sortable />
        <TextField source="info" />
        <ReferenceManyField label="Events" reference="event" target="managerId">
          <SingleFieldList>
            <ChipField source="name" />
          </SingleFieldList>
        </ReferenceManyField>
      </Datagrid>
    </InfiniteList>
  )
}

export default ManagerList
