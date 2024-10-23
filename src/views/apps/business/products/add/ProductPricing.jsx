// MUI Imports
import { useEffect } from 'react'

import { useForm, Controller } from 'react-hook-form'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Checkbox from '@mui/material/Checkbox'
import Divider from '@mui/material/Divider'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

// Component Imports
import Form from '@components/Form'

const ProductPricing = ({ onFormSubmit, productData, handleProductDataChange }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    defaultValues: {
      price: '',
      discountedPrice: ''
    }
  })

  useEffect(() => {
    if (productData) {
      setValue('price', productData.price || '')
      setValue('discountedPrice', productData.discountedPrice || '')
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
      <CardHeader title='Pricing' />
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Controller
            name='price'
            control={control}
            rules={{ required: 'Base price is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                type='number'
                fullWidth
                label='Base Price'
                placeholder='$600'
                error={!!errors.price}
                helperText={errors.price ? errors.price.message : ''}
                onChange={e => {
                  field.onChange(e)
                  handleFieldChange('price', e.target.value)
                }}
                className='mbe-5'
              />
            )}
          />
          <Controller
            name='discountedPrice'
            control={control}
            rules={{
              validate: value => !value || parseFloat(value) > 0 || 'Discounted price must be greater than 0'
            }}
            render={({ field }) => (
              <TextField
                {...field}
                type='number'
                fullWidth
                label='Discounted Price'
                placeholder='$499'
                error={!!errors.discountedPrice}
                helperText={errors.discountedPrice ? errors.discountedPrice.message : ''}
                onChange={e => {
                  field.onChange(e)
                  handleFieldChange('discountedPrice', e.target.value)
                }}
                className='mbe-5'
              />
            )}
          />
          <FormControlLabel control={<Checkbox defaultChecked />} label='Charge tax on this product' />
          <Divider className='mlb-2' />
          <div className='flex items-center justify-between'>
            <Typography>In stock</Typography>
            <Switch defaultChecked />
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default ProductPricing
