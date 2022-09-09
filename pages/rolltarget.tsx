import {
  Alert,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ToggleButton,
  ToggleButtonGroup,
  Button,
  Autocomplete,
  TextField
} from "@mui/material";
import type { NextPage } from "next";
import { useContext, useState } from "react";
import { ADD_TARGET_DATA, FgoContext, TargetOptions } from "../contexts";
import { TargetDataType } from "../types/contexts";
import Footer from "./components/footer";
import servantData from "../data/servantData";
import copy from "../data/copy";

const RollTarget: NextPage = () => {
  const { state, dispatch } = useContext(FgoContext);
  const [error, setError] = useState(false);
  const [currentTargetData, setCurrentTargetData] = useState({
    type: "",
    rarity: 0,
    shared: 0
  } as TargetDataType);
  const { targetData } = state;

  const genericClickHandler =
    (key: string) =>
    (e: React.MouseEvent<HTMLElement, MouseEvent>, value: string | number) => {
      setCurrentTargetData({ ...currentTargetData, [key]: value });
    };
  const typeHandler = genericClickHandler("type");
  const rarityHandler = genericClickHandler("rarity");
  const sharedHandler = genericClickHandler("shared");

  const autoCompleteOptions = Object.keys(servantData);

  const renderListItem = ({ type, rarity, name, shared }: TargetDataType) => {
    const typeCopy =
      type === TargetOptions.ce ? copy["craftessence"] : copy["servant"];
    const sharedCopy =
      shared && shared > 1
        ? `${shared.toString()} total ${rarity.toString()}*`
        : `Solo ${rarity.toString()}* rate up`;
    return (
      <>
        <ListItem>
          <ListItemAvatar>
            <Avatar src="/saintquartz.svg" />
          </ListItemAvatar>
          <ListItemText
            primary={name}
            secondary={`${rarity}* ${typeCopy} - ${sharedCopy}`}
          />
        </ListItem>
      </>
    );
  };

  const onSubmitHandler = () => {
    if (currentTargetData?.type && currentTargetData?.rarity) {
      setError(false);
      dispatch({ type: ADD_TARGET_DATA, payload: currentTargetData });
      setCurrentTargetData({ type: "", rarity: 0, shared: 0 });
    } else {
      setError(true);
    }
  };

  return (
    <div className="target-container">
      <h1>{copy["target"]["header"]}</h1>
      <div>{copy["target"]["subheader"]}</div>
      {targetData.length > 0 ? (
        <div className="targets-added">
          <List
            sx={{
              width: "100%",
              maxWidth: 500,
              m: "0 auto",
              border: "1px solid gray",
              borderRadius: "5px",
              bgcolor: "background.paper"
            }}
          >
            {targetData.map((item) =>
              renderListItem({
                type: item.type,
                rarity: item.rarity,
                shared: item.shared,
                name: item.name
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
            {copy["target"]["error"]}
          </Alert>
        )}
        <div className="target-type">
          <p>{copy["target"]["type"]}</p>
          <ToggleButtonGroup
            value={currentTargetData?.type}
            exclusive
            color="success"
            size="large"
            aria-label="large toggle button group"
            onChange={typeHandler}
          >
            <ToggleButton value={TargetOptions.ce}>
              {copy["craftessence"]}
            </ToggleButton>
            <ToggleButton value={TargetOptions.servant}>
              {copy["servant"]}
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className="target-rarity">
          <p>{copy["target"]["rarity"]}</p>
          <ToggleButtonGroup
            value={currentTargetData?.rarity}
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
          <p>{copy["target"]["sharedtext"]}</p>
          <ToggleButtonGroup
            value={currentTargetData?.shared}
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
        {
          currentTargetData.type === TargetOptions.servant &&
          <div className="target-name">
                <Autocomplete
                  disablePortal
                  onChange={(event: any, newValue: string | null) => setCurrentTargetData({ ...currentTargetData, name: newValue || ""})}
                  id="combo-box-demo"
                  options={autoCompleteOptions}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label={copy["servantname"]} />}
                />
          </div>
        }
        <div className="add-button">
          <Button
            variant="contained"
            color="info"
            size="large"
            onClick={() => onSubmitHandler()}
          >
            {copy["target"]["add"]}
          </Button>
        </div>
      </div>
      <Footer stepNum={2} linkTo="/probability" linkBack="/" />
    </div>
  );
};

export default RollTarget;
