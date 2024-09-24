// React Imports
import { useEffect } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import FormHelperText from '@mui/material/FormHelperText'

// React Hook Form Imports

import { useForm, Controller } from 'react-hook-form'

const StoreCurrency = ({ businessData, handleBusinessDataChange, onFormSubmit }) => {
  // React Hook Form setup
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    defaultValues: {
      currency: ''
    }
  })

  // Populate the form with businessData if it exists
  useEffect(() => {
    if (businessData && businessData.currency) {
      setValue('currency', businessData.currency || '')
    }
  }, [businessData, setValue])

  // Register the form submit handler
  useEffect(() => {
    if (onFormSubmit) {
      onFormSubmit(handleSubmit)
    }
  }, [handleSubmit, onFormSubmit])

  // Handle field changes and notify the parent component
  const handleFieldChange = (fieldName, value) => {
    handleBusinessDataChange({
      ...businessData,
      [fieldName]: value
    })
  }

  return (
    <Card>
      <CardHeader title='Business currency' subheader='The currency your products/services are sold in.' />
      <CardContent>
        <FormControl fullWidth error={!!errors.currency}>
          <InputLabel>Business Currency</InputLabel>
          <Controller
            name='currency'
            control={control}
            rules={{ required: 'Currency is required' }}
            render={({ field }) => (
              <Select
                {...field}
                label='Business currency'
                onChange={e => {
                  field.onChange(e)
                  handleFieldChange('currency', e.target.value)
                }}
              >
                <MenuItem value='USD'>USD</MenuItem>
                <MenuItem value='CRC'>CRC</MenuItem>
              </Select>
            )}
          />
          {errors.currency && <FormHelperText error>{errors.currency.message}</FormHelperText>}
        </FormControl>
      </CardContent>
    </Card>
  )
}

export default StoreCurrency
