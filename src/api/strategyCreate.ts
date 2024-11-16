import axios from 'axios';

const fetchStrategyRegistration = async () => {
  try {
    const res = await axios.get(`/api/strategies/registration-form`, {
      headers: {
        'Content-Type': 'application/json',
        Auth: 'trader',
      },
    });
    console.log('strategy Register Data =====>', res.data);
    return res.data;
  } catch (error) {
    console.error('failed to fetch strategyRegistrateData', error);
  }
};

export default fetchStrategyRegistration;
