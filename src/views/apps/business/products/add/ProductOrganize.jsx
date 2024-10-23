'use client'

// React Imports
import { useEffect } from 'react'

// react-hook-form Imports
import { useForm, Controller } from 'react-hook-form'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import FormHelperText from '@mui/material/FormHelperText'

const ProductOrganize = ({ onFormSubmit, productData, handleProductDataChange }) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      vendor: '',
      category: '',
      collection: '',
      status: '',
      tags: ''
    }
  })

  useEffect(() => {
    if (productData) {
      setValue('vendor', productData.vendor || '')
      setValue('category', productData.category || '')
      setValue('collection', productData.collection || '')
      setValue('status', productData.status || '')
      setValue('tags', productData.tags || '')
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
      <CardHeader title='Organize' />
      <CardContent>
        <form onSubmit={handleSubmit()} className='flex flex-col gap-5'>
          <Controller
            name='vendor'
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>Select Vendor</InputLabel>
                <Select
                  label='Select Vendor'
                  {...field}
                  onChange={e => {
                    field.onChange(e)
                    handleFieldChange('vendor', e.target.value)
                  }}
                >
                  <MenuItem value={`Company's Services`}>Company&apos;s Services</MenuItem>
                  <MenuItem value={`Company's Products`}>Company&apos;s Products</MenuItem>
                </Select>
              </FormControl>
            )}
          />

          <Controller
            name='category'
            control={control}
            rules={{ required: 'Category is required' }}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.category}>
                <InputLabel>Select Category</InputLabel>
                <Select
                  label='Select Category'
                  {...field}
                  onChange={e => {
                    field.onChange(e)
                    handleFieldChange('category', e.target.value)
                  }}
                >
                  <MenuItem value='Services'>Services</MenuItem>
                  <MenuItem value='Office'>Office</MenuItem>
                  <MenuItem value='Electronics'>Electronics</MenuItem>
                  <MenuItem value='Automotive'>Automotive</MenuItem>
                  <MenuItem value='Home & Kitchen'>Home & Kitchen</MenuItem>
                  <MenuItem value='Fashion'>Fashion</MenuItem>
                  <MenuItem value='Health & Beauty'>Health & Beauty</MenuItem>
                  <MenuItem value='Sports & Outdoors'>Sports & Outdoors</MenuItem>
                  <MenuItem value='Toys & Games'>Toys & Games</MenuItem>
                  <MenuItem value='Books & Media'>Books & Media</MenuItem>
                  <MenuItem value='Groceries'>Groceries</MenuItem>
                  <MenuItem value='Pets'>Pets</MenuItem>
                  <MenuItem value='Tools & Hardware'>Tools & Hardware</MenuItem>
                  <MenuItem value='Garden & Outdoor'>Garden & Outdoor</MenuItem>
                  <MenuItem value='Furniture'>Furniture</MenuItem>
                </Select>
                {errors.category && <FormHelperText error>{errors.category.message}</FormHelperText>}
              </FormControl>
            )}
          />

          <Controller
            name='collection'
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>Select Collection</InputLabel>
                <Select
                  label='Select Collection'
                  {...field}
                  onChange={e => {
                    field.onChange(e)
                    handleFieldChange('collection', e.target.value)
                  }}
                >
                  <MenuItem value={`Men's Clothing`}>Men&apos;s Clothing</MenuItem>
                  <MenuItem value={`Women's Clothing`}>Women&apos;s Clothing</MenuItem>
                  <MenuItem value={`Kid's Clothing`}>Kid&apos;s Clothing</MenuItem>
                </Select>
              </FormControl>
            )}
          />

          <Controller
            name='status'
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>Select Status</InputLabel>
                <Select
                  label='Select Status'
                  {...field}
                  onChange={e => {
                    field.onChange(e)
                    handleFieldChange('status', e.target.value)
                  }}
                >
                  <MenuItem value='Published'>Published</MenuItem>
                  <MenuItem value='Inactive'>Inactive</MenuItem>
                  <MenuItem value='Scheduled'>Scheduled</MenuItem>
                </Select>
              </FormControl>
            )}
          />

          <Controller
            name='tags'
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                label='Enter Tags'
                placeholder='Fashion, Trending, Summer'
                {...field}
                onChange={e => {
                  field.onChange(e)
                  handleFieldChange('tags', e.target.value)
                }}
              />
            )}
          />
        </form>
      </CardContent>
    </Card>
  )
}

export default ProductOrganize
