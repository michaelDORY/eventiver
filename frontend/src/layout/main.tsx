import { Layout, LayoutProps } from 'react-admin'
import { MyMenu } from '@/components/menu'

export const MainLayout = (props: LayoutProps) => {
  return <Layout {...props} menu={MyMenu} />
}
