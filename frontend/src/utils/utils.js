export const base64flag = 'data:image/png;base64,'
export const ADMIN = 'ADMIN'
export const USER = 'USER'

export const changeFormatToDDMMYYYY = (date) => {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    return day + "/" + month + "/" + year;
}

