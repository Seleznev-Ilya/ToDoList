const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon'],
    wrapperDate = document.querySelector('.date__wrapper'), containerDate = document.querySelector('.date__container'),
    buttonTodayL = document.querySelector('.date_left_today'),
    buttonTodayR = document.querySelector('.date_right_today'),
    today = new Date();
let timer = function () {
    let rHours = today.getHours(), rMinutes = today.getMinutes(), rSeconds = today.getSeconds(),
        timeoutReload = (24 * 3600 * 1000) - (((rHours * 3600) + (rMinutes * 60) + rSeconds) * 1000);
    setTimeout(() => location.reload(), timeoutReload);
};
timer();
let documentWidth = document.documentElement.clientWidth, time;
window.onresize = function () {
    if (time)
        clearTimeout(time);
    time = setTimeout(function () {
        if (documentWidth !== document.documentElement.clientWidth) {
            location.reload();
        }
    }, 123);
};

function visualizationDates() {
    function drawDates() {
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
                month.innerText = new Date((today.getTime() - today.getDay() * 24 * 3600 * 1000) + (i) * 24 * 3600 * 1000).getDate();
                dayItem.dataset.storeDates = new Date((today.getTime() - today.getDay() * 24 * 3600 * 1000) + (i) * 24 * 3600 * 1000).getDate() + ' ' +
                    new Date((today.getTime() - today.getDay() * 24 * 3600 * 1000) + (i) * 24 * 3600 * 1000).getMonth() + ' ' +
                    new Date((today.getTime() - today.getDay() * 24 * 3600 * 1000) + (i) * 24 * 3600 * 1000).getDay() + ' ' +
                    today.getFullYear();
                dayItem.dataset.day = i;
            } else {
                month.innerText = new Date((today.getTime() - 7 * 24 * 3600 * 1000) + (i) * 24 * 3600 * 1000).getDate();
                dayItem.dataset.storeDates = new Date((today.getTime() - 7 * 24 * 3600 * 1000) + (i) * 24 * 3600 * 1000).getDate() + ' ' +
                    new Date((today.getTime() - 7 * 24 * 3600 * 1000) + (i) * 24 * 3600 * 1000).getMonth() + ' ' +
                    new Date((today.getTime() - 7 * 24 * 3600 * 1000) + (i) * 24 * 3600 * 1000).getDay() + ' ' +
                    today.getFullYear();
                dayItem.dataset.day = i;
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
    }

    function emphasizeLastDays() {
        for (let i = 0; i < week.length; i++) {
            if (i < today.getDay() && i < 7 || i < today.getDay() && i < 8) {
                document.querySelector(".date__wrapper").children[i].children[0].style.color = 'grey';
                document.querySelector(".date__wrapper").children[i].children[1].style.color = 'grey';
                document.querySelector(".date__wrapper").children[i].children[1].style.border = 2 + 'px ' + 'solid ' + 'grey';
            }
        }
    }

    drawDates();
    emphasizeLastDays();
    highlightDay();
}

visualizationDates();

function moveRelevantDate() {
    if (document.documentElement.clientWidth <= 414) {
        if (today.getDay() !== 0) {
            containerDate.style.left = (-today.getDay() + 1) * (document.documentElement.clientWidth / 3) + 'px';
        } else {
            containerDate.style.left = (-document.documentElement.clientWidth / 3) * 6 + 'px';
        }
    } else if (document.documentElement.clientWidth > 414) {
        if (today.getDay() !== 0) {
            containerDate.style.left = (-today.getDay() + 1) * (348 / 3) + 'px';
        } else {
            containerDate.style.left = (-348 / 3) * 6 + 'px';
        }
    }
    let arrayMove = JSON.parse(localStorage.getItem(JSON.stringify(today.getDate() + ' ' + today.getMonth() + ' ' + today.getDay() + ' ' + today.getFullYear())));
    listReminder.innerHTML = '';
    // massageDelete();
    for (let key in arrayMove) {
        drawRemainder(arrayMove[key], key);
    }
}


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
let mainButton = document.querySelector('.main__button'), mainList = document.querySelector('.main__list_container'),
    listReminder = document.querySelector('.list_reminder');
mainButton.addEventListener('click', openAddNew);
mainButton.addEventListener('click', changeMainButton);
let buttonSwitch = 0, buttonSwitchTwo = 0;
moveRelevantDate();

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
        setTimeout(() => {
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

wrapperDate.addEventListener('click', (event) => {
    let otherDay = event.target;
    for (let i = 0; i < week.length; i++) {
        if (otherDay.closest(`.week_day${i}`)) {
            let targetDataSetStore = document.getElementsByClassName(`week_day${i}`)[0].dataset.storeDates;
            if (localStorage.getItem(JSON.stringify(targetDataSetStore)) !== null) {
                let arrayWeek = [];
                arrayWeek = JSON.parse(localStorage.getItem(JSON.stringify(targetDataSetStore)));
                listReminder.innerHTML = '';
                for (let key in arrayWeek) {
                    drawRemainder(arrayWeek[key], key);
                }
            } else {
                listReminder.innerHTML = '';
                // добавлять надпись, что открывается в начале пустого документа, но это не первоочередно
            }
        }
    }
});

function deletLocal() {
    localStorage.removeItem(JSON.stringify(today.getDate() + ' ' + today.getMonth() + ' ' + today.getDay() + ' ' + today.getFullYear()));
}; // deletLocal();

function newDayDrawIt() {
    if (localStorage.getItem(JSON.stringify(today.getDate() + ' ' + today.getMonth() + ' ' + today.getDay() + ' ' + today.getFullYear())) !== null) {
        array = JSON.parse(localStorage.getItem(JSON.stringify(today.getDate() + ' ' + today.getMonth() + ' ' + today.getDay() + ' ' + today.getFullYear())));
        listReminder.innerHTML = '';
        massageDelete();
        for (let key in array) {
            drawRemainder(array[key], key);
        }
    }
} // newDayDrawIt();

let testObj;
let restriction = document.querySelector('.selectTime');
// restriction.setAttribute("value", `${today.getFullYear() + '-0' + (today.getMonth() + 1) + '-' + (today.getDate()) + 'T' + (today.getHours() + 1) + ':' + (today.getMinutes())}`);
let form = document.querySelector('form');
mainButton.addEventListener('click', massageDelete);

function massageDelete() {
    let massageDelete = document.querySelector('.emptyMassage');
    massageDelete.style.display = 'none';
}

mainButton.addEventListener('click', getDataForm);
let array = [];

function getDataForm() {

    if (buttonSwitchTwo === 0) {
        function Reminder(dateEnd, heading, description) {
            this.dane = false;
            this.date = JSON.stringify(new Date(today));
            this.dateEnd = JSON.stringify(dateEnd);
            this.heading = heading;
            this.description = description;
        }

        testObj = new Reminder(form.children[0].value, form.children[3].value, form.children[5].value);

        if (!form.children[0].value == '' && !form.children[3].value == '') {
            listReminder.innerHTML = '';
            let addReminder = new Date(JSON.parse(testObj.dateEnd));
            if (localStorage.getItem(JSON.stringify(addReminder.getDate() + ' ' + addReminder.getMonth() + ' ' + addReminder.getDay() + ' ' + addReminder.getFullYear())) !== null) {
                let arrayDateFrom = JSON.parse(localStorage.getItem(JSON.stringify(addReminder.getDate() + ' ' +
                    addReminder.getMonth() + ' ' + addReminder.getDay() + ' ' + addReminder.getFullYear())));
                arrayDateFrom.push(testObj);
                localStorage.setItem(JSON.stringify(addReminder.getDate() + ' ' +
                    addReminder.getMonth() + ' ' + addReminder.getDay() + ' ' +
                    addReminder.getFullYear()), JSON.stringify(arrayDateFrom));
                for (let key in arrayDateFrom) {
                    drawRemainder(arrayDateFrom[key], key);
                }
            } else {
                array.push(testObj);
                localStorage.setItem(JSON.stringify(addReminder.getDate() + ' ' +
                    addReminder.getMonth() + ' ' + addReminder.getDay() + ' ' +
                    addReminder.getFullYear()), JSON.stringify(array));
                for (let key in array) {
                    drawRemainder(array[key], key);
                }
                array.length = 0;
            }
            moveAddedDate();

            function moveAddedDate() {
                let allDatesFromWeak = document.querySelectorAll('.week_day');
                let comparisonDate = addReminder.getDate() + ' ' + addReminder.getMonth() + ' ' + addReminder.getDay() + ' ' + addReminder.getFullYear();
                for (let day of allDatesFromWeak) {
                    if (day.dataset.storeDates === comparisonDate) {
                        let currentInfo = day.dataset.day;
                        if (document.documentElement.clientWidth <= 414) {
                            containerDate.style.left = (-currentInfo + 1) * (document.documentElement.clientWidth / 3) + 'px';
                        } else if (document.documentElement.clientWidth > 414) {
                            containerDate.style.left = (-currentInfo + 1) * (348 / 3) + 'px';
                        }
                    }
                }
            }
        }
    } else {
        restriction.focus();
        let allDatesFromWeak2 = document.querySelectorAll('.week_day');
        let lastDayInRow = allDatesFromWeak2[8].dataset.storeDates;
        let lastDateInput = lastDayInRow.slice(0, lastDayInRow.indexOf(' '));
        let mDateInput = +lastDayInRow.slice(lastDayInRow.indexOf(' '), lastDayInRow.indexOf(' ') + 2);
        if (lastDateInput < 10) {
            if (mDateInput < 10) {
                restriction.setAttribute("min", `${today.getFullYear() + '-0' + (today.getMonth() + 1) + '-0' + (today.getDate()) + 'T' + '00:00'}`);
            } else {
                restriction.setAttribute("min", `${today.getFullYear() + '-' + (today.getMonth() + 1) + '-0' + (today.getDate()) + 'T' + '00:00'}`);
            }
        } else {
            if (mDateInput < 10) {
                restriction.setAttribute("min", `${today.getFullYear() + '-0' + (today.getMonth() + 1) + '-' + (today.getDate()) + 'T' + '00:00'}`);
            } else {
                restriction.setAttribute("min", `${today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate()) + 'T' + '00:00'}`);
            }
        }
        if (lastDateInput < 10) {
            if (mDateInput < 10) {
                restriction.setAttribute("max", `${today.getFullYear() + '-0' + (today.getMonth() + 1) + '-0' + lastDateInput + 'T' + '23:59'}`);
            } else {
                restriction.setAttribute("max", `${today.getFullYear() + '-' + (today.getMonth() + 1) + '-0' + lastDateInput + 'T' + '23:59'}`);
            }
        } else {
            if (mDateInput < 10) {
                restriction.setAttribute("max", `${today.getFullYear() + '-0' + (today.getMonth() + 1) + '-' + lastDateInput + 'T' + '23:59'}`);
            } else {
                restriction.setAttribute("max", `${today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + lastDateInput + 'T' + '23:59'}`);
            }
        }

        document.querySelector('form input[name=newTime]').value = '';
        document.querySelector('form input[name=heading]').value = '';
        document.querySelector('form textarea[name=desc]').value = '';
    }
}

let combination = [];

function openWindow() {
    restriction.focus();
    let allDatesFromWeak2 = document.querySelectorAll('.week_day');
    let lastDayInRow = allDatesFromWeak2[8].dataset.storeDates;
    let lastDateInput = lastDayInRow.slice(0, lastDayInRow.indexOf(' '));
    let mDateInput = +lastDayInRow.slice(lastDayInRow.indexOf(' '), lastDayInRow.indexOf(' ') + 2);
    if (lastDateInput < 10) {
        if (mDateInput < 10) {
            restriction.setAttribute("min", `${today.getFullYear() + '-0' + (today.getMonth() + 1) + '-0' + (today.getDate()) + 'T' + '00:00'}`);
        } else {
            restriction.setAttribute("min", `${today.getFullYear() + '-' + (today.getMonth() + 1) + '-0' + (today.getDate()) + 'T' + '00:00'}`);
        }
    } else {
        if (mDateInput < 10) {
            restriction.setAttribute("min", `${today.getFullYear() + '-0' + (today.getMonth() + 1) + '-' + (today.getDate()) + 'T' + '00:00'}`);
        } else {
            restriction.setAttribute("min", `${today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate()) + 'T' + '00:00'}`);
        }
    }
    if (lastDateInput < 10) {
        if (mDateInput < 10) {
            restriction.setAttribute("max", `${today.getFullYear() + '-0' + (today.getMonth() + 1) + '-0' + lastDateInput + 'T' + '23:59'}`);
        } else {
            restriction.setAttribute("max", `${today.getFullYear() + '-' + (today.getMonth() + 1) + '-0' + lastDateInput + 'T' + '23:59'}`);
        }
    } else {
        if (mDateInput < 10) {
            restriction.setAttribute("max", `${today.getFullYear() + '-0' + (today.getMonth() + 1) + '-' + lastDateInput + 'T' + '23:59'}`);
        } else {
            restriction.setAttribute("max", `${today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + lastDateInput + 'T' + '23:59'}`);
        }
    }
    
    // document.querySelector('form input[name=newTime]').value = '';
    // document.querySelector('form input[name=heading]').value = '';
    // document.querySelector('form textarea[name=desc]').value = '';
}

document.addEventListener('keydown', function (event) {

    if (event.code === 'ControlLeft') {
        combination.push(event.code);
    }
    if (event.code === 'Enter') {
        combination.push(event.code);

        openAddNew();
        changeMainButton();
        massageDelete();
        if (combination.length > 2) {
            combination.length = 0;
        } else if (combination[0] === 'ControlLeft' && combination[1] === 'Enter') {
            getDataForm();
        } else {
            openWindow();
        }

    }
    console.log(combination);
});
document.addEventListener('keyup', function (event) {
    if (event.code === 'Enter' || event.code === 'ControlLeft') {
        combination.length = 0;
    }
});
// openAddNew();
// changeMainButton();
// massageDelete();
// getDataForm();
// moveAddedDate(); добавить замыкание, для обращения к getDataForm()  функции
function drawRemainder(inside, box) {
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
    h2.innerText = inside.heading;
    reminderItemText.append(h2);

    let reminderDescription = document.createElement("div");
    reminderDescription.classList.add('reminderDescContainer');
    reminderItemText.append(reminderDescription);

    let desc = document.createElement('p');
    desc.classList.add('reminderDesc');
    desc.innerText = inside.description;
    reminderDescription.append(desc);

    let reminderItemData = document.createElement('div');
    reminderItemData.classList.add('reminderItemData');
    reminder.append(reminderItemData);

    let reminderCheck = document.createElement("div");
    reminderCheck.classList.add('reminderCheck');
    reminderItemData.append(reminderCheck);

    let inputImg = document.createElement('input');
    inputImg.id = 'idImg' + box;
    inputImg.classList.add('' + box);
    inputImg.type = 'checkbox';
    reminderCheck.append(inputImg);

    let labelImg = document.createElement('label');
    labelImg.classList.add('labelImg');
    labelImg.setAttribute('for', 'idImg' + box);
    labelImg.dataset.dateLable = inside.dateEnd;
    if (inside.dane === true) {
        inputImg.checked = true;
        labelImg.style.backgroundImage = "url('image/checked.png')";
    } else {
        inputImg.checked = false;
        labelImg.style.backgroundImage = "url('image/unchecked.png')";
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
    if (new Date(JSON.parse(inside.dateEnd)).getMinutes() < 10) {
        if (new Date(JSON.parse(inside.dateEnd)).getHours() < 10) {
            timerTime.innerText = '0' + new Date(JSON.parse(inside.dateEnd)).getHours() + ':0' + new Date(JSON.parse(inside.dateEnd)).getMinutes();
        } else {
            timerTime.innerText = new Date(JSON.parse(inside.dateEnd)).getHours() + ':0' + new Date(JSON.parse(inside.dateEnd)).getMinutes();
        }
    } else {
        if (new Date(JSON.parse(inside.dateEnd)).getHours() < 10) {
            timerTime.innerText = '0' + new Date(JSON.parse(inside.dateEnd)).getHours() + ':' + new Date(JSON.parse(inside.dateEnd)).getMinutes();
        } else {
            timerTime.innerText = new Date(JSON.parse(inside.dateEnd)).getHours() + ':' + new Date(JSON.parse(inside.dateEnd)).getMinutes();
        }
    }
    reminderTimeTo.append(timerTime);
    listReminder.append(reminder);
}

let indexInput, dataLable;
listReminder.addEventListener('click', (e) => {
    let lookingForInput = e.target;
    indexInput = lookingForInput.parentNode.children[0].className;
    dataLable = new Date(JSON.parse(lookingForInput.parentNode.children[1].dataset.dateLable));
    changeCheckbox(dataLable);
});

function changeCheckbox(dates) {
    let array2 = JSON.parse(localStorage.getItem(JSON.stringify(dates.getDate() + ' ' + dates.getMonth() + ' ' + dates.getDay() + ' ' + dates.getFullYear())));
    if (array2[indexInput].dane === false) {
        array2[indexInput].dane = true;
    } else {
        array2[indexInput].dane = false;
    }
    // нужно вставлять дату, от которой было нажатие - так как переводит на отрисовку сегодняшнего дня
    localStorage.setItem(JSON.stringify(dates.getDate() + ' ' + dates.getMonth() + ' ' + dates.getDay() + ' ' + dates.getFullYear()), JSON.stringify(array2));

    listReminder.innerHTML = '';
    for (let check in array2) {
        drawRemainder(array2[check], check);
    }
}

















