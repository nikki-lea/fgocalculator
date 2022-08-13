import type { NextPage } from 'next'
import React, { useContext } from "react";
import { useTranslation } from 'next-i18next'
import { TextField, FormControlLabel, Checkbox } from '@mui/material';
import Footer from './components/footer';
import { FgoContext } from '../contexts'

const StyledCheckbox = () => (
  <Checkbox
    sx={{
      '&.Mui-checked': {
        color: "#DDA55B"
      },}}
  />
);

const SummonCurrency: NextPage = () => {
  const { state, dispatch } = useContext(FgoContext)
  console.log(state);
  const { t } =  useTranslation();
    return (
      <div className="current-container">
        <h1>{t("current.general")}</h1>
        <div className="currency-form">
          <div className="form-column">
            <TextField id="outlined-basic" label={t("current.sq")} variant="outlined" color="info" fullWidth onBlur={(e) => {dispatch({type: "SET_CURRENT_SQ", value: {currentSQ: parseInt(e.target.value)}})}}/>
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
            <div><FormControlLabel control={<StyledCheckbox />} label={t("ticketassq")}/></div>
          </div>
          <div className="form-column">
            <TextField id="outlined-basic" label={t("login.total.label")} variant="outlined" color="info" helperText={t("login.total.detail")} fullWidth/>
            <TextField id="outlined-basic" label={t("shop.label")} variant="outlined" color="info" helperText={t("shop.detail")} fullWidth/>
            <TextField id="outlined-basic" label={t("event")} variant="outlined" color="info" fullWidth/>
            <div><FormControlLabel control={<StyledCheckbox />} label={t("sq.addevent")}/></div>
          </div>
        </div>
        <Footer stepNum={1} />
      </div>
    )
  }

export default SummonCurrency