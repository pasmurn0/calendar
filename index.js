let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth();
let currentDay = currentDate.getDate();
console.log('date' + ' ' + currentDate);
console.log('day' + ' ' + currentDay);
let month = currentMonth;
let year = currentYear;

const monthDays = document.querySelector('.month-days');
const monthsInSelector = document.querySelectorAll('.month');
const monthSelector = document.querySelector('.month-selector');
const yearSelector = document.querySelector('.year-selector');
const nextMonth = document.querySelector('.next-month');
const previousMonth = document.querySelector('.previous-month');
const switchThemeBtn = document.querySelector('.switch-theme-btn');




// Получаю день недели первого дня месяца в виде [0-6] и преобразую к виду [1-7]
function getDayOfWeekOfFirstDayOfMonth(month, year) {
  let firstDayOfMonth = new Date(year, month, 1);
  let dayOfWeek = firstDayOfMonth.getDay();

  if (dayOfWeek == 0) dayOfWeek = 7;

  return dayOfWeek;
}


// Получить количество дней в месяце (по сути получаю последний день месяца)
function getDaysInMonth(month, year) {
  return (new Date(year, +month + 1, 0).getDate());
}


// Создание календаря (предварительно удаляю старый месяц), кроме того, проверяется текущуя дата и в случае, если сегодня в создаваемом месяце, то на этот день устанавливается класс 'today'
function createCalendar(daysInMonth, dayOfWeek) {
  monthDays.innerHTML = '';

  for (let j = 1; j < dayOfWeek; j++) {
    const div = document.createElement('div');
    monthDays.appendChild(div);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    const div = document.createElement('div');
    if (i == currentDay && month == currentMonth && year == currentYear) {
      div.classList.add('today');
    }
    div.innerHTML = i;
    monthDays.appendChild(div);
  }
}


// наполняю селектор годов годами с 1970 по 2100
function addYears() {
  for (let i = 2100; i >= 1970; i--) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    option.classList.add('year');
    yearSelector.appendChild(option);
  }
}
addYears();
let years = document.querySelectorAll('.year'); //объявляю переменную и помещаю в нее элементы 'year'


// проверяю и выбираю текущий месяц и текущий год
monthsInSelector.forEach(month => {
  if (month.value == currentMonth) {
    month.selected = true;
  }
});

years.forEach(year => {
  if (year.value == currentYear) {
    year.selected = true;
  }
})


// при загрузке создается календарь текущего месяца
createCalendar(getDaysInMonth(currentMonth, currentYear), getDayOfWeekOfFirstDayOfMonth(currentMonth, currentYear));


// при изменении месяца через селектор создать новый календарь
monthSelector.addEventListener('change', (event) => {
  month = event.target.value;

  createCalendar(getDaysInMonth(month, year), getDayOfWeekOfFirstDayOfMonth(month, year));
})

yearSelector.addEventListener('change', (event) => {
  year = event.target.value;

  createCalendar(getDaysInMonth(month, year), getDayOfWeekOfFirstDayOfMonth(month, year));
})



// Создлание нового календаря по кликам кнопок 'next' и 'previous', а также отображенние выбранного месяца / года в селекторах
nextMonth.addEventListener('click', () => {
  if (month == 11) {
    month = 0;
    year++;
  } else {
    month++;
  }

  monthsInSelector[month].selected = true;
  years[2100 - year].selected = true;

  createCalendar(getDaysInMonth(month, year), getDayOfWeekOfFirstDayOfMonth(month, year));
})

previousMonth.addEventListener('click', () => {
  if (month == 0) {
    month = 11;
    year--;
  } else {
    month--;
  }

  monthsInSelector[month].selected = true;
  years[2100 - year].selected = true;

  createCalendar(getDaysInMonth(month, year), getDayOfWeekOfFirstDayOfMonth(month, year));
})

switchThemeBtn.addEventListener('click', () => {
  if (switchThemeBtn.textContent === 'light theme') {
    switchThemeBtn.textContent = 'dark theme';
    document.documentElement.style.setProperty('--main-color', 'black');
    document.documentElement.style.setProperty('--first-font-color', 'white');
    document.documentElement.style.setProperty('--second-font-color', '#666');
    document.documentElement.style.setProperty('--accent-color', '#589C5F');
  } else {
    switchThemeBtn.textContent = 'light theme';
    document.documentElement.style.setProperty('--main-color', 'white');
    document.documentElement.style.setProperty('--first-font-color', 'black');
    document.documentElement.style.setProperty('--second-font-color', '#CCC');
    document.documentElement.style.setProperty('--accent-color', '#FB3F4A');
    }
})