// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'

// Component Imports
import ConfirmationDialog from '@components/dialogs/confirmation-dialog'
import OpenDialogOnElementClick from '@components/dialogs/OpenDialogOnElementClick'
import CustomAvatar from '@core/components/mui/Avatar'

const UserDetails = employeeData => {
  // Destructure the employeeData object
  const {
    image,
    name,
    email,

    businessRole
  } = employeeData || {} // Use optional chaining in case employeeData is null

  const buttonProps = (children, color, variant) => ({
    children,
    color,
    variant
  })
  console.log(employeeData)
  return (
    <Card>
      <CardContent className='flex flex-col pbs-12 gap-6'>
        <div className='flex flex-col gap-6'>
          <div className='flex items-center justify-center flex-col gap-4'>
            <div className='flex flex-col items-center gap-4'>
              <CustomAvatar alt='user-profile' src={image} variant='rounded' size={120} />
              <Typography variant='h5'>{`${name}`}</Typography>
              <Chip label={businessRole} color='error' size='small' variant='tonal' />
            </div>
          </div>
        </div>
        <div>
          <Typography variant='h5'>Details</Typography>
          <Divider className='mlb-4' />
          <div className='flex flex-col gap-2'>
            <div className='flex items-center flex-wrap gap-x-1.5'>
              <Typography className='font-medium' color='text.primary'>
                Name:
              </Typography>
              <Typography>{name}</Typography>
            </div>
            <div className='flex items-center flex-wrap gap-x-1.5'>
              <Typography className='font-medium' color='text.primary'>
                Email:
              </Typography>
              <Typography>{email}</Typography>
            </div>
          </div>
        </div>
        <div className='flex gap-4 justify-center'>
          <OpenDialogOnElementClick
            element={Button}
            elementProps={buttonProps('Remove', 'error', 'outlined')}
            dialog={ConfirmationDialog}
            dialogProps={{ type: 'remove-employee' }}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default UserDetails
