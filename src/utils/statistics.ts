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
  if (/[^-+0-9]/g.test(sanitizedValue)) return false;
  return !isNaN(Number(sanitizedValue));
};
