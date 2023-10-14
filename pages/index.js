// pages/index.js

import { useState, useEffect } from 'react';

export default function Home() {
  const [guess, setGuess] = useState('');
  const [birthdate, setBirthdate] = useState('2000-01-01'); // The target birthdate
  const [message, setMessage] = useState('');

  useEffect(() => {
    // JavaScript code for the date picker
    (function () {
      var $container = document.getElementById('circle');
      var $slider = document.getElementById('slider');
      var sliderW2 = $slider.offsetWidth / 2;
      var sliderH2 = $slider.offsetHeight / 2;
      var radius = 75;
      var deg = 0;
      var elP = $container.getBoundingClientRect();
      var elPos = { x: elP.left, y: elP.top };
      var X = 0, Y = 0;
      var mdown = false;

      // Initializint the slider
      // Ignoring leap years because I cba for this shitpost
      // Constant for relating angle change to change in time
      var daysPerDegree = 365 / 360;
      // Calculate the current day of the year and use this
      // to initialize the position of the slider
      // Stolen from SO: https://stackoverflow.com/questions/8619879/javascript-calculate-the-day-of-the-year-1-366
      var now = new Date();
      var start = new Date(now.getFullYear(), 0, 0);
      var diff = now - start;
      var oneDay = 1000 * 60 * 60 * 24;
      var startDay = Math.floor(diff / oneDay);

      var startAngle = startDay / daysPerDegree;
      X = Math.round(radius * Math.sin(startAngle * Math.PI / 180));
      Y = Math.round(radius * -Math.cos(startAngle * Math.PI / 180));
      $slider.style.left = X + radius - sliderW2 + 'px';
      $slider.style.top = Y + radius - sliderH2 + 'px';
      var sliderDate = new Date();

      // Track the previous slider angle. This will be needed when changing
      // years to decide whether to go up or down
      var lastAngle = startAngle;
      var currYear = sliderDate.getFullYear();

      $container.addEventListener('mousedown', function (e) {
        mdown = true;
      });

      $container.addEventListener('mouseup', function (e) {
        mdown = false;
      });

      $container.addEventListener('mousemove', function (e) {
        if (mdown) {
          var mPos = { x: e.clientX - elPos.x, y: e.clientY - elPos.y };
          var atan = Math.atan2(mPos.x - radius, mPos.y - radius);
          deg = -atan / (Math.PI / 180) + 180; // final (0-360 positive) degrees from mouse position

          X = Math.round(radius * Math.sin(deg * Math.PI / 180));
          Y = Math.round(radius * -Math.cos(deg * Math.PI / 180));
          $slider.style.left = X + radius - sliderW2 + 'px';
          $slider.style.top = Y + radius - sliderH2 + 'px';
          // AND FINALLY apply exact degrees to ball rotation
          $slider.style.WebkitTransform = 'rotate(' + deg + 'deg)';
          $slider.style.MozTransform = 'rotate(' + deg + 'deg)';

          // Compute the difference with the start angle and apply the change in days
          var angleChange = startAngle - deg;
          var dayChange = daysPerDegree * angleChange;
          // Slight hack to set the day of year directly
          sliderDate.setMonth(0);
          sliderDate.setDate(startDay + dayChange);
          // If we have crossed the 0 degree boundary, change the year
          // depending on how it was crossed
          // Going ccw, increase the year
          if (lastAngle < 180 && deg > 270) {
            currYear += 1;
          // Going cw, decrease the year
          } else if (lastAngle > 180 && deg < 90) {
            currYear -= 1;
          }
          sliderDate.setFullYear(currYear);
          lastAngle = deg;
          // Display the current date
          var dateString = sliderDate.toISOString().substring(0, 10);
          document.querySelector('input[name="date"]').value = dateString;
        }
      });
    })();
  }, []);

  function handleGuess() {
    if (guess === birthdate) {
      setMessage('Congratulations! You guessed the birthdate! 🎉');
    } else {
      setMessage('Nope, try again! 😄');
    }
  }

  return (
    <div className="container">
      <Head>
        <title>HAPPY BIRTHDAY TAIYA ❤️</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Welcome to my app!" />
        <p className="description">
          Happy Birthday, Taiya! 🎉❤️ Get started by editing hehe <code>pages/index.js</code>
        </p>

        <h2>Annoying Birthdate Guessing Game</h2>
        <p>Can you guess the birthdate?</p>
        <div className="date-picker-container">
          <div className="date-picker">
            Please enter your date of birth by putting the Earth in its proper position in orbit:
            <div id="circle">
              <div id="inner-circle"></div>
              <div id="slider"></div>
            </div>
            <input id="test" type="text" data-min="0" name="date" size="15" readOnly />
          </div>
        </div>
        <input
          type="date"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
        />
        <button onClick={handleGuess}>Guess</button>
        <p className={`animated-text ${guess === birthdate ? 'wiggle' : ''}`}>{message}</p>
      </main>

      <Footer />
      <style jsx>{`
        .wiggle {
          animation: wiggle 0.5s ease infinite;
        }

        @keyframes wiggle {
          0% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
          100% { transform: rotate(-5deg); }
        }

        .date-picker-container {
          display: flex;
          justify-content: center;
        }

        .date-picker {
          position: absolute !important;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      `}</style>
    </div>
  );
}
