import React from 'react'
import { Checkbox } from 'antd'

const CheckboxGroup = Checkbox.Group

function onChange(checkedValues) {
  console.log('checked = ', checkedValues)
}

const options = [
  { label: 'Smart', value: 'Smart', disabled: true },
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
    <div>
      <CheckboxGroup
        options={options}
        defaultValue={['Pear']}
        onChange={onChange}
      />
    </div>
  )
}
