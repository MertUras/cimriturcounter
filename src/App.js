import React, { useState, useEffect } from 'react';
import './index.css'; // Make sure this imports correctly

function App() {
  // Setup countdown end date and persist in localStorage
  const getEndDate = () => {
    const storedEndDate = localStorage.getItem('countDownDate');
    if (storedEndDate) {
      return new Date(parseInt(storedEndDate)).getTime();
    } else {
      const newEndDate = new Date(Date.now() + 12096000000).getTime(); // 4 months from now
      localStorage.setItem('countDownDate', newEndDate);
      return newEndDate;
    }
  };

  const [countDownDate] = useState(getEndDate());
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-countdown text-white font-montserrat">
      <img src="/images/logo.png" alt="Cimritur Logo" className="absolute top-0 left-0 m-4 w-32 opacity-75" />

     

      <div className="text-center ">
        
        <h1 className="text-6xl font-semibold mb-4">Buluşmamıza Az Kaldı</h1>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-black bg-opacity-50 p-3 rounded">
            {`${timeLeft.days} Gün`}
          </div>
          <div className="bg-black bg-opacity-50 p-3 rounded">
            {`${timeLeft.hours} Saat`}
          </div>
          <div className="bg-black bg-opacity-50 p-3 rounded">
            {`${timeLeft.minutes} Dakika`}
          </div>
          <div className="bg-black bg-opacity-50 p-3 rounded">
            {`${timeLeft.seconds} Saniye`}
          </div>
        </div>
        <p className="text-3xl mt-5">Seyahat Lüks Değil</p>
        
      </div>
      
    </div>
  );
}

export default App;
