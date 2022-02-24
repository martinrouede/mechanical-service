import { dateFormat, newDate, dateBetween } from './date';

export const filterDuplicates = (array) => {
    return array.filter((value, index, self) =>
        index === self.findIndex((e) => (
            e.clientName === value.clientName
        ))
    )
}

export const filterServices = (services, startDate, endDate) => {
    return services.filter(e => {
        return e.date &&
            dateBetween(dateFormat(startDate, 'YYYY-MM-DD'), e.date, dateFormat(endDate, 'YYYY-MM-DD'))
    }).sort((a, b) => newDate(b.date) - newDate(a.date));
}