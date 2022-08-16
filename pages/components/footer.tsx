import { useTranslation } from 'react-i18next';
import React, { useContext } from "react";
import { Button } from '@mui/material';
import { useRouter } from 'next/router'
import Link  from 'next/link'
import { FgoContext } from '../../contexts'

type FooterProps = {
    stepNum: number,
    linkTo: string,
    linkBack: string
};

const Footer: React.FC<FooterProps> = ({stepNum, linkTo = "/", linkBack = "/"} : FooterProps) => {
    const { t } = useTranslation();
    const { state, dispatch } = useContext(FgoContext)
    const router = useRouter();

    const onFormSubmitHandler = () => {
        if (linkTo === "/rolltarget") {
            if (!state.startDate || !state.endDate) {
                dispatch({type: "SET_FORM_ERRORS", payload: true});
            } else {
                dispatch({type: "SET_FORM_ERRORS", payload: false});
                dispatch({type: "HANDLE_FORM_SUBMIT"});
                router.push(linkTo)
            }
        }
    }
    return (
    <>
        <div className="footer">
            {true && <Button variant="contained" color="secondary"><Link href={linkBack}>{t("back")}</Link></Button>}
            {stepNum < 3 && 
            (
                <div className="next-button">
                    <Button variant="contained" color="success" onClick={onFormSubmitHandler}>{t("next")}</Button>
                    <div>{t("progress", { stepNum })}</div>
                </div>
            )}
        </div>
      </>
    )
  }

  export default Footer

  
