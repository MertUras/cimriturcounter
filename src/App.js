import React, { useState, useEffect } from 'react';
import './index.css';

function App() {
  const getEndDate = () => {
    const storedEndDate = localStorage.getItem('countDownDate');
    if (storedEndDate) {
      return parseInt(storedEndDate);
    } else {
      const newEndDate = new Date().getTime() + 12096000000; // 4 months from now
      localStorage.setItem('countDownDate', newEndDate.toString());
      return newEndDate;
    }
  };

  const [endDate, setEndDate] = useState(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Set endDate on client side
    setEndDate(getEndDate());
  }, []);

  useEffect(() => {
    if (!endDate) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = endDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-countdown text-white font-montserrat">
      <img src="/images/logo.png" alt="Cimritur Logo" className="absolute top-0 left-0 m-4 w-40 opacity-75" />
      <div className="text-center">
        <h1 className="text-6xl font-semibold mb-4">Buluşmamıza Az Kaldı</h1>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-black bg-opacity-50 p-3 rounded">{`${timeLeft.days} Gün`}</div>
          <div className="bg-black bg-opacity-50 p-3 rounded">{`${timeLeft.hours} Saat`}</div>
          <div className="bg-black bg-opacity-50 p-3 rounded">{`${timeLeft.minutes} Dakika`}</div>
          <div className="bg-black bg-opacity-50 p-3 rounded">{`${timeLeft.seconds} Saniye`}</div>
        </div>
        <p className="text-3xl mt-5">Seyahat Lüks Değil</p>
      </div>
    </div>
  );
}

export default App;
