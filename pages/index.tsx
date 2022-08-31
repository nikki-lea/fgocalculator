import type { NextPage } from "next";
import React, { useContext } from "react";
import { TextField, FormControlLabel, Checkbox, Alert } from "@mui/material";
import Footer from "./components/footer";
import {
  ADD_EXCLUDE_OPTION,
  FgoContext,
  REMOVE_EXCLUDE_OPTION,
  SET_CUMULATIVE_LOGINS_DATA,
  SET_CURRENT_SQ,
  SET_CURRENT_TICKETS,
  SET_END_DATE,
  SET_EVENT_SQ,
  SET_FORM_ERRORS,
  SET_MONTHLY_SHOP_TICKETS,
  SET_QUEST_SQ,
  SET_START_DATE
} from "../contexts";
import { ExcludeOptions } from "../contexts";
import calcJPEventSQ from "../utils/calcJPEventSQ";
import copy from '../data/copy';

const StyledCheckbox = ({
  onChangeHandler
}: {
  onChangeHandler: React.ChangeEventHandler<HTMLInputElement>;
}) => (
  <Checkbox
    onChange={onChangeHandler}
    sx={{
      "&.Mui-checked": {
        color: "#DDA55B"
      }
    }}
  />
);

const SummonCurrency: NextPage = () => {
  const { state, dispatch } = useContext(FgoContext);

  const handleCalcEventSQ = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { startDate, endDate } = state;
    if (e.target.checked && startDate && endDate) {
      dispatch({
        type: SET_FORM_ERRORS,
        payload: false
      });
      dispatch({
        type: SET_EVENT_SQ,
        payload: calcJPEventSQ({ startDate, endDate })
      });
    } else if (e.target.checked) {
      dispatch({
        type: SET_FORM_ERRORS,
        payload: true
      });
    }
  };

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
      <h1>{copy["current"]["general"]}</h1>
      <div className="currency-form">
        <div className="form-column">
          <TextField
            id="outlined-basic"
            inputProps={{ type: "number", "data-testid": "currentsq" }}
            label={copy["current"]["sq"]}
            variant="outlined"
            color="primary"
            fullWidth
            defaultValue={state.currentSQ || ""}
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
            label={copy["current"]["ticket"]}
            variant="outlined"
            color="primary"
            fullWidth
            defaultValue={state.currentTickets || ""}
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
            value={state.startDate || ""}
            fullWidth
            InputLabelProps={{ shrink: true }}
            onChange={(e) => {
              dispatch({ type: SET_START_DATE, payload: e.target.value });
            }}
          />
          <TextField
            id="date"
            inputProps={{ "data-testid": "savingsend" }}
            label={copy["savings"]["end"]}
            type="date"
            fullWidth
            value={state.endDate || undefined}
            InputLabelProps={{ shrink: true }}
            onChange={(e) => {
              dispatch({ type: SET_END_DATE, payload: e.target.value });
            }}
          />
        </div>
      </div>
      <h1 className="sq-earned">{copy["sq"]["earned"]}</h1>
      <div className="currency-form">
        <div className="form-column">
          <TextField
            id="outlined-basic"
            label={copy["mission"]["label"]}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            sx={{ "&.Mui-disabled": { color: "black" } }}
            disabled
            value={state.masterMissions || undefined}
            helperText={copy["mission"]["detail"]}
            fullWidth
          />
          <TextField
            id="outlined-basic"
            label={copy["login"]["daily"]["label"]}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            disabled
            value={state.dailyLogins || undefined}
            helperText={copy["login"]["daily"]["detail"]}
            fullWidth
          />
          <TextField
            id="outlined-basic"
            inputProps={{ type: "number", "data-testid": "quest" }}
            label={copy["quest"]}
            variant="outlined"
            color="primary"
            fullWidth
            defaultValue={state.questSQ || undefined}
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
                <StyledCheckbox
                  onChangeHandler={handleExclusionUpdate(
                    ExcludeOptions.tickets
                  )}
                />
              }
              label={copy["alltickets"]}
            />
            <FormControlLabel
              control={
                <StyledCheckbox
                  onChangeHandler={handleExclusionUpdate(
                    ExcludeOptions.tickets
                  )}
                />
              }
              label={copy["login"]["both"]}
            />
            <FormControlLabel
              control={
                <StyledCheckbox
                  onChangeHandler={handleExclusionUpdate(
                    ExcludeOptions.masterMissions
                  )}
                />
              }
              label={copy["mission"]["label"]}
            />
          </div>
        </div>
        <div className="form-column">
          <TextField
            id="outlined-basic"
            inputProps={{ type: "number", "data-testid": "cumulative" }}
            label={copy["login"]["total"]["label"]}
            variant="outlined"
            color="primary"
            helperText={copy["login"]["total"]["detail"]}
            fullWidth
            defaultValue={state.cumulativeLoginsCount || undefined}
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
            variant="outlined"
            color="primary"
            helperText={copy["shop"]["detail"]}
            fullWidth
            defaultValue={state.monthlyShopTickets || ""}
            onChange={(e) => {
              dispatch({
                type: SET_MONTHLY_SHOP_TICKETS,
                payload: parseInt(e.target.value)
              });
            }}
          />
          <TextField
            id="outlined-basic"
            inputProps={{ type: "number", "data-testid": "event" }}
            label={copy["event"]}
            variant="outlined"
            color="primary"
            fullWidth
            value={state.eventSQ || ""}
            onChange={(e) => {
              dispatch({
                type: SET_EVENT_SQ,
                payload: parseInt(e.target.value)
              });
            }}
          />
          <div>
            <FormControlLabel
              control={<StyledCheckbox onChangeHandler={handleCalcEventSQ} />}
              label={copy["sq"]["addevent"]}
            />
          </div>
        </div>
      </div>
      <Footer stepNum={1} linkTo="/rolltarget" linkBack="/" />
    </div>
  );
};

export default SummonCurrency;
