// Array to store alarms
var alarms = [];
// Variable to store the timeout ID of the alarm
var alarmTimeout;

// Function to update the current time
function setTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');

  const hoursSpan = document.querySelector('.hours');
  const minutesSpan = document.querySelector('.minutes');
  const secondsSpan = document.querySelector('.seconds');

  hoursSpan.textContent = hours;
  minutesSpan.textContent = minutes;
  secondsSpan.textContent = seconds;
}
//update the time every second
setInterval(setTime, 1000);

//function to set the alarm
function setAlarm() {
  var hourInput = document.getElementById("hour").value;
  var minuteInput = document.getElementById("minute").value;

  var alarmTime = new Date();
  alarmTime.setHours(hourInput);
  alarmTime.setMinutes(minuteInput);
  alarmTime.setSeconds(0);
  alarmTime.setMilliseconds(0);

  var now = new Date();
  var timeToAlarm = alarmTime.getTime() - now.getTime();

  if (timeToAlarm < 0) {
    timeToAlarm += 24 * 60 * 60 * 1000;
  }

  alarmTimeout = setTimeout(function() {
    document.getElementById("alarmStatus").innerHTML = "ALARM!";
    document.getElementById("alarmSound").play();
    document.getElementById("stopButton").disabled = false;
  }, timeToAlarm);

  var newAlarm = {
    hour: hourInput,
    minute: minuteInput,
    timeout: alarmTimeout
  };

  alarms.push(newAlarm);
  updateAlarmsList();

  document.getElementById("alarmStatus").innerHTML = "Alarm set for " + hourInput + ":" + minuteInput;
}
// Funcition to stop the alarm

function stopAlarm() {
  clearTimeout(alarmTimeout);
  document.getElementById("alarmStatus").innerHTML = "";
  document.getElementById("alarmSound").pause();
  document.getElementById("alarmSound").currentTime = 0;
  document.getElementById("stopButton").disabled = true;
}
//Function to update the list of alarm display on the page
function updateAlarmsList() {
  var alarmsList = document.getElementById("alarmsList");
  alarmsList.innerHTML = "";

  for (var i = 0; i < alarms.length; i++) {
    var alarm = alarms[i];
    var alarmTime = alarm.hour + ":" + alarm.minute;
    var alarmItem = document.createElement("li");
    alarmItem.textContent = alarmTime;
//Create a delete button for each alarm
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");
    deleteButton.setAttribute("data-index", i);
    deleteButton.addEventListener("click", function() {
      var index = this.getAttribute("data-index");
      alarms.splice(index, 1);
      updateAlarmsList();
      updateAlarmStatus();
    });

    alarmItem.appendChild(deleteButton);
    alarmsList.appendChild(alarmItem);
  }
}
//function to update the alarm status message

function updateAlarmStatus() {
  var alarmStatus = document.getElementById("alarmStatus");
  if (alarms.length === 0) {
    alarmStatus.innerHTML = "";
    document.getElementById("stopButton").disabled = true;
  }
}
