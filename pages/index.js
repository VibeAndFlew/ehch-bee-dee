import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>HAPPY BIRTHDAY TAIYA ❤️</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Welcome to my app!" />
        <p className="description">
          Hello to the most amazing person in my life. Here is to you 🥂
        </p>

        <h2>Select your birthdate Please! </h2>
        <iframe
  width="100%" // Set width to 100% for responsiveness
  height="400"
  srcDoc={`
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <style type="text/css">
          .container {
            position: absolute !important;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }

          #circle {
            width: 80vw; /* Use viewport width units to make it responsive */
            max-width: 300px; /* Set a maximum width to avoid it becoming too large */
            height: 80vw; /* Use viewport width units to maintain aspect ratio */
            max-height: 300px; /* Set a maximum height to maintain aspect ratio */
            border: 2px solid #666;
            border-radius: 50%; /* Use 50% border-radius for a perfect circle */
            margin: 0 auto; /* Center the circle horizontally */
            position: relative;
          }

          #inner-circle {
            position: absolute;
            width: 15px; /* Adjust size for small screens */
            height: 15px; /* Adjust size for small screens */
            border: 1px solid #DD0;
            background-color: #DD0;
            border-radius: 50%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }

          #slider {
            position: relative;
            height: 15px;
            width: 15px;
            background: #006;
            border-radius: 50%;
            cursor: pointer;
          }

          input[type="text"],
          input[type="email"],
          input[type="password"] {
            -moz-appearance: none;
            border: 2px solid #e6e6e6;
            border-radius: 4px;
            color: #818181;
            display: block;
            font-size: 1em;
            height: 30px;
            padding: 0 6px;
            transition: border 0s ease 0s, width 0.4s ease-in-out 0s;
          }
        </style>
      </head>
      <body>
        <div class='container'>
          Please enter your date of birth by putting the Earth in its proper position in orbit:
          <div id='circle'>
            <div id='inner-circle'></div>
            <div id='slider'></div>
          </div>
          <input id="test" type="text" data-min="0" name="date" size="15" readonly>
          <input id="formatted-date" type="text" name="formatted-date" size="15" readonly>
          <button id="submit-button" type="button">Submit</button>
          <p id="birthday-message" style="display: none;">
            Happy Birthday, Taiya! 🎉❤️
          </p>
        </div>
        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
        <script type="text/javascript">
          // JavaScript code
          (function () {
            var $container = $('#circle');
            var $slider = $('#slider');
            var sliderW2 = $slider.width() / 2;
            var sliderH2 = $slider.height() / 2;
            var radius = 75;
            var deg = 0;
            var elP = $('#circle').offset();
            var elPos = { x: elP.left, y: elP.top };
            var X = 0, Y = 0;
            var mdown = false;
            // Initialize the slider
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
            $slider.css({ left: X + radius - sliderW2, top: Y + radius - sliderH2 });
            var sliderDate = new Date();
            // Track the previous slider angle. This will be needed when changing
            // years to decide whether to go up or down
            var lastAngle = startAngle;
            var currYear = sliderDate.getFullYear();

            $('#circle')
              .mousedown(function (e) { mdown = true; })
              .mouseup(function (e) { mdown = false; })
              .mousemove(function (e) {
                if (mdown) {
                  var mPos = { x: e.clientX - elPos.x, y: e.clientY - elPos.y };
                  var atan = Math.atan2(mPos.x - radius, mPos.y - radius);
                  deg = -atan / (Math.PI / 180) + 180; // final (0-360 positive) degrees from mouse position

                  X = Math.round(radius * Math.sin(deg * Math.PI / 180));
                  Y = Math.round(radius * -Math.cos(deg * Math.PI / 180));
                  $slider.css({ left: X + radius - sliderW2, top: Y + radius - sliderH2 });
                  // AND FINALLY apply exact degrees to ball rotation
                  $slider.css({ WebkitTransform: 'rotate(' + deg + 'deg)' });
                  $slider.css({ '-moz-transform': 'rotate(' + deg + 'deg)' });

                  // Compute the difference with the start angle and apply the change in days
                  var angleChange = startAngle - deg;
                  var dayChange = daysPerDegree * angleChange;
                  // Slight hack to set the day of the year directly
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
                  $('input[name="date"]').val(dateString);

                  // Update the formatted date in DD/MM/YYYY format
                  var formattedDate = sliderDate.getDate() + '/' + (sliderDate.getMonth() + 1) + '/' + sliderDate.getFullYear();
                  $('#formatted-date').val(formattedDate);
                }
                $('#submit-button').click(function () {
                  var enteredDate = $('#formatted-date').val();
                  if (enteredDate === '14/10/1998') {
                    $('#birthday-message').show();
                  } else {
                    $('#birthday-message').hide();
                  }
                });
              });
          })();
        </script>
      </body>
    </html>
  `}
></iframe>



      </main>

      <Footer />
    </div>
  );
}
