// MUI Imports
import { useEffect } from 'react'

import { useForm, Controller } from 'react-hook-form'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'

const ProductInformation = ({ productData, handleProductDataChange, onFormSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    defaultValues: {
      name: '',
      description: ''
    }
  })

  useEffect(() => {
    if (productData) {
      setValue('name', productData.name || '')
      setValue('description', productData.description || '')
    }
  }, [productData, setValue])

  useEffect(() => {
    if (onFormSubmit) {
      onFormSubmit(handleSubmit)
    }
  }, [handleSubmit, onFormSubmit])

  const handleFieldChange = (fieldName, value) => {
    handleProductDataChange({
      ...productData,
      [fieldName]: value
    })
  }

  return (
    <Card>
      <CardHeader title='Product Information' />
      <CardContent>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Controller
              name='name'
              control={control}
              rules={{ required: 'Product name is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label='Product Name'
                  placeholder='Enter Product Name'
                  error={!!errors.name}
                  helperText={errors.name ? errors.name.message : ''}
                  onChange={e => {
                    field.onChange(e)
                    handleFieldChange('name', e.target.value)
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name='description'
              control={control}
              rules={{ required: 'Product description is required', minLength: { value: 10, message: 'Description should be at least 10 characters' } }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label='Product Description'
                  multiline
                  rows={4}
                  placeholder='Enter Product Description'
                  error={!!errors.description}
                  helperText={errors.description ? errors.description.message : ''}
                  onChange={e => {
                    field.onChange(e)
                    handleFieldChange('description', e.target.value)
                  }}
                />
              )}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ProductInformation
