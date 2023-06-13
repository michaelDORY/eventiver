import { FC, PropsWithChildren } from 'react'
import { Card, Typography } from '@mui/material'
import { useTranslate } from 'react-admin'

const StatCard: FC<{ titleKey: string } & PropsWithChildren> = ({ titleKey, children }) => {
  const t = useTranslate()

  return (
    <Card sx={{ p: 4 }}>
      <Typography variant="h6">{t(`myroot.${titleKey}`)}</Typography>
      {children}
    </Card>
  )
}

export default StatCard
