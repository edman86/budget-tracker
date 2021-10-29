export default function createDate(date) {
    const currentDate = new Date();
    const dataDate = new Date(date);

    dataDate.setHours(currentDate.getHours());
    dataDate.setMinutes(currentDate.getMinutes());
    dataDate.setSeconds(currentDate.getSeconds());
    
    return dataDate;
}