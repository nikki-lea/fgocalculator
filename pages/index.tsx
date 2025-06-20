import type { NextPage } from "next";
import React, { useContext, useEffect, useState } from "react";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Alert,
  IconButton
} from "@mui/material";
import Footer from "./components/footer";
import {
  ADD_EXCLUDE_OPTION,
  FgoContext,
  REMOVE_EXCLUDE_OPTION,
  SET_CUMULATIVE_LOGINS_DATA,
  SET_CURRENT_SQ,
  SET_CURRENT_TICKETS,
  SET_END_DATE,
  SET_MONTHLY_SHOP_TICKETS,
  SET_QUEST_SQ,
  SET_START_DATE
} from "../contexts";
import { ExcludeOptions } from "../contexts";
import copy from "../data/copy";
import moment from "moment";

const SummonCurrency: NextPage = () => {
  const { state, dispatch } = useContext(FgoContext);
  const [ticketChecked, setTicketChecked] = useState(false);
  const [masterMissionsChecked, setMasterMissionsChecked] = useState(false);
  const [loginBonusesChecked, setLoginBonusesChecked] = useState(false);
  const [eventChecked, setEventChecked] = useState(false);
  const { excludeOptions } = state;

  // Checkbox hydrates state on render, set state variables as a workaround
  useEffect(() => {
    if (excludeOptions?.has(ExcludeOptions.tickets)) {
      setTicketChecked(true);
    } else if (!excludeOptions?.has(ExcludeOptions.tickets)) {
      setTicketChecked(false);
    }
    if (excludeOptions?.has(ExcludeOptions.masterMissions)) {
      setMasterMissionsChecked(true);
    } else if (!excludeOptions?.has(ExcludeOptions.masterMissions)) {
      setMasterMissionsChecked(false);
    }
    if (excludeOptions?.has(ExcludeOptions.loginBonuses)) {
      setLoginBonusesChecked(true);
    } else if (!excludeOptions?.has(ExcludeOptions.loginBonuses)) {
      setLoginBonusesChecked(false);
    }

    if (excludeOptions?.has(ExcludeOptions.events)) {
      setEventChecked(true);
    } else if (!excludeOptions?.has(ExcludeOptions.events)) {
      setEventChecked(false);
    }
  }, [excludeOptions]);

  const handleExclusionUpdate =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const actionType = e.target.checked
        ? ADD_EXCLUDE_OPTION
        : REMOVE_EXCLUDE_OPTION;
      dispatch({
        type: actionType,
        payload: key
      });
    };

  return (
    <div className="current-container">
      {state.formErrors && (
        <Alert sx={{ mb: "10px" }} severity="error">
          {copy["current"]["error"]}
        </Alert>
      )}
      <div className="welcome-box">
        <h2>{copy["welcome"]}</h2>
        <div>{copy["description"]}</div>
        <span className="updates">{copy["updates"]}</span>
      </div>
      <h2>{copy["subheader"]}</h2>
      <div className="currency-form">
        <div className="form-column">
          <TextField
            id="outlined-basic"
            inputProps={{ type: "number", "data-testid": "currentsq" }}
            InputLabelProps={{
              shrink: true,
              sx: { "&.MuiInputLabel-shrink": { color: "black" } }
            }}
            label={copy["current"]["sq"]}
            variant="outlined"
            color="primary"
            fullWidth
            value={state.currentSQ ? state.currentSQ : undefined}
            onChange={(e) => {
              dispatch({
                type: SET_CURRENT_SQ,
                payload: parseInt(e.target.value)
              });
            }}
          />
          <TextField
            id="outlined-basic"
            inputProps={{ type: "number", "data-testid": "currentticket" }}
            InputLabelProps={{
              shrink: true,
              sx: { "&.MuiInputLabel-shrink": { color: "black" } }
            }}
            label={copy["current"]["ticket"]}
            variant="outlined"
            color="primary"
            fullWidth
            value={state.currentTickets ? state.currentTickets : undefined}
            onChange={(e) => {
              dispatch({
                type: SET_CURRENT_TICKETS,
                payload: parseInt(e.target.value)
              });
            }}
          />
        </div>
        <div className="form-column">
          <TextField
            id="date"
            inputProps={{ "data-testid": "savingsstart" }}
            label={copy["savings"]["begin"]}
            type="date"
            value={state.startDate ? state.startDate : undefined}
            fullWidth
            InputLabelProps={{
              shrink: true,
              sx: { "&.MuiInputLabel-shrink": { color: "black" } }
            }}
            onChange={(e) => {
              const momentStart = moment(e.target?.value, "YYYY-MM-DD");
              const momentToday = moment();
              if (!e.target.value) {
                dispatch({ type: "SET_FORM_ERRORS", payload: true });
              } else {
                dispatch({ type: "SET_FORM_ERRORS", payload: false });
                dispatch({ type: SET_START_DATE, payload: e.target.value });
              }
            }}
          />
          <TextField
            id="date"
            inputProps={{ "data-testid": "savingsend" }}
            label={copy["savings"]["end"]}
            type="date"
            fullWidth
            value={state.endDate ? state.endDate : undefined}
            InputLabelProps={{
              shrink: true,
              sx: { "&.MuiInputLabel-shrink": { color: "black" } }
            }}
            onChange={(e) => {
              dispatch({ type: SET_END_DATE, payload: e.target.value });
            }}
          />
        </div>
      </div>
      <h2 className="sq-earned">{copy["sq"]["earned"]}</h2>
      <div className="currency-form">
        <div className="form-column">
          <TextField
            id="outlined-basic"
            label={copy["mission"]["label"]}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
              sx: { "&.MuiInputLabel-shrink": { color: "black" } }
            }}
            sx={{ "&.Mui-disabled": { WebkitTextFillColor: "black" } }}
            disabled
            value={state.masterMissions}
            helperText={copy["mission"]["detail"]}
            FormHelperTextProps={{
              sx: { "&.Mui-disabled": { color: "black" } }
            }}
            fullWidth
          />
          <TextField
            id="outlined-basic"
            label={copy["login"]["daily"]["label"]}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
              sx: { "&.MuiInputLabel-shrink": { color: "black" } }
            }}
            disabled
            value={state.dailyLogins}
            helperText={copy["login"]["daily"]["detail"]}
            FormHelperTextProps={{
              sx: { "&.Mui-disabled": { color: "black" } }
            }}
            fullWidth
          />
          <TextField
            id="outlined-basic"
            inputProps={{ type: "number", "data-testid": "quest" }}
            InputLabelProps={{
              shrink: true,
              sx: { "&.MuiInputLabel-shrink": { color: "black" } }
            }}
            label={copy["quest"]}
            variant="outlined"
            color="primary"
            fullWidth
            sx={{ fontSize: "14px" }}
            value={state.questSQ ? state.questSQ : undefined}
            onChange={(e) => {
              dispatch({
                type: SET_QUEST_SQ,
                payload: parseInt(e.target.value)
              });
            }}
          />
          <div className="exclusions">
            <p>{copy["excludeoptions"]}</p>
            <FormControlLabel
              control={
                <Checkbox
                  checked={ticketChecked}
                  onChange={handleExclusionUpdate(ExcludeOptions.tickets)}
                  sx={{
                    fontSize: "12px",
                    "&.Mui-checked": {
                      color: "#DDA55B"
                    }
                  }}
                />
              }
              label={copy["alltickets"]}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={loginBonusesChecked}
                  onChange={handleExclusionUpdate(ExcludeOptions.loginBonuses)}
                  sx={{
                    "&.Mui-checked": {
                      color: "#DDA55B"
                    }
                  }}
                />
              }
              label={copy["login"]["both"]}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={masterMissionsChecked}
                  onChange={handleExclusionUpdate(
                    ExcludeOptions.masterMissions
                  )}
                  sx={{
                    "&.Mui-checked": {
                      color: "#DDA55B"
                    }
                  }}
                />
              }
              label={copy["mission"]["label"]}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={eventChecked}
                  onChange={handleExclusionUpdate(ExcludeOptions.events)}
                  sx={{
                    fontSize: "12px",
                    "&.Mui-checked": {
                      color: "#DDA55B"
                    }
                  }}
                />
              }
              label={copy["event"]["label"]}
            />
          </div>
        </div>
        <div className="form-column">
          <TextField
            id="outlined-basic"
            inputProps={{ type: "number", "data-testid": "cumulative" }}
            label={copy["login"]["total"]["label"]}
            InputLabelProps={{
              shrink: true,
              sx: { "&.MuiInputLabel-shrink": { color: "black" } }
            }}
            variant="outlined"
            color="primary"
            helperText={copy["login"]["total"]["detail"]}
            FormHelperTextProps={{ sx: { color: "black" } }}
            fullWidth
            sx={{ fontWeight: 600 }}
            value={
              state.cumulativeLoginsCount
                ? state.cumulativeLoginsCount
                : undefined
            }
            onChange={(e) => {
              dispatch({
                type: SET_CUMULATIVE_LOGINS_DATA,
                payload: parseInt(e.target.value)
              });
            }}
          />
          <TextField
            id="outlined-basic"
            inputProps={{ type: "number", "data-testid": "shopticket" }}
            label={copy["shop"]["label"]}
            InputLabelProps={{
              shrink: true,
              sx: { "&.MuiInputLabel-shrink": { color: "black" } }
            }}
            variant="outlined"
            color="primary"
            helperText={copy["shop"]["detail"]}
            FormHelperTextProps={{ sx: { color: "black" } }}
            fullWidth
            sx={{ fontWeight: 600 }}
            value={
              state.monthlyShopTickets ? state.monthlyShopTickets : undefined
            }
            onChange={(e) => {
              dispatch({
                type: SET_MONTHLY_SHOP_TICKETS,
                payload: parseInt(e.target.value)
              });
            }}
          />
          <TextField
            id="outlined-basic"
            label={copy["event"]["label"]}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
              sx: { "&.MuiInputLabel-shrink": { color: "black" } }
            }}
            disabled
            value={state.eventSQ}
            helperText={copy["event"]["detail"]}
            FormHelperTextProps={{
              sx: { "&.Mui-disabled": { color: "black" } }
            }}
            fullWidth
          />
        </div>
      </div>
      <Footer stepNum={1} linkTo="/rolltarget" linkBack="/" />
    </div>
  );
};

export default SummonCurrency;
