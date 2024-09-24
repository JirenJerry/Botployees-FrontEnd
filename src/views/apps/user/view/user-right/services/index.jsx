// MUI Imports

import Grid from '@mui/material/Grid'

import ProductListTableServices from '@views/apps/user/view/user-right/services/ProcutListTableServices'

// Data Imports
import { getEcommerceData } from '@/app/server/actions'

const ServicesTab = async () => {
  const data = await getEcommerceData()

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ProductListTableServices productData={data?.products} />
      </Grid>
    </Grid>
  )
}

export default ServicesTab
