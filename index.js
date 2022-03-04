const monthDays = document.querySelector('.month-days');


let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth();



// Получаю день недели первого дня месяца в виде [0-6] и преобразую к виду [1-7]
function getDayOfWeekOfFirstDayOffMonth(date) {
  let firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  let dayOfWeek = firstDayOfMonth.getDay();
  if (dayOfWeek === 0) day = 7;
  
  return dayOfWeek;
}


// Получить количество дней в месяце (по сути получаю последний день месяца)
function getDaysInMonth(month, year) {
  return new Date(year, month+1, 0).getDate();
}


// Создание календаря
function createCalendar(daysInMonth, dayOfWeek) {
  for (let j = 1; j < dayOfWeek; j++) {
    const div = document.createElement('div');
    monthDays.appendChild(div);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    const div = document.createElement('div');
    div.innerHTML = i;
    monthDays.appendChild(div);
  }
}

createCalendar(getDaysInMonth(currentMonth, currentYear), getDayOfWeekOfFirstDayOffMonth(currentDate));