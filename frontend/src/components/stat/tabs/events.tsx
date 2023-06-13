import { Stack } from '@mui/material'
import { LoadingIndicator, useGetList } from 'react-admin'
import { Area, AreaChart, CartesianGrid, Pie, PieChart, Tooltip, XAxis, YAxis } from 'recharts'
import StatCard from '@/components/stat/card'

const periodName = 'day'

const EventStatsTab = () => {
  const { data: eventsDataPerPeriod, isLoading: isLoadingEventsPerPeriod } = useGetList(
    `event/count-per-period?perPeriod=${periodName}`,
    {
      pagination: { page: 1, perPage: 1000 },
    },
  )
  const { data: eventsCountData, isLoading: isLoadingEventsCount } = useGetList('event/count', {
    pagination: {
      page: 1,
      perPage: 1000,
    },
  })

  if (isLoadingEventsCount || isLoadingEventsPerPeriod) {
    return <LoadingIndicator />
  }

  return (
    <Stack direction="row" gap={3}>
      <StatCard titleKey="eventsPerStatus">
        <PieChart width={380} height={300} style={{ display: 'block', margin: '0 auto' }}>
          <Pie
            data={eventsCountData}
            dataKey="count"
            nameKey="status"
            cx="50%"
            cy="50%"
            fill="#8884d8"
            label={(data) => data.status}
          />
        </PieChart>
      </StatCard>
      <StatCard titleKey="eventsPerDay">
        <AreaChart
          width={500}
          height={400}
          data={eventsDataPerPeriod?.map((item) => ({
            ...item,
            [periodName]: new Date(item[periodName]).toLocaleDateString(),
          }))}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={periodName} />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Area type="monotone" dataKey="count" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </StatCard>
    </Stack>
  )
}

export default EventStatsTab
