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
      productName: '',
      productDescription: ''
    }
  })

  useEffect(() => {
    if (productData) {
      setValue('productName', productData.productName || '')
      setValue('productDescription', productData.productDescription || '')
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
              name='productName'
              control={control}
              rules={{ required: 'Product name is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label='Product Name'
                  placeholder='Enter Product Name'
                  error={!!errors.productName}
                  helperText={errors.productName ? errors.productName.message : ''}
                  onChange={e => {
                    field.onChange(e)
                    handleFieldChange('productName', e.target.value)
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name='productDescription'
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
                  error={!!errors.productDescription}
                  helperText={errors.productDescription ? errors.productDescription.message : ''}
                  onChange={e => {
                    field.onChange(e)
                    handleFieldChange('productDescription', e.target.value)
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
