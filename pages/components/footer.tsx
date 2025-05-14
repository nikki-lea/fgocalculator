import React, { useContext } from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { FgoContext } from "../../contexts";
import copy from "../../data/copy";
import moment from "moment";

type FooterProps = {
  stepNum: number;
  linkTo: string;
  linkBack: string;
};

const Footer: React.FC<FooterProps> = ({
  stepNum,
  linkTo = "/",
  linkBack = "/"
}: FooterProps) => {
  const { state, dispatch } = useContext(FgoContext);
  const router = useRouter();

  const onFormSubmitHandler = () => {
    const momentStart = moment(state.startDate, "YYYY-MM-DD");
    const momentToday = moment();
    if (linkTo === "/rolltarget") {
      if (
        !state.startDate ||
        !state.endDate ||
        momentStart.diff(momentToday, "days") < 0
      ) {
        dispatch({ type: "SET_FORM_ERRORS", payload: true });
        if (document && document.body && document.documentElement) {
          document.body.scrollTop = 0; // For Safari
          document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        }
      } else {
        dispatch({ type: "SET_FORM_ERRORS", payload: false });
        dispatch({ type: "HANDLE_FORM_SUBMIT" });
        router.push(linkTo);
      }
    } else if (linkTo === "/probability") {
      console.log(state.targetData.length);
      if (state.targetData.length <= 0) {
        dispatch({ type: "SET_FORM_ERRORS", payload: true });
        if (document && document.body && document.documentElement) {
          document.body.scrollTop = 0; // For Safari
          document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        }
      } else {
        dispatch({ type: "SET_FORM_ERRORS", payload: false });
        router.push(linkTo);
      }
    } else {
      router.push(linkTo);
    }
  };

  return (
    <div className="footer">
      {stepNum > 1 && (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => router.push(linkBack)}
        >
          {copy["back"]}
        </Button>
      )}
      {stepNum < 3 && (
        <div className="next-button">
          <Button
            variant="contained"
            color="success"
            onClick={onFormSubmitHandler}
          >
            {copy["next"]}
          </Button>
          <div>{`Step ${stepNum} of 2`}</div>
        </div>
      )}
    </div>
  );
};

export default Footer;
