// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

// Third-party Imports
import classnames from 'classnames'

// Components Imports
import OptionMenu from '@core/components/option-menu'
import CustomAvatar from '@core/components/mui/Avatar'

// Vars
const data = [
  {
    avatarSrc: '/images/cards/paypal.png',
    title: 'Paypal',
    subtitle: 'Received Money',
    amount: '24,820',
    trend: 'up',
    avatarColor: 'error',
    height: 22
  },
  {
    avatarSrc: '/images/cards/credit-card.png',
    title: 'Credit Card',
    subtitle: 'Digital Ocean',
    amount: '1,250',
    trend: 'down',
    avatarColor: 'success',
    height: 15
  },
  {
    avatarSrc: '/images/cards/mastercard.png',
    title: 'Mastercard',
    subtitle: 'Netflix',
    amount: '99',
    trend: 'down',
    avatarColor: 'warning',
    height: 15
  },
  {
    avatarSrc: '/images/cards/wallet.png',
    avatarColor: 'primary',
    title: 'Wallet',
    subtitle: "Mac'D",
    amount: '82',
    trend: 'down',
    height: 18
  },
  {
    avatarSrc: '/images/cards/transfer.png',
    title: 'Transfer',
    subtitle: 'Refund',
    amount: '8,934',
    trend: 'up',
    avatarColor: 'info',
    height: 12
  }
]

const Transactions = () => {
  return (
    <Card>
      <CardHeader
        title='Messages'
        action={<OptionMenu iconClassName='text-textPrimary' options={['Last 28 Days', 'Last Month', 'Last Year']} />}
      />
      <CardContent className='flex flex-col gap-[1.1rem]'>
        {data.map((item, index) => (
          <div key={index} className='flex items-center gap-4'>
            <CustomAvatar variant='rounded' skin='light' color={item.avatarColor}>
              <img src={item.avatarSrc} alt={item.title} height={item.height} />
            </CustomAvatar>

            <div className='flex justify-between items-center is-full flex-wrap gap-x-4 gap-y-2'>
              <div className='flex flex-col gap-0.5'>
                <Typography color='text.primary' className='font-medium'>
                  {item.title}
                </Typography>
                <Typography>{item.subtitle}</Typography>
              </div>
              <div className='flex gap-2 items-center'>
                <Typography
                  color='text.primary'
                  className='font-medium'
                >{`${item.trend === 'up' ? '+' : '-'}$${item.amount}`}</Typography>
                <i
                  className={classnames(
                    item.trend === 'up' ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line',
                    item.trend === 'up' ? 'text-success' : 'text-error'
                  )}
                ></i>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default Transactions
