import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/es';

dayjs.locale('es');
dayjs.extend(utc);

export const dateFormat = (date, format) => dayjs(date).utcOffset('-3').format(format);

export const newDate = date => date ? dayjs(date).utcOffset('-3').$d : dayjs().utcOffset('-3').$d;

export const dateBetween = (startDate, date, endDate) => startDate <= date && date <= endDate
