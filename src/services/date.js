import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/es';

dayjs.locale('es');
dayjs.extend(utc);

export const transformTimezone = (isoDateString) => {
    const instance = dayjs(isoDateString).utcOffset('-03:00');
    return instance.format().replace('-03:00', '-0300');
};

export const dateFormat = date => dayjs(date).utcOffset('-3').format('DD/MM/YYYY');

export const newDate = date => date ? dayjs(date).utcOffset('-3').$d : dayjs().utcOffset('-3').$d;
