import axios from 'axios';

const formatDate = date => {
  const d = date.getDate().toString().padStart(2, '0');
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const y = date.getFullYear();
  return `${d}-${m}-${y}`;
};

export const fetchDailyPrayerTimes = async (city, country, date) => {
  const formattedDate = formatDate(date || new Date());
  try {
    const response = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity/${formattedDate}?city=${city}&country=${country}&method=8`,
    );
    return response.data.data.timings;
  } catch (error) {
    throw error;
  }
};
