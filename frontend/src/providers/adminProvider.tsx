import { Admin, CustomRoutes, ListGuesser, Resource, ShowGuesser } from 'react-admin'
import { FC, PropsWithChildren } from 'react'
import CelebrationIcon from '@mui/icons-material/Celebration'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'

import { Route } from 'react-router-dom'
import EventList from '@/components/lists/events'
import EventShow from '@/components/shows/event'
import authProvider from '@/providers/authProvider'
import dataProvider from '@/providers/dataProvider'
import ManagerList from '@/components/lists/managers'
import { EventCreate, EventEdit } from '@/components/forms/event'
import { i18nProvider } from '@/providers/i18nProvider'
import StatPage from '@pages/stat'
import { MainLayout } from '@/layout/main'

const AdminProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Admin
      dataProvider={dataProvider}
      i18nProvider={i18nProvider}
      authProvider={authProvider}
      basename="/admin"
      requireAuth
      darkTheme={{ palette: { mode: 'dark' } }}
      layout={MainLayout}
    >
      {children}
      <Resource
        icon={CelebrationIcon}
        name="event"
        options={{ label: 'Events' }}
        list={EventList}
        show={EventShow}
        edit={EventEdit}
        create={EventCreate}
        hasShow
        hasCreate
        hasEdit
      />
      <Resource name="event/count" list={ListGuesser} />
      <Resource name="event/count-per-period" list={ListGuesser} />
      <Resource
        icon={FormatListNumberedIcon}
        name="event/types"
        recordRepresentation={(record) => record.name}
        options={{ label: 'Event Types' }}
        list={ListGuesser}
        show={ShowGuesser}
      />
      <Resource
        icon={ManageAccountsIcon}
        name="manager"
        options={{ label: 'Managers' }}
        list={ManagerList}
        show={ShowGuesser}
      />
      <Resource name="foodProvider/popular" list={ListGuesser} />
      <CustomRoutes>
        <Route path="/stat" element={<StatPage />} />
      </CustomRoutes>
    </Admin>
  )
}

export default AdminProvider
