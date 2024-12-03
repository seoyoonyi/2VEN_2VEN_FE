import { useRef, useState } from 'react';

import { css } from '@emotion/react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';

import useOnClickOutside from '@/hooks/useOnClickOutside';
import theme from '@/styles/theme';
import {
  formatYearMonthDay,
  getCurrentMonthDays,
  getNextMonthDays,
  getPreviousMonthDays,
} from '@/utils/calendar';

dayjs.locale('ko');

const WEEKS = ['일', '월', '화', '수', '목', '금', '토'];

interface DatePicker {
  selected: Date;
  setSelected: (value: Date) => void;
}

const DatePicker = ({ selected, setSelected }: DatePicker) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(dayjs(selected).startOf('month'));

  const datePickerRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(datePickerRef, () => setIsOpen(false));

  const prevMonthDays = getPreviousMonthDays(currentMonth);
  const currentMonthDays = getCurrentMonthDays(currentMonth);
  const nextMonthDays = getNextMonthDays(currentMonth);

  const onClickDate = (date: number) => {
    const clickedDate = currentMonth.date(date).toDate();
    setSelected(clickedDate);
    setIsOpen(!isOpen);
  };

  const onClickDateButton = () => setIsOpen(!isOpen);

  const onPreviousYear = () => setCurrentMonth(currentMonth.subtract(1, 'year'));
  const onNextYear = () => setCurrentMonth(currentMonth.add(1, 'year'));
  const onPreviousMonth = () => setCurrentMonth(currentMonth.subtract(1, 'month'));
  const onNextMonth = () => setCurrentMonth(currentMonth.add(1, 'month'));

  return (
    <div css={datePickerStyle} ref={datePickerRef}>
      <input
        type='button'
        value={formatYearMonthDay(selected)}
        className='date-input'
        onClick={onClickDateButton}
      />
      <div className={`${isOpen ? 'open ' : ''}calendar-container`}>
        <div className='calendar-header'>
          <div className='year-control'>
            <button type='button' onClick={onPreviousYear}>
              <HiChevronLeft />
            </button>
            <span>{currentMonth.format('YYYY')}</span>
            <button type='button' onClick={onNextYear}>
              <HiChevronRight />
            </button>
          </div>
          <div className='month-control'>
            <button type='button' onClick={onPreviousMonth}>
              <HiChevronLeft />
            </button>
            <span>{currentMonth.format('MM')}</span>
            <button type='button' onClick={onNextMonth}>
              <HiChevronRight />
            </button>
          </div>
        </div>
        <div className='calendar'>
          <div className='weeks'>
            {WEEKS.map((week, index) => (
              <div key={index} className={`week-day week-day-${index}`}>
                {week}
              </div>
            ))}
          </div>
          <div className='days'>
            {prevMonthDays.map((day, index) => (
              <div key={index} className={`day inactive day-${index % 7}`}>
                {day}
              </div>
            ))}
            {currentMonthDays.map((day, index) => {
              const dayIndex = (prevMonthDays.length + index) % 7;
              return (
                <div
                  key={index}
                  className={`day day-${dayIndex} ${
                    dayjs(selected).date() === day ? 'selected' : ''
                  }`}
                  onClick={() => onClickDate(day)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      onClickDate(day);
                    }
                  }}
                  role='button'
                  tabIndex={0}
                >
                  {day}
                </div>
              );
            })}
            {nextMonthDays.map((day, index) => {
              const dayIndex = (prevMonthDays.length + currentMonthDays.length + index) % 7;
              return (
                <div key={index} className={`day inactive day-${dayIndex}`}>
                  {day}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const datePickerStyle = css`
  position: relative;

  .date-input {
    width: 90px;
    height: 32px;
    border: 0;
    outline: none;
    font-size: 0.85rem;
    font-weight: 500;
    color: ${theme.colors.gray[800]};
    background-color: ${theme.colors.gray[100]};
    text-align: center;
    caret-color: transparent;
    cursor: pointer;
  }

  .calendar-container {
    z-index: 100;
    position: absolute;
    top: 36px;
    left: 0;
    display: none;
    padding: 18px;
    border: 1px solid ${theme.colors.gray[300]};
    background-color: ${theme.colors.main.white};
    font-size: ${theme.typography.fontSizes.caption};

    &.open {
      display: block;
    }
  }

  .calendar-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;

    .year-control,
    .month-control {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin-bottom: 4px;

      span {
        width: 60px;
        font-size: 20px;
        text-align: center;
        font-weight: 700;
      }

      button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 24px;
        height: 24px;
        border: 1px solid ${theme.colors.gray[300]};
        background-color: transparent;
        cursor: pointer;
        svg {
          width: 16px;
          height: 16px;
        }
      }
    }

    .month-control {
      span {
        width: 30px;
        text-align: center;
      }
    }
  }

  .calendar {
    .weeks {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 4px;
      border-bottom: 1px solid ${theme.colors.gray[300]};
      text-align: center;
      line-height: 32px;

      .week-day-0 {
        color: ${theme.colors.main.red}; /* 일요일 - 빨간색 */
      }
      .week-day-6 {
        color: ${theme.colors.main.blue}; /* 토요일 - 파란색 */
      }
    }

    .days {
      display: grid;
      grid-template-columns: repeat(7, 1fr);

      .day {
        text-align: center;
        width: 40px;
        height: 38px;
        line-height: 38px;
        font-weight: 500;
        font-size: 16px;
        cursor: pointer;

        &.day-0 {
          color: ${theme.colors.main.red}; /* 일요일 - 빨간색 */
        }
        &.day-6 {
          color: ${theme.colors.main.blue}; /* 토요일 - 파란색 */
        }

        &.inactive {
          color: ${theme.colors.gray[400]};
        }
        &.selected {
          background-color: ${theme.colors.main.primary};
          color: ${theme.colors.main.white};
          font-weight: 700;
          line-height: 38px;
        }
        &:hover {
          background-color: ${theme.colors.main.primary + '40'};
          color: ${theme.colors.main.black};
        }
      }
    }
  }
`;

export default DatePicker;
