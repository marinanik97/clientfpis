export function refromatDate(date){
    let dateTimeArray = date.split("T");
    let dateArray = dateTimeArray[0].split("-");
    return `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`
}

export function formatDate(date){
    let formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    return formattedDate;
}
