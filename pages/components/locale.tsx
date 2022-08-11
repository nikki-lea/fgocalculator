import { useTranslation } from 'react-i18next';


const Locale: React.FC = () => {
    const { i18n } = useTranslation();
    const isEnglish = i18n.language === 'en';
    const flagIcon = isEnglish ? '/united-states-flag-icon.svg' : '/japan-flag-icon.svg';
    const localeName = isEnglish ? 'en' : 'jp';

    const updateLanguage = () => {
        const newLanguage = isEnglish ? 'jp' : 'en';
        i18n.changeLanguage(newLanguage);
        const htmlTag = document.getElementsByTagName("html")[0];
        htmlTag.setAttribute("lang", newLanguage);
    }
    

    return (
        <>
            <button className="locale" onClick={updateLanguage}>
                <div>
                    <img src={flagIcon} alt={localeName} height={18} width={24}/>
                    <span>{localeName.toUpperCase()}</span>
                </div>
            </button>
        </>
    )
  }

  export default Locale