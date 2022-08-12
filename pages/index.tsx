import type { NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import TextField from '@mui/material/TextField';


const SummonCurrency: NextPage = () => {
  const { t } =  useTranslation();
    return (
      <div className="current-container">
        <h1>{t("current.general")}</h1>
        <div className="currency-form">
          <div className="form-column">
            <TextField id="outlined-basic" label={t("current.sq")} variant="outlined" color="info" fullWidth/>
            <TextField id="outlined-basic" label={t("current.ticket")} variant="outlined" color="info" fullWidth/>
          </div>
          <div className="form-column">
            <TextField id="outlined-basic" label={t("savings.begin")} variant="outlined" color="info" fullWidth/>
            <TextField id="outlined-basic" label={t("savings.end")} variant="outlined" color="info" fullWidth/>
          </div>
        </div>
        <h1 className="sq-earned">{t("sq.earned")}</h1>
        <div className="currency-form">
        <div className="form-column">
            <TextField id="outlined-basic" label={t("mission.label")} variant="outlined" color="info" helperText={t("mission.detail")} fullWidth/>
            <TextField id="outlined-basic" label={t("login.daily.label")} variant="outlined" color="info" helperText={t("login.daily.detail")} fullWidth/>
            <TextField id="outlined-basic" label={t("quest")} variant="outlined" color="info" fullWidth/>
          </div>
          <div className="form-column">
            <TextField id="outlined-basic" label={t("login.total.label")} variant="outlined" color="info" helperText={t("login.total.detail")} fullWidth/>
            <TextField id="outlined-basic" label={t("shop.label")} variant="outlined" color="info" helperText={t("shop.detail")} fullWidth/>
            <TextField id="outlined-basic" label={t("event")} variant="outlined" color="info" fullWidth/>
          </div>
        </div>
      </div>
    )
  }

export default SummonCurrency