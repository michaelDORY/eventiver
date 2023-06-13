import { Menu } from 'react-admin'
import AutoGraphIcon from '@mui/icons-material/AutoGraph'

export const MyMenu = () => (
  <Menu>
    <Menu.ResourceItem name="event" />
    <Menu.ResourceItem name="event/types" />
    <Menu.ResourceItem name="manager" />
    <Menu.Item to="/stat" primaryText="Statistics" leftIcon={<AutoGraphIcon />} />
  </Menu>
)
