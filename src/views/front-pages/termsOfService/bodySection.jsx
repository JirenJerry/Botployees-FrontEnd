// Third-party Imports
import classnames from 'classnames'

// Component Imports
import TermsOfService from '@/components/termsOfService' 

// Styles Imports
import frontCommonStyles from '@views/front-pages/styles.module.css'

const BodySection = () => {
  return (
    <section className='plb-[100px] bg-backgroundPaper pbs-[70px] -mbs-[70px]'>
      <div className={classnames('pbs-[50px] md:pbs-[100px]', frontCommonStyles.layoutSpacing)}>
        <TermsOfService/>
      </div>
    </section>
  )
}

export default BodySection
