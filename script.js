const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon'],
    wrapperDate = document.querySelector('.date__wrapper'), containerDate = document.querySelector('.date__container'),
    buttonTodayL = document.querySelector('.date_left_today'),
    buttonTodayR = document.querySelector('.date_right_today'),
    today = new Date();
let time,
    timer = setTimeout(function step() {
        if (today.getHours() === 23 && today.getMinutes() === 59) {
            setTimeout(location.reload(), 59500);
        }
        timer = setTimeout(step, 1000);
    }, 1000);
window.onresize = function () {
    if (time)
        clearTimeout(time);
    time = setTimeout(function () {
        // location.reload();
    }, 123);
};

function drawDates() {
    let k = 0;
    for (let i = 0; i < week.length; i++) {
        let dayItem = document.createElement('div');
        dayItem.classList.add('week_day');
        dayItem.classList.add(`week_day${i}`);
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
        if (today.getDay() !== 0) {
            month.innerText = new Date((today.getTime() - today.getDay() * 24 * 3600 * 1000) + (k++) * 24 * 3600 * 1000).getDate();
        } else {
            month.innerText = new Date((today.getTime() - 8 * 24 * 3600 * 1000) + (k++) * 24 * 3600 * 1000).getDate();
        }
        dayItem.append(day);
        monthWrapper.append(month);
        dayItem.append(monthWrapper);
        wrapperDate.append(dayItem);
    }
}

function highlightDay() {
    let thisDayWrapper = document.querySelector(".date__wrapper");
    if (today.getDay() !== 0) {
        thisDayWrapper.children[today.getDay()].children[1].style.fontWeight = 'bold';
        thisDayWrapper.children[today.getDay()].style.color = 'Tomato';
    } else {
        thisDayWrapper.children[7].children[1].style.fontWeight = 'bold';
        thisDayWrapper.children[7].style.color = 'Tomato';
    }
    for (let i = 0; i < week.length; i++) {
        if (i < today.getDay()) {
            document.querySelector(".date__wrapper").children[i].children[0].style.color = 'grey';
            document.querySelector(".date__wrapper").children[i].children[1].style.color = 'grey';
            document.querySelector(".date__wrapper").children[i].children[1].style.border = 2 + 'px ' + 'solid ' + 'grey';
        }
    }
}

function moveRelevantDate() {
    if (document.documentElement.clientWidth <= 414) {
        if (today.getDay() !== 0) {
            containerDate.style.left = (-today.getDay() + 1) * (document.documentElement.clientWidth / 3) + 'px';
        } else {
            containerDate.style.left = (-document.documentElement.clientWidth / 3) * 5 + 'px';
        }
    } else if (document.documentElement.clientWidth > 414) {
        if (today.getDay() !== 0) {
            containerDate.style.left = (-today.getDay() + 1) * (348 / 3) + 'px';
        } else {
            containerDate.style.left = (-348 / 3) * 6 + 'px';
        }
    }
}

drawDates();
highlightDay();
moveRelevantDate();
wrapperDate.addEventListener('click', (event) => {
    let otherDay = event.target;
    for (let i = 0; i < week.length; i++) {
        if (otherDay.closest(`.week_day${i}`)) {
            let targetContainer = document.getElementsByClassName(`week_day${i}`)[0].parentNode.parentNode;
            if (document.documentElement.clientWidth <= 414) {
                targetContainer.style.left = -(document.documentElement.clientWidth / 3) * (i - 1) + 'px';
            } else {
                targetContainer.style.left = -(348 / 3) * (i - 1) + 'px';
            }
        }
    }
});
buttonTodayL.addEventListener('click', moveRelevantDate);
buttonTodayR.addEventListener('click', moveRelevantDate);

let mainButton = document.querySelector('.main__button');
let mainList = document.querySelector('.main__list_container');
let listReminder  = document.querySelector('.list_reminder');

mainButton.addEventListener('click', openAddNew);
mainButton.addEventListener('click', changeMainButton);

let buttonSwitch = 0, buttonSwitchTwo = 0;
function openAddNew() {

    if (buttonSwitch === 0) {
        if (document.documentElement.clientWidth <= 414) {
            mainList.style.left = document.documentElement.clientWidth * 0.9 + 'px';
        } else {
            mainList.style.left = 348 * .9 + 'px';
        }
        buttonSwitch = 1;
    } else {
        mainList.style.left = 0 + 'px';
        buttonSwitch = 0;
    }
}
function changeMainButton() {
    let crossOne = document.querySelector('.main__button_before');
    let crossTwo = document.querySelector('.main__button_after');
    let buttonSubmit = document.querySelector('.main__button_text');

    if (buttonSwitchTwo === 0) {
        crossOne.style.opacity = 0;
        crossTwo.style.opacity = 0;
        setTimeout(() => {
            crossOne.style.display = 'none';
            crossTwo.style.display = 'none';
            mainButton.style.width = 155 + 'px';
            buttonSubmit.style.opacity = 1;
            buttonSubmit.classList.toggle('hide');
        }, 50);
        setTimeout(()=>{
            buttonSubmit.style.fontSize = 23 + 'px';
        }, 200);

        buttonSwitchTwo = 1;
    } else {
        setTimeout(() => {
            crossOne.style.opacity = 1;
            crossTwo.style.opacity = 1;
            mainButton.style.width = 55 + 'px';
            buttonSubmit.classList.toggle('hide');
        }, 100);
        crossOne.style.display = 'block';
        crossTwo.style.display = 'block';
        buttonSubmit.style.opacity = 0;
        buttonSubmit.style.fontSize = 14 + 'px';

        buttonSwitchTwo = 0;
    }
}





let testObj = {
    dane: true,
    date: "2020-04-10T16:55:20.319Z",
    dateEnd: "2011-01-01T12:00:00.000Z",
    heading: "JS",
    description: "повторить замыкание, сделать пару задачь",
};
console.log(new Date(testObj.date).getHours(), new Date(testObj.date).getMinutes());

function drawRemainder() {
    let reminder = document.createElement('div');
    reminder.classList.add('reminder');
    if (document.documentElement.clientWidth <= 414) {
        listReminder.style.width = document.documentElement.clientWidth * .75 + 'px';
    } else {
        listReminder.style.width = 348 * .75 + 'px';
    }



    let reminderItemText = document.createElement('div');
    reminderItemText.classList.add('reminderItemText');
    reminder.append(reminderItemText);

    let h2 = document.createElement('h3');
    h2.classList.add('reminderH2');
    h2.innerText = testObj.heading;
    reminderItemText.append(h2);


    let reminderDescription = document.createElement("div");
    reminderDescription.classList.add('reminderDescContainer');
    reminderItemText.append(reminderDescription);

    let desc = document.createElement('p');
    desc.classList.add('reminderDesc');
    desc.innerText = testObj.description;
    reminderDescription.append(desc);



    let reminderItemData = document.createElement('div');
    reminderItemData.classList.add('reminderItemData');
    reminder.append(reminderItemData);


    let reminderCheck = document.createElement("div");
    reminderCheck.classList.add('reminderCheck');
    reminderItemData.append(reminderCheck);

    let inputImg = document.createElement('input');
    inputImg.id = 'idImg';
    inputImg.type = 'checkbox';
    reminderCheck.append(inputImg);

    let labelImg = document.createElement('label');
    labelImg.classList.add('labelImg');
    labelImg.setAttribute( 'for', 'idImg' );
    if (testObj.dane === true){
        labelImg.style.backgroundImage = "url('image/unchecked.png')";
    } else {
        labelImg.style.backgroundImage = "url('image/checked.png')";
    }
    reminderCheck.append(labelImg);


    let reminderTimeTo = document.createElement("div");
    reminderTimeTo.classList.add('reminderTimeTo');
    reminderItemData.append(reminderTimeTo);

    let timerImg1 = document.createElement('div');
    timerImg1.classList.add('timerImg1');
    reminderTimeTo.append(timerImg1);

    let timerTime = document.createElement('span');
    timerTime.classList.add('timerTime');
    if ( new Date(testObj.dateEnd).getMinutes() < 10){
        timerTime.innerText = new Date(testObj.dateEnd).getHours() + ':0' +  new Date(testObj.dateEnd).getMinutes();
    }else {
        timerTime.innerText = new Date(testObj.dateEnd).getHours() + ':' +  new Date(testObj.dateEnd).getMinutes();
    }
    reminderTimeTo.append(timerTime);

    listReminder.append(reminder);
}



drawRemainder();




















