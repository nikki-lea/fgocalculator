import moment from 'moment';
import { ShopTicketPropTypes } from '../types/utils/calcShopTicketSQ';

const calcShopTicketSQ = ({startDate, endDate, monthlyShopTickets} : ShopTicketPropTypes): number => {
    const momentStart = moment(startDate, "YYYY-MM-DD");
    const momentEnd = moment(endDate, "YYYY-MM-DD");
    const totalMonths = momentEnd.diff(momentStart, "months");
    return totalMonths * monthlyShopTickets * 3;
};

export default calcShopTicketSQ;