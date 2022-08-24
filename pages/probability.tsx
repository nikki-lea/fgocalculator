import { NextPage } from "next";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { useContext } from "react";
import { FgoContext } from "../contexts";

const Probability: NextPage = () => {
    const { t } = useTranslation();
    const {state} = useContext(FgoContext)
    return (
        <div className="probability-container">
            <h1>{t("probability.header")}</h1>
            <h2 className="subheader">{t("probability.subheader")}</h2>
            <div className="total-sq">
                <h2>{t("probability.sq")}</h2>
                <Image src="/saintquartz.svg" alt="saintquartz" height={36} width={36} />
                <span>{state.totalSQForBanner}</span>
            </div>
            <div className="probability-calculations">
                
            </div>

        </div>
    )
}

export default Probability;