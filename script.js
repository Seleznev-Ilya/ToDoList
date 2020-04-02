let date = new Date();
// console.log(` ${date.getDate()} ${date.getMonth()}`);
// wrapperDate.innerHTML = week[today.getDay() - 1] + ' ' + today.getDate();
// 24 * 3600 * 1000
// new Date(monthNum.getTime() + 24 * 3600 * 1000).getDate()
const wrapperDate = document.querySelector('.date__wrapper');
const containerDate = document.querySelector('.date__container');
const week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
let monthNum;
if (date.getDay() !== 0) {
    monthNum = new Date(date.getTime() - date.getDay() * 24 * 3600 * 1000);
} else {
    monthNum = date.getDate();
}

function drawDate() {
    let today = new Date();
    let k = 1;
    if(document.documentElement.clientWidth <= 414) {
        if (date.getDay() !== 0) {
            containerDate.style.left = (-date.getDay() + 2) * (document.documentElement.clientWidth / 3) + 'px';
        } else {
            containerDate.style.left = (document.documentElement.clientWidth / 3) + 'px';
        }
    }
    for (let i = 0; i < week.length; i++) {
        function oneDay() {
            let dayItem = document.createElement('div');
            dayItem.classList.add('week_day');
            if(document.documentElement.clientWidth <= 414){
                dayItem.style.width = document.documentElement.clientWidth / 3 + 'px';
            }

            let day = document.createElement('p');
            day.classList.add('day');
            day.innerText = week[i];

            let monthWrapper = document.createElement('div');
            monthWrapper.classList.add('month_wrapper');
            let month = document.createElement('p');
            month.classList.add('month');
            // monthNum = new Date((today.getTime() - today.getDay() * 24 * 3600 * 1000) + (k++) * 24 * 3600 * 1000);
            month.innerText = new Date((today.getTime() - today.getDay() * 24 * 3600 * 1000) + (k++) * 24 * 3600 * 1000).getDate();
            dayItem.append(day);
            monthWrapper.append(month);
            dayItem.append(monthWrapper);
            wrapperDate.append(dayItem);
        }

        oneDay()
    }
}

drawDate();
console.log(document.documentElement.clientWidth / 3);