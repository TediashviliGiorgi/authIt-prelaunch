import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export const useAnalytics = () => {
  const location = useLocation();
  const startTime = useRef(Date.now());

  useEffect(() => {
    // გვერდზე შესვლის დრო
    startTime.current = Date.now();
    const currentPage = location.pathname;

    // ფუნქცია მონაცემების გასაგზავნად
    const sendData = () => {
      const duration = Math.round((Date.now() - startTime.current) / 1000);
      
      // sendBeacon უფრო საიმედოა გვერდის დახურვისას
      const data = JSON.stringify({ page: currentPage, duration });
      const blob = new Blob([data], { type: 'application/json' });
      navigator.sendBeacon('/.netlify/functions/track', blob);
    };

    // Cleanup ფუნქცია: სრულდება როცა მომხმარებელი სხვა გვერდზე გადადის
    return () => {
      sendData();
    };
  }, [location]);
};