//10000 -> 10,000
export const formatLoss = (value: number) => value.toLocaleString();

//23.23223 -> 23.23
export const formatRate = (value: number) => Math.floor(value * 100) / 100;

export const formatValue = (key: string, value: string | number) => {
  if (typeof value === 'number') {
    if (key.endsWith('Rate') || key.endsWith('Ratio')) {
      return Math.round(value * 100) / 100 + '%';
    } else {
      return formatLoss(value);
    }
  } else {
    return value;
  }
};

// +-숫자 형식인지 확인
export const isValidInputNumber = (value: string | number): boolean => {
  const sanitizedValue = String(value).trim();
  const normalizedValue = sanitizedValue.replace(/,/g, '');
  return !isNaN(Number(normalizedValue));
};

//분석 공휴일, 주말 입력 제한 유효성 검사
export const isValidPossibleDate = (valid: string[] | string) => {
  const limit = ['01-01', '03-01', '05-05', '08-15', '10-03', '12-25'];

  const now = new Date();
  const todayKST = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  const todayFormatted = `${todayKST.getFullYear()}-${String(todayKST.getMonth() + 1).padStart(
    2,
    '0'
  )}-${String(todayKST.getDate()).padStart(2, '0')}`;

  const validDates = Array.isArray(valid) ? valid : [valid];

  const invalidDates = validDates.filter((dateStr: string) => {
    try {
      const date = new Date(dateStr.trim());
      if (isNaN(date.getTime())) {
        console.error(`Invalid date format: ${dateStr}`);
        return true;
      }

      const dateFormatted = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        '0'
      )}-${String(date.getDate()).padStart(2, '0')}`;

      const isHoliday = limit.includes(dateFormatted.slice(5, 10));
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      const isFutureDate = dateFormatted > todayFormatted;

      return isHoliday || isWeekend || isFutureDate;
    } catch (error) {
      console.error(`Error processing date: ${dateStr}`, error);
      return true;
    }
  });

  return invalidDates;
};
