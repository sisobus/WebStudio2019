import React from 'react'
import { Card, Checkbox, Typography } from 'antd'
import { StyledTraitSection } from './styles'

const CheckboxGroup = Checkbox.Group
const Text = Typography.Text

function onChange(checkedValues) {
  console.log('checked = ', checkedValues)
}

const options = [
  { label: 'Smart', value: 'Smart' },
  { label: 'Intelligent', value: 'Intelligent' },
  { label: 'Sexy', value: 'Sexy' },
  { label: 'Clever', value: 'Clever' },
  { label: 'Gentle', value: 'Gentle' },
  { label: 'Polite', value: 'Polite' },
  { label: 'Great', value: 'Great' },
  { label: 'Dumb', value: 'Dumb', disabled: true },
  { label: 'Emotional', value: 'Emotional', disabled: true },
  { label: 'Violent', value: 'Violent', disabled: true }
]

export default () => {
  return (
    <StyledTraitSection>
      <Card
        title="우현의 특성에 해당되는 항목은 모두 고르시오"
        extra={<Text type="secondary">5점</Text>}
      >
        <CheckboxGroup
          options={options}
          defaultValue={['Pear']}
          onChange={onChange}
        />
      </Card>
    </StyledTraitSection>
  )
}
