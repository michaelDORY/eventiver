import { Stack } from '@mui/material'
import { LoadingIndicator, useGetList } from 'react-admin'
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts'
import StatCard from '../card'

const FoodProviderStatsTab = () => {
  const { data, isLoading } = useGetList('foodProvider/popular', {
    pagination: {
      page: 1,
      perPage: 1000,
    },
  })

  if (isLoading) {
    return <LoadingIndicator />
  }

  return (
    <Stack direction="row" gap={3} sx={{ alignItems: 'center' }}>
      <StatCard titleKey="mostPopularFoodProviders">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="user.name" />
          <YAxis domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} />
          <Tooltip />
          <Legend />
          <Bar dataKey="rating" fill="#8884d8" />
        </BarChart>
      </StatCard>
    </Stack>
  )
}

export default FoodProviderStatsTab
