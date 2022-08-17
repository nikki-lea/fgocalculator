import type { NextPage } from 'next'
import React, { useContext } from "react";
import { useTranslation } from 'next-i18next'
import { TextField, FormControlLabel, Checkbox, Alert} from '@mui/material';
import Footer from './components/footer';
import { FgoContext } from '../contexts'
import { StateType } from '../types/contexts';

const StyledCheckbox = ({onChangeHandler} :  {onChangeHandler: React.ChangeEventHandler<HTMLInputElement>}) => (
  <Checkbox
    onChange={onChangeHandler}
    sx={{
      '&.Mui-checked': {
        color: "#DDA55B"
      },}}
  />
);

const getPreviousState = (state: StateType) => {
  let previousState: any = {};
  for (const [key, value] of Object.entries(state)) {
    if (!!value) {
      previousState[key] = value;
    } else {
      previousState[key] = undefined;
    }
  }
  return previousState;
}


const SummonCurrency: NextPage = () => {
  const { state, dispatch } = useContext(FgoContext)
  const { t } =  useTranslation();
  const previousState = getPreviousState(state); // Only set values if set by the user
    return (
      <div className="current-container">
        {state.formErrors && <Alert severity="error">{t("error")}</Alert>}
        <h1>{t("current.general")}</h1>
        <div className="currency-form">
          <div className="form-column">
            <TextField id="outlined-basic" inputProps={{type: "number"}} label={t("current.sq")} variant="outlined" color="primary" fullWidth defaultValue={previousState.currentSQ} onBlur={(e) => {dispatch({type: "SET_CURRENT_SQ", payload: parseInt(e.target.value)})}}/>
            <TextField id="outlined-basic" inputProps={{type: "number"}} label={t("current.ticket")} variant="outlined" color="primary" fullWidth defaultValue={previousState.currentTickets} onBlur={(e) => {dispatch({type: "SET_CURRENT_TICKETS", payload: parseInt(e.target.value)})}}/>
          </div>
          <div className="form-column">
            <TextField id="date" label={t("savings.begin")} type="date" value={previousState.startDate}  fullWidth InputLabelProps={{shrink: true}} onBlur={(e) => {dispatch({type: "SET_START_DATE", payload: e.target.value})}}/>
            <TextField id="date" label={t("savings.end")} type="date" fullWidth value={previousState.endDate} InputLabelProps={{shrink: true}} onBlur={(e) => {dispatch({type: "SET_END_DATE", payload: e.target.value})}}/>
          </div>
        </div>
        <h1 className="sq-earned">{t("sq.earned")}</h1>
        <div className="currency-form">
        <div className="form-column">
            <TextField id="outlined-basic" label={t("mission.label")} variant="outlined" disabled value={previousState.masterMissions} helperText={t("mission.detail")} fullWidth/>
            <TextField id="outlined-basic" label={t("login.daily.label")} variant="outlined" disabled value={previousState.dailyLogins} helperText={t("login.daily.detail")} fullWidth/>
            <TextField id="outlined-basic" inputProps={{type: "number"}} label={t("quest")} variant="outlined" color="primary" fullWidth defaultValue={previousState.questSQ} onBlur={(e) => {dispatch({type: "SET_QUEST_SQ", payload: parseInt(e.target.value)})}}/>
            <div><FormControlLabel control={<StyledCheckbox onChangeHandler={(e) => {dispatch({type: "REMOVE_TICKETS_FROM_SQ", payload: e.target.checked})}} />} label={t("ticketassq")}/></div>
          </div>
          <div className="form-column">
            <TextField id="outlined-basic" inputProps={{type: "number"}} label={t("login.total.label")} variant="outlined" color="primary" helperText={t("login.total.detail")} fullWidth defaultValue={previousState.cumulativeLoginsCount} onBlur={(e) => {dispatch({type: "SET_CUMULATIVE_LOGINS_DATA", payload: parseInt(e.target.value)})}}/>
            <TextField id="outlined-basic" inputProps={{type: "number"}} label={t("shop.label")} variant="outlined" color="primary" helperText={t("shop.detail")} fullWidth defaultValue={previousState.monthlyShopTickets} onBlur={(e) => {dispatch({type: "SET_MONTHLY_SHOP_TICKETS", payload: parseInt(e.target.value)})}}/>
            <TextField id="outlined-basic" inputProps={{type: "number"}} label={t("event")} variant="outlined" color="primary" fullWidth defaultValue={previousState.eventSQ} onBlur={(e) => {dispatch({type: "SET_EVENT_SQ", payload: parseInt(e.target.value)})}}/>
            <div><FormControlLabel control={<StyledCheckbox onChangeHandler={(e) => console.log("TODO")}/>} label={t("sq.addevent")}/></div>
          </div>
        </div>
        <Footer stepNum={1} linkTo="/rolltarget" linkBack="/"/>
      </div>
    )
  }

export default SummonCurrency