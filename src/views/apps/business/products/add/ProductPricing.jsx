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
      basePrice: '',
      discountedPrice: ''
    }
  })

  useEffect(() => {
    if (productData) {
      setValue('basePrice', productData.basePrice || '')
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
            name='basePrice'
            control={control}
            rules={{ required: 'Base price is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label='Base Price'
                placeholder='Enter Base Price'
                error={!!errors.basePrice}
                helperText={errors.basePrice ? errors.basePrice.message : ''}
                onChange={e => {
                  field.onChange(e)
                  handleFieldChange('basePrice', e.target.value)
                }}
                className='mbe-5'
              />
            )}
          />
          <Controller
            name='discountedPrice'
            control={control}
           
            rules={{
              validate: value => !value || (parseFloat(value) > 0 || 'Discounted price must be greater than 0')
            }}
            render={({ field }) => (
              <TextField
                {...field}
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
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label='Charge tax on this product'
          />
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
