//10000 -> 10,000
export const formatLoss = (value: number) => value.toLocaleString();

//23.23223 -> 23.23
export const formatRate = (value: number) => Math.round(value * 100) / 100;

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
  const today = new Date();

  const validDates = Array.isArray(valid) ? valid : [valid];
  const invalidDates = validDates.filter((dateStr: string) => {
    const date = new Date(dateStr.trim());
    const dateFormatted = date.toISOString().slice(5, 10);
    const isHoliday = limit.includes(dateFormatted);
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const isFutureDate = date > today;
    return isHoliday || isWeekend || isFutureDate;
  });

  return invalidDates;
};
