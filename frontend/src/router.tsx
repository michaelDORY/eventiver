import { Route } from 'react-router-dom'
import { CustomRoutes as CustomRoutesAdmin } from 'react-admin'

export const CustomRoutes = () => {
  return (
    <CustomRoutesAdmin>
      <Route path="/" element={<h1>Hello</h1>} />
    </CustomRoutesAdmin>
  )
}
