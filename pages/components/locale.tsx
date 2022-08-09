import Link from 'next/link';
import { useRouter } from 'next/router';

const Locale: React.FC = () => {
    const router = useRouter();
    const isEnglish = router.locale === 'en';
    const flagIcon = isEnglish ? '/united-states-flag-icon.svg'  : '/japan-flag-icon.svg';
    const localeName = isEnglish ? 'en' : 'jp';

    return (
        <>
            {/* <Link className="locale" href="/" locale={localeName}>
                <img src={flagIcon} alt={localeName} height={18} width={24}/>
                <p>{localeName.toUpperCase()}</p>
            </Link> */}
        </>
    )
  }

  export default Locale