import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';

const Footer: React.FC<{stepNum: number}> = ({stepNum} : {stepNum: number}) => {
    const { t } = useTranslation();
    return (
    <>
        <div className="footer">
            {true && <Button variant="contained" color="secondary">{t("back")}</Button>}
            {stepNum < 3 && 
            (
                <div className="next-button">
                    <Button variant="contained" color="success">{t("next")}</Button>
                    <div>{t("progress", { stepNum })}</div>
                </div>
            )}
        </div>
      </>
    )
  }

  export default Footer

  
