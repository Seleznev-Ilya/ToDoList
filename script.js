let today = new Date();
const wrapperDate = document.querySelector('.date__wrapper');
const containerDate = document.querySelector('.date__container');
const week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
drawDate();
let resize = function (e) {
    console.log(e);
    location.reload();
};
(function () {
    let time;
    window.onresize = function (e) {
        if (time)
            clearTimeout(time);
        time = setTimeout(function () {
            resize(e);
        }, 100);
    }
})();

function oneDay() {
    let k = 1;
    for (let i = 0; i < week.length; i++) {
        let dayItem = document.createElement('div');
        dayItem.classList.add('week_day');
        if (document.documentElement.clientWidth <= 414) {
            dayItem.style.width = document.documentElement.clientWidth / 3 + 'px';
        } else if (document.documentElement.clientWidth > 414) {
            dayItem.style.width = (348 / 3) + 'px';
        }

        let day = document.createElement('p');
        day.classList.add('day');
        day.innerText = week[i];

        let monthWrapper = document.createElement('div');
        monthWrapper.classList.add('month_wrapper');
        let month = document.createElement('p');
        month.classList.add('month');
        month.innerText = new Date((today.getTime() - today.getDay() * 24 * 3600 * 1000) + (k++) * 24 * 3600 * 1000).getDate();
        dayItem.append(day);
        monthWrapper.append(month);
        dayItem.append(monthWrapper);
        wrapperDate.append(dayItem);
    }
}
function highlightDay() {
    let thisDayWrapper = document.querySelector(".date__wrapper");
    thisDayWrapper.children[today.getDay() - 1].children[1].style.fontWeight = 'bold';
    thisDayWrapper.children[today.getDay() - 1].style.color = 'red';
}
function drawDate() {
    if (document.documentElement.clientWidth <= 414) {
        if (today.getDay() !== 0) {
            containerDate.style.left = (-today.getDay() + 2) * (document.documentElement.clientWidth / 3) + 'px';
        } else {
            containerDate.style.left = (document.documentElement.clientWidth / 3) + 'px';
        }
    } else if (document.documentElement.clientWidth > 414) {
        if (today.getDay() !== 0) {
            containerDate.style.left = (-today.getDay() + 2) * (348 / 3) + 'px';
        } else {
            containerDate.style.left = 348 + 'px';
        }
    }
    oneDay();
    highlightDay()
}


