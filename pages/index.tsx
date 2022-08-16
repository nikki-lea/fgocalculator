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
  const { t } =  useTranslation();
    return (
      <div className="current-container">
        <h1>{t("current.general")}</h1>
        <div className="currency-form">
          <div className="form-column">
            <TextField id="outlined-basic" inputProps={{type: "number"}} label={t("current.sq")} variant="outlined" color="primary" fullWidth onBlur={(e) => {dispatch({type: "SET_CURRENT_SQ", value: {currentSQ: parseInt(e.target.value)}})}}/>
            <TextField id="outlined-basic" inputProps={{type: "number"}} label={t("current.ticket")} variant="outlined" color="primary" fullWidth onBlur={(e) => {dispatch({type: "SET_TICKET_SQ", value: {ticketSQ: parseInt(e.target.value)}})}}/>
          </div>
          <div className="form-column">
            <TextField id="date" label={t("savings.begin")} type="date" fullWidth InputLabelProps={{shrink: true}} onBlur={(e) => {dispatch({type: "SET_START_DATE", value: {startDate: e.target.value}})}}/>
            <TextField id="date" label={t("savings.end")} type="date" fullWidth InputLabelProps={{shrink: true}} onBlur={(e) => {dispatch({type: "SET_END_DATE", value: {endDate:e.target.value}})}}/>
          </div>
        </div>
        <h1 className="sq-earned">{t("sq.earned")}</h1>
        <div className="currency-form">
        <div className="form-column">
            <TextField id="outlined-basic" label={t("mission.label")} variant="outlined" disabled helperText={t("mission.detail")} fullWidth/>
            <TextField id="outlined-basic" label={t("login.daily.label")} variant="outlined" disabled helperText={t("login.daily.detail")} fullWidth/>
            <TextField id="outlined-basic" inputProps={{type: "number"}} label={t("quest")} variant="outlined" color="primary" fullWidth onBlur={(e) => {dispatch({type: "SET_QUEST_SQ", value: {questSQ: parseInt(e.target.value)}})}}/>
            <div><FormControlLabel control={<StyledCheckbox />} label={t("ticketassq")}/></div>
          </div>
          <div className="form-column">
            <TextField id="outlined-basic" inputProps={{type: "number"}} label={t("login.total.label")} variant="outlined" color="primary" helperText={t("login.total.detail")} fullWidth onBlur={(e) => {dispatch({type: "SET_CUMULATIVE_LOGINS_DATA", value: {cumulativeLoginsCount: parseInt(e.target.value)}})}}/>
            <TextField id="outlined-basic" inputProps={{type: "number"}} label={t("shop.label")} variant="outlined" color="primary" helperText={t("shop.detail")} fullWidth onBlur={(e) => {dispatch({type: "SET_SHOP_TICKETS", value: {shopTickets: parseInt(e.target.value)}})}}/>
            <TextField id="outlined-basic" inputProps={{type: "number"}} label={t("event")} variant="outlined" color="primary" fullWidth onBlur={(e) => {dispatch({type: "SET_EVENT_SQ", value: {eventSQ: parseInt(e.target.value)}})}}/>
            <div><FormControlLabel control={<StyledCheckbox />} label={t("sq.addevent")}/></div>
          </div>
        </div>
        <Footer stepNum={1} />
      </div>
    )
  }

export default SummonCurrency