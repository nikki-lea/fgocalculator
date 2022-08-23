import { Alert, Button, ButtonGroup } from "@mui/material";
import type { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { useContext, useState } from "react";
import { ADD_TARGET_DATA, FgoContext, TargetOptions } from "../contexts";
import { rarityType, sharedType, TargetDataType, typeType } from "../types/contexts";

const RollTarget: NextPage = () => {
  const {state, dispatch} = useContext(FgoContext)
  const [error, setError] = useState(false);
  const [servantData, setServantData] = useState({type: "" as typeType, rarity: 0 as rarityType});
  const { t } = useTranslation();
  
  const genericClickHandler = (key: string) => (value: typeType | rarityType | sharedType) => {
    setServantData({...servantData, [key]: value})
  };
  const typeHandler = genericClickHandler("type");
  const rarityHandler = genericClickHandler("rarity");
  const sharedHandler = genericClickHandler("shared");

  const onSubmitHandler = () => {
    if (servantData.type && servantData.rarity ) {
      setError(false);
      dispatch({ type: ADD_TARGET_DATA, payload: servantData });
    } else {
      setError(true);
    }
  }

  return (
    <div className="target-container">
      <h1>{t("target.header")}</h1>
      <h2>{t("target.subheader")}</h2>
      <div className="target-selections">
      {error && <Alert sx={{ mb: "10px" }} severity="error">{t("target.error")}</Alert>}
      <ButtonGroup variant="contained" color="success" size="large" aria-label="large outlined success button group">
        <Button onClick={() => typeHandler(TargetOptions.ce)}>{t("craftessence")}</Button>
        <Button onClick={() => typeHandler(TargetOptions.servant)}>{t("servant")}</Button>
      </ButtonGroup>
      <ButtonGroup variant="contained" color="success" size="large" aria-label="outlined success button group">
        <Button onClick={() => rarityHandler(5)}>5*</Button>
        <Button onClick={() => rarityHandler(4)}>4*</Button>
        <Button onClick={() => rarityHandler(3)}>3*</Button>
      </ButtonGroup>
      <ButtonGroup variant="contained" color="success" size="large" aria-label="outlined success button group">
        <Button onClick={() => sharedHandler(2)}>2</Button>
        <Button onClick={() => sharedHandler(1)}>1</Button>
      </ButtonGroup>
      </div>
      <Button variant="contained" color="info" size="large" onClick={() => onSubmitHandler()}>{t("add")}</Button>

    </div>
  )
};

export default RollTarget;
