// React Imports
import { useEffect } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'

// React Hook Form Imports
import { useForm, Controller } from 'react-hook-form'

const Profile = ({ businessData, handleBusinessDataChange, onFormSubmit }) => {
  // React Hook Form setup
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      description: ''
    }
  })

  // Populate the form with businessData if it exists
  useEffect(() => {
    if (businessData) {
      setValue('name', businessData.name || '')
      setValue('phone', businessData.phone || '')
      setValue('email', businessData.email || '')
      setValue('description', businessData.description || '')
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
      <CardHeader title="Profile" />
      <CardContent>
        <form>
          <Grid container spacing={5}>
            {/* Name Field */}
            <Grid item xs={12} md={12}>
              <Controller
                name="name"
                control={control}
                rules={{ required: 'Name is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Name"
                    placeholder="Kamilo's"
                    error={!!errors.name}
                    helperText={errors.name ? errors.name.message : ''}
                    onChange={(e) => {
                      field.onChange(e)
                      handleFieldChange('name', e.target.value)
                    }}
                  />
                )}
              />
            </Grid>

            {/* Phone Field */}
            <Grid item xs={12} md={12}>
              <Controller
                name="phone"
                control={control}
                rules={{
                  required: 'Phone is required',
                  pattern: {
                    value: /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
                    message: 'Invalid phone number format'
                  }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Phone"
                    placeholder="+(123) 456-7890"
                    error={!!errors.phone}
                    helperText={errors.phone ? errors.phone.message : ''}
                    onChange={(e) => {
                      field.onChange(e)
                      handleFieldChange('phone', e.target.value)
                    }}
                  />
                )}
              />
            </Grid>

            {/* Contact Email Field */}
            <Grid item xs={12} md={12}>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: 'Contact email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: 'Invalid email address'
                  }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Contact Email"
                    placeholder="johndoe@kamilos.com"
                    error={!!errors.email}
                    helperText={errors.email ? errors.email.message : ''}
                    onChange={(e) => {
                      field.onChange(e)
                      handleFieldChange('email', e.target.value)
                    }}
                  />
                )}
              />
            </Grid>

            {/* Description Field */}
            <Grid item xs={12} md={12}>
              <Controller
                name="description"
                control={control}
                rules={{
                  required: 'Description is required',
                  minLength: {
                    value: 10,
                    message: 'Description should be at least 10 characters'
                  }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    rows={4}
                    multiline
                    label="Description"
                    placeholder="Barber shop based on..."
                    error={!!errors.description}
                    helperText={errors.description ? errors.description.message : ''}
                    onChange={(e) => {
                      field.onChange(e)
                      handleFieldChange('description', e.target.value)
                    }}
                  />
                )}
              />
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default Profile
