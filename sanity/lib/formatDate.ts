const formatDate = (inputDate: string) => {
    const date = new Date(inputDate);
    console.log(date);
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
}
export const formatDateLong = (inputDate: string) => {
    const date = new Date(inputDate);
    console.log(date);
    return date.toLocaleString('default', { day: 'numeric', month: 'long', year: 'numeric' });
}
export const formatDateShort = (inputDate: string) => {
    const date = new Date(inputDate);
    console.log(date);
    return date.toLocaleString('default', { day: 'numeric', month: 'short', year: 'numeric' });
}
export const formatTime = (inputDate: string) => {
    const date = new Date(inputDate);
    console.log(date);
    return date.toLocaleTimeString('default', { hour: '2-digit', minute: '2-digit' });
}

export default formatDate;