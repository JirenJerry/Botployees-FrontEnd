// React Imports
import { useEffect } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
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

const TimeZone = ({ businessData, handleBusinessDataChange, onFormSubmit }) => {
  // React Hook Form setup
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    defaultValues: {
      timeZone: '',
      sizeUnit: '',
      weightUnit: '',
      appointmentDurationMultiplier: ''
    }
  })

  // Populate the form with businessData if it exists
  useEffect(() => {
    if (businessData) {
      setValue('timeZone', businessData.timeZone || '')
      setValue('sizeUnit', businessData.sizeUnit || '')
      setValue('weightUnit', businessData.weightUnit || '')
      setValue('appointmentDurationMultiplier', businessData.appointmentDurationMultiplier || '')
    }
  }, [businessData, setValue])

  // Register the form submit handler
  useEffect(() => {
    if (onFormSubmit) {
      onFormSubmit(handleSubmit)
    }
  }, [handleSubmit, onFormSubmit])

  // Handle form field changes and notify the parent component
  const handleFieldChange = (fieldName, value) => {
    handleBusinessDataChange({
      ...businessData,
      [fieldName]: value
    })
  }

  return (
    <Card>
      <CardHeader
        title='Time zone and units of measurement'
        subheader='Used to calculate product prices, shipping weights, and order/appointment times.'
      />
      <CardContent>
        <form>
          <Grid container spacing={5}>
            {/* Timezone Field */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Controller
                  name='timeZone'
                  control={control}
                  rules={{ required: 'Time zone is required' }}
                  render={({ field }) => (
                    <>
                      <InputLabel>Time Zone</InputLabel>
                      <Select
                        {...field}
                        label='Time zone'
                        value={field.value}
                        onChange={e => {
                          field.onChange(e)
                          handleFieldChange('timeZone', e.target.value)
                        }}
                        error={!!errors.timeZone}
                      >
                        <MenuItem value='America/Costa_Rica'>(UTC-06:00) America Costa Rica</MenuItem>
                      </Select>
                    </>
                  )}
                />
                {errors.timeZone && <FormHelperText error>{errors.timeZone.message}</FormHelperText>}
              </FormControl>
            </Grid>

            {/* Unit System Field */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <Controller
                  name='sizeUnit'
                  control={control}
                  rules={{ required: 'Unit system is required' }}
                  render={({ field }) => (
                    <>
                      <InputLabel>Unit System</InputLabel>
                      <Select
                        {...field}
                        label='Unit system'
                        value={field.value}
                        onChange={e => {
                          field.onChange(e)
                          handleFieldChange('sizeUnit', e.target.value)
                        }}
                        error={!!errors.sizeUnit}
                      >
                        <MenuItem value='Metric System'>Metric System</MenuItem>
                      </Select>
                    </>
                  )}
                />
                {errors.sizeUnit && <FormHelperText error>{errors.sizeUnit.message}</FormHelperText>}
              </FormControl>
            </Grid>

            {/* Default Weight Unit Field */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <Controller
                  name='weightUnit'
                  control={control}
                  rules={{ required: 'Weight unit is required' }}
                  render={({ field }) => (
                    <>
                      <InputLabel>Weight Unit</InputLabel>
                      <Select
                        {...field}
                        label='Weight unit'
                        value={field.value}
                        onChange={e => {
                          field.onChange(e)
                          handleFieldChange('weightUnit', e.target.value)
                        }}
                        error={!!errors.weightUnit}
                      >
                        <MenuItem value='Kilogram'>Kilogram</MenuItem>
                      </Select>
                    </>
                  )}
                />
                {errors.weightUnit && <FormHelperText error>{errors.weightUnit.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <Controller
                  name='appointmentDurationMultiplier'
                  control={control}
                  rules={{ required: 'Appointment duration is required' }}
                  render={({ field }) => (
                    <>
                      <InputLabel>Appointment Duration</InputLabel>
                      <Select
                        {...field}
                        label='Appointment Duration'
                        value={field.value}
                        onChange={e => {
                          field.onChange(e)
                          handleFieldChange('appointmentDurationMultiplier', e.target.value)
                        }}
                        error={!!errors.appointmentDurationMultiplier}
                      >
                        <MenuItem value='0.5'>15 minutes</MenuItem>
                        <MenuItem value='1'>30 minutes</MenuItem>
                        <MenuItem value='2.5'>45 minutes</MenuItem>
                        <MenuItem value='3'>60 minutes</MenuItem>
                      </Select>
                    </>
                  )}
                />
                {errors.appointmentDurationMultiplier && (
                  <FormHelperText error>{errors.appointmentDurationMultiplier.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default TimeZone
