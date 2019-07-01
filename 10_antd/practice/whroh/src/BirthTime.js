import React from 'react'
import { Card, TimePicker, Typography } from 'antd'
import moment from 'moment'
import { StyledBirthTimeSection } from './styles'

const Text = Typography.Text

export default () => (
  <StyledBirthTimeSection>
    <Card
      title="우현이 태어난 시각은 언제일까요?"
      extra={<Text type="secondary">5점</Text>}
    >
      <TimePicker
        defaultValue={moment('12:08:23', 'HH:mm:ss')}
        size="large"
        className="timepicker"
      />
    </Card>
  </StyledBirthTimeSection>
)
