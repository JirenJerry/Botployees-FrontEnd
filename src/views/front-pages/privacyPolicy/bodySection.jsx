// Third-party Imports
import classnames from 'classnames'

// Component Imports
import PrivacyPolicy from '@/components/privacyPolicy' 

// Styles Imports
import frontCommonStyles from '@views/front-pages/styles.module.css'

const BodySection = () => {
  return (
    <section className='plb-[100px] bg-backgroundPaper pbs-[70px] -mbs-[70px]'>
      <div className={classnames('pbs-[50px] md:pbs-[100px]', frontCommonStyles.layoutSpacing)}>
        <PrivacyPolicy/>
      </div>
    </section>
  )
}

export default BodySection
