import { useEffect, useState } from "react";
import './TrafficLights.css';

const TrafficLights = () => {
  const [currentColor, setCurrentColor] = useState('white');

  useEffect(() => {
    let redTimeout, yellowTimeout, greenTimeout, intervalTimeout;

    const startSequence = () => {
      setCurrentColor('red');

      redTimeout = setTimeout(() => {
        setCurrentColor('yellow');

        yellowTimeout = setTimeout(() => {
          setCurrentColor('green');

          greenTimeout = setTimeout(() => {
            setCurrentColor('white');
            intervalTimeout = setTimeout(startSequence, 500);
          }, 3000);
        }, 500);
      }, 4000);
    };

    startSequence();

    return () => {
      clearTimeout(redTimeout);
      clearTimeout(yellowTimeout);
      clearTimeout(greenTimeout);
      clearTimeout(intervalTimeout);
    };
  }, []);

  return (
    <>
      <header>Header</header>

      <div className="center">
        <nav className={`nav ${currentColor === 'red' ? 'glow' : 'blur'}`}>Navigation</nav>

        <main className={`main ${currentColor === 'yellow' ? 'glow' : 'blur'}`}>Main</main>

        <aside className={`aside ${currentColor === 'green' ? 'glow' : 'blur'}`}>Sidebar</aside>
      </div>

      <footer>Footer</footer>
    </>
  );
};

export default TrafficLights;
