import { Box, Tab, Tabs, Typography } from '@mui/material'
import { useState } from 'react'
import { useTranslate } from 'react-admin'
import TabPanel from '@/components/tabPanel'
import StatTabs from '@/components/stat/tabs'

const StatPage = () => {
  const t = useTranslate()
  const [activeTab, setActiveTab] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  return (
    <Box>
      <Typography variant="h3" marginTop={5} marginBottom={2}>
        {t('myroot.statistics')}
      </Typography>
      <Tabs value={activeTab} onChange={handleChange} aria-label="basic tabs example">
        <Tab label={t('myroot.events')} />
        <Tab label={t('myroot.foodProviders')} />
      </Tabs>
      {Object.values(StatTabs).map((TabContent, index) => (
        <TabPanel key={index} index={index} value={activeTab}>
          <TabContent />
        </TabPanel>
      ))}
    </Box>
  )
}

export default StatPage
