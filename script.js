// let date = new Date();
// console.log(` ${date.getDate()} ${date.getMonth()}`);
const wrapperDate = document.querySelector('.date__wrapper');
const week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
function drawDate() {
    let today = new Date();
    wrapperDate.innerHTML = week[today.getDay() - 1];
}
drawDate();