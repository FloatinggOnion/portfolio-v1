const formatDate = (inputDate: string) => {
    const date = new Date(inputDate);
    console.log(date);
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
}

export default formatDate;