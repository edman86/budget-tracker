export default function sortDate(arr) {
    return arr.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).reverse();
}