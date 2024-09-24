'use client'

import { useState, useRef } from 'react'

import { toast } from 'react-toastify'

import Grid from '@mui/material/Grid'

import ProductAddHeader from '@views/apps/business/products/add/ProductAddHeader'
import ProductInformation from '@views/apps/business/products/add/ProductInformation'
import ProductImage from '@views/apps/business/products/add/ProductImage'

import ProductVariants from '@views/apps/business/products/add/ProductVariants'
import ProductPricing from '@views/apps/business/products/add/ProductPricing'
import ProductOrganize from '@views/apps/business/products/add/ProductOrganize'


const ECommerceProductsAdd = () => {
  const [productDetails, setProductDetails] = useState({
    productName: '',
    productDescription: '', // Ensure this is included
    sku: '',
    barcode: '',
    price: '',
    category: ''
  })

  const formSubmitRefs = useRef([]) // Ref to store form submit handlers

  const handleProductChange = updatedData => {
    setProductDetails(prevState => ({
      ...prevState,
      ...updatedData
    }))
  }

  const handleFormSubmit = submitHandler => {
    formSubmitRefs.current.push(submitHandler)
  }

  const handlePublish = async () => {
    let allFormsValid = true

    // Validate all forms by triggering their submit handlers
    const formValidationPromises = formSubmitRefs.current.map(
      submitHandler =>
        new Promise(resolve => {
          submitHandler(
            formData => {
              resolve(true) // Form is valid
            },
            errors => {
              resolve(false) // Form validation failed
            }
          )()
        })
    )

    const validationResults = await Promise.all(formValidationPromises)
    
    allFormsValid = validationResults.every(isValid => isValid)

    if (allFormsValid) {
      console.log('Publishing product:', productDetails)
      toast.success('Product published successfully!')
      
    }
  }

  const handleDiscard = () => {
    setProductDetails({
      productName: '',
      productDescription: '',
      sku: '',
      barcode: '',
      price: '',
      category: ''
    })
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ProductAddHeader onPublish={handlePublish} onDiscard={handleDiscard} />
      </Grid>
      <Grid item xs={12} md={8}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <ProductInformation
              productData={productDetails} // Ensure productDetails is correct
              handleProductDataChange={handleProductChange}
              onFormSubmit={handleFormSubmit}
            />
          </Grid>
          <Grid item xs={12}>
            <ProductImage />
          </Grid>
          <Grid item xs={12}>
            <ProductVariants />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={4}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <ProductPricing
              productData={productDetails} // Ensure productDetails is correct
              handleProductDataChange={handleProductChange}
              onFormSubmit={handleFormSubmit}
            />
          </Grid>
          <Grid item xs={12}>
            <ProductOrganize
              productData={productDetails} // Ensure productDetails is correct
              handleProductDataChange={handleProductChange}
              onFormSubmit={handleFormSubmit}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ECommerceProductsAdd
