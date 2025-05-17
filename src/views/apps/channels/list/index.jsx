// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports

import ChannelListTable from './ChannelListTable'

const ChannelList = ({ channelData,session  }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ChannelListTable tableData={channelData}  session={session}/>
      </Grid>
    </Grid>
  )
}

export default ChannelList
 