const datePickerComponent = `
<html xmlns="http://www.w3.org/1999/xhtml" >
<body>
<style type="text/css">
    
</style>

<div class='container'>
  Please enter your date of birth by putting the Earth in its proper position in orbit:
  <div id='circle'>
    <div id='inner-circle'></div>
    <div id='slider'></div>
  </div>
  <input id="test" type="text"  data-min="0" name="date" size="15" readonly>
 </div>

<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"> </script>
<script type="text/javascript">
   
</script>
</body>
</html>

<style>
@import "compass/css3";

$grey : #666;
$blue : #006;
$yellow : #DD0;

.container{
  position:absolute !important;
  left:50%;
  top:50%;
  @include transform(translate(-50%,-50%));
}

#circle { 
  width:150px; 
  height:150px;
  border:2px solid $grey; 
  border-radius:100%;
  float:left;
  margin-right:40px;
  position:relative;
}

#inner-circle {
  position:absolute;
  width:20px;
  height:20px;
  border:1px solid $yellow;
  background-color:$yellow;
  border-radius:100%;
  float:left;
  top: 50%;
  left: 50%;
  margin: -10px 0px 0px -10px;
}

#slider { 
  position:relative; 
  height:15px; 
  width:15px; 
  background:$blue; 
  left:8px; 
  top:-8px; 
  border-radius:100%;
  cursor:pointer;
}

input[type="text"],
input[type="email"],
input[type="password"]{
    -moz-appearance: none;
    border: 2px solid #e6e6e6;
    border-radius: 4px;
    color: #818181;
    display: block;
    font-size: 1em;
    height: 30px;
    padding:0 6px;
    transition: border 0s ease 0s, width 0.4s ease-in-out 0s;
}

.range{
  float:left;
  width:30px;
}
</style>

<script>
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
</script>
</script>
</body>
</html>`;
export default datePickerComponent;
