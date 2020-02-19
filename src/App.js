import React, { useRef, useCallback } from 'react';
import './App.css';
import { useEffect } from 'react';
import { useState } from 'react';
import moment from 'moment';


function updateMonthCaseLeap(year) {
  if (this.id !== 2) {
    return;
  }
  if (year % 4 === 0 || (year % 100 === 0 && year % 400 === 0)) {
    this.amountDays = 29;
  } else {
    this.amountDays = 28;
  };
}

function getPopulateDatesFromLastMonth(year, month) {
  const lastMonthDate = new Date(`${year}-${month + 1}-01 00:00`);
  lastMonthDate.setDate(lastMonthDate.getDate() - 1);

  const container = [];
  for (let index = 0; index < lastMonthDate.getDay() + 1; index++) {
    container.push(<div key={index + Math.random()} className="day another-day">{lastMonthDate.getDate() + index - lastMonthDate.getDay()}</div>)
  }
  return container;
}

function getPopulateDatesFromNextMonth(year, month) {
  const nextMonthDate = new Date(`${year}-${month + 2}-01 00:00`);
  nextMonthDate.setDate(nextMonthDate.getDate() - 1);

  const container = [];
  if (nextMonthDate.getDay() < 6) {
    for (let index = 0; index < Math.abs(nextMonthDate.getDay() - 6); index++) {
      container.push(<div key={index + Math.random()} className="day another-day">{index + 1}</div>)
    }
  }
  return container;
}

function App() {
  const datesElement = useRef();
  const monthElement = useRef();

  const [months] = useState([
    { id: 1, name: 'Janeiro', amountDays: 31, updateMonthCaseLeap: updateMonthCaseLeap },
    { id: 2, name: 'Fevereiro', amountDays: 28, updateMonthCaseLeap: updateMonthCaseLeap },
    { id: 3, name: 'Março', amountDays: 31, updateMonthCaseLeap: updateMonthCaseLeap },
    { id: 4, name: 'Abril', amountDays: 30, updateMonthCaseLeap: updateMonthCaseLeap },
    { id: 5, name: 'Maio', amountDays: 31, updateMonthCaseLeap: updateMonthCaseLeap },
    { id: 6, name: 'Junho', amountDays: 30, updateMonthCaseLeap: updateMonthCaseLeap },
    { id: 7, name: 'Julho', amountDays: 31, updateMonthCaseLeap: updateMonthCaseLeap },
    { id: 8, name: 'Agosto', amountDays: 31, updateMonthCaseLeap: updateMonthCaseLeap },
    { id: 9, name: 'Setembro', amountDays: 30, updateMonthCaseLeap: updateMonthCaseLeap },
    { id: 10, name: 'Outubro', amountDays: 31, updateMonthCaseLeap: updateMonthCaseLeap },
    { id: 11, name: 'Novembro', amountDays: 30, updateMonthCaseLeap: updateMonthCaseLeap },
    { id: 12, name: 'Dezembro', amountDays: 31, updateMonthCaseLeap: updateMonthCaseLeap },
  ])

  const [date, setDate] = useState(() => {
    let date = new Date();
    return { date, day: date.getDate(), month: date.getMonth(), year: date.getFullYear() }
  })

  let selectedDate = date.date;
  let selectedDay = date.day;
  let selectedMonth = date.month;
  let selectedYear = date.year;

  const formatDate = useCallback(
    (date) => {
      let day = date.getDate();
      if (day < 10) {
        day = '0' + day;
      }
      let month = date.getMonth() + 1;
      if (month < 10) {
        month = '0' + month;
      }
      const year = date.getFullYear();
      return `${day} / ${month} / ${year}`;
    },
    [],
  );

  const populateDates = () => {
    const currentMonth = months[date.month];
    currentMonth.updateMonthCaseLeap(date.year);

    let datesContainer = [...getPopulateDatesFromLastMonth(date.year, date.month)];


    for (let index = 0; index < currentMonth.amountDays; index++) {
      const isSelectedDay = (
        selectedDay === (index + 1) &&
        selectedMonth === date.month &&
        selectedYear === date.year
      );
      const selectedClass = isSelectedDay ? 'selected' : '';
      datesContainer.push(<div key={index + Math.random()} className={`day ${selectedClass}`}>{index + 1}</div>);
    }


    datesContainer = [...datesContainer, getPopulateDatesFromNextMonth(date.year, date.month)]



    return datesContainer;
  }

  const toggleDatePicker = useCallback(
    (e) => {
      if (!e.target.closest('.dates')) {
        datesElement.current.classList.toggle('active')
      }
    },
    [],
  );

  const goToNextMonth = useCallback(
    (event) => {
      setDate(state => {
        const returnedDate = { ...state };
        returnedDate.month += 1;
        if (returnedDate.month > 11) {
          returnedDate.month = 0;
          returnedDate.year += 1;
        }
        return returnedDate;
      })

    },
    [],
  );

  const goToPrevMonth = useCallback(
    (event) => {
      setDate(state => {
        const returnedDate = { ...state };
        returnedDate.month -= 1;
        if (returnedDate.month < 0) {
          returnedDate.month = 11;
          returnedDate.year -= 1;
        }
        return returnedDate;
      })
    },
    [],
  );

  useEffect(() => {
    // window.addEventListener('click')
  }, [])

  useEffect(() => {
    monthElement.current.textContent = `${months[date.month].name} ${date.year}`;
  }, [date.month, date.year, months])

  return (
    <div className="date-picker">
      <div className="selected-date" onClick={toggleDatePicker}>30/01/2020</div>
      <div className="dates" ref={datesElement}>
        <div className="month">
          <div className="arrows prev-month" onClick={goToPrevMonth}>&lt;</div>
          <div className="label-month" ref={monthElement}></div>
          <div className="arrows next-month" onClick={goToNextMonth}>&gt;</div>
        </div>
        <div className="days">
          {populateDates()}
        </div>
      </div>
    </div>
  );
}

export default App;
