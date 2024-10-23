'use client'

import { useState, useRef } from 'react'

import { useSession } from 'next-auth/react'

import { toast } from 'react-toastify'

import Grid from '@mui/material/Grid'

import ProductAddHeader from '@views/apps/business/products/add/ProductAddHeader'
import ProductInformation from '@views/apps/business/products/add/ProductInformation'
import ProductImage from '@views/apps/business/products/add/ProductImage'

import ProductVariants from '@views/apps/business/products/add/ProductVariants'
import ProductPricing from '@views/apps/business/products/add/ProductPricing'
import ProductOrganize from '@views/apps/business/products/add/ProductOrganize'

const createProduct = async (productData, userId, businessId) => {
  try {
    // Extract user information from the session
    const credentials = btoa(`${userId}@${businessId}`)

    // Log the session for debugging purposes

    console.log(productData)

    // Perform the API request

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/customers/products`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${credentials}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ product: productData })
    })

    // Check if the request was successful (status code 201)

 
  } catch (error) {
    // Handle errors during the API call

    errorToast('Failed to create Product!')
    console.log(error)
  }
}
const ECommerceProductsAdd = () => {
  const { data: session } = useSession() // Get session data
  const userId = session?.user?.id // Access userId from session
  const businessId = session?.user?.businessId //
  const [productDetails, setProductDetails] = useState({
    name: '',
    description: '', // Ensure this is included
   
    barcode: '',
    taxPercentage: 0,
    price: '',
    category: '',
    currency: 'CRC'
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
            async formData => {
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
      toast.promise(createProduct(productDetails,userId,businessId), {
        pending: 'Creating Product',
        success: 'Product created!',
        error: 'Error'
      })
      console.log('Publishing product:', productDetails)
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
