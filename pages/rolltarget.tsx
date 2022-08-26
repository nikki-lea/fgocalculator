import {
  Alert,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ToggleButton,
  ToggleButtonGroup,
  Button
} from "@mui/material";
import type { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { useContext, useState } from "react";
import { ADD_TARGET_DATA, FgoContext, TargetOptions } from "../contexts";
import { TargetDataType } from "../types/contexts";
import Footer from "./components/footer";

const RollTarget: NextPage = () => {
  const { state, dispatch } = useContext(FgoContext);
  const [error, setError] = useState(false);
  const [currentTargetData, setCurrentTargetData] = useState({
    type: "",
    rarity: 0
  } as TargetDataType);
  const { t } = useTranslation();
  const { targetData } = state;

  const genericClickHandler =
    (key: string) =>
    (e: React.MouseEvent<HTMLElement, MouseEvent>, value: string | number) => {
      setCurrentTargetData({ ...currentTargetData, [key]: value });
    };
  const typeHandler = genericClickHandler("type");
  const rarityHandler = genericClickHandler("rarity");
  const sharedHandler = genericClickHandler("shared");

  const renderListItem = ({ type, rarity, shared }: TargetDataType) => {
    const typeCopy =
      type === TargetOptions.ce ? t("craftessence") : t("servant");
    const sharedCopy =
      shared && shared > 1
        ? t("target.shared", {
            shared: shared.toString(),
            rarity: rarity.toString()
          })
        : t("target.solo", { rarity: rarity.toString() });
    return (
      <>
        <ListItem>
          <ListItemAvatar>
            <Avatar src="/saintquartz.svg" />
          </ListItemAvatar>
          <ListItemText
            primary={`${rarity}* ${typeCopy}`}
            secondary={sharedCopy}
          />
        </ListItem>
      </>
    );
  };

  const onSubmitHandler = () => {
    if (currentTargetData.type && currentTargetData.rarity) {
      setError(false);
      dispatch({ type: ADD_TARGET_DATA, payload: currentTargetData });
      setCurrentTargetData({ type: "", rarity: 0 });
    } else {
      setError(true);
    }
  };

  return (
    <div className="target-container">
      <h1>{t("target.header")}</h1>
      <h2>{t("target.subheader")}</h2>
      {targetData.length > 0 ? (
        <div className="targets-added">
          <List
            sx={{
              width: "100%",
              maxWidth: 500,
              m: "30px",
              bgcolor: "background.paper"
            }}
          >
            {targetData.map((item) =>
              renderListItem({
                type: item.type,
                rarity: item.rarity,
                shared: item.shared
              })
            )}
          </List>
        </div>
      ) : (
        ""
      )}
      <div className="target-selections">
        {error && (
          <Alert sx={{ mb: "10px" }} severity="error">
            {t("target.error")}
          </Alert>
        )}
        <div className="target-type">
          <p>{t("target.type")}</p>
          <ToggleButtonGroup
            value={currentTargetData.type}
            exclusive
            color="success"
            size="large"
            aria-label="large toggle button group"
            onChange={typeHandler}
          >
            <ToggleButton value={TargetOptions.ce}>
              {t("craftessence")}
            </ToggleButton>
            <ToggleButton value={TargetOptions.servant}>
              {t("servant")}
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className="target-rarity">
          <p>{t("target.rarity")}</p>
          <ToggleButtonGroup
            value={currentTargetData.rarity}
            exclusive
            color="success"
            size="large"
            aria-label="large toggle button group"
            onChange={rarityHandler}
          >
            <ToggleButton value={5}>5*</ToggleButton>
            <ToggleButton value={4}>4*</ToggleButton>
            <ToggleButton value={3}>3*</ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className="target-shared">
          <p>{t("target.sharedtext")}</p>
          <ToggleButtonGroup
            value={currentTargetData.shared}
            exclusive
            color="success"
            size="large"
            aria-label="large toggle button group"
            onChange={sharedHandler}
          >
            <ToggleButton value={2}>2</ToggleButton>
            <ToggleButton value={1}>1</ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className="add-button">
          <Button
            variant="contained"
            color="info"
            size="large"
            onClick={() => onSubmitHandler()}
          >
            {t("add")}
          </Button>
        </div>
      </div>
      <Footer stepNum={2} linkTo="/probability" linkBack="/" />
    </div>
  );
};

export default RollTarget;
