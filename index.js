// import css from "./css/style.css";

import playList from "./js/playList.js";

document.getElementById("enterText").placeholder = "[Enter your name]";

function showTime() {
  const date = new Date();
  const time = document.querySelector(".time");
  const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;
  showDate();
  showGreeting();
  setTimeout(showTime, 1000);
}
showTime();

function showDate() {
  const date = new Date();
  const dateSelector = document.querySelector(".date");
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  const currentDate = date.toLocaleDateString("en-Br", options);
  dateSelector.textContent = currentDate;
}

function showGreeting() {
  const greeting = document.querySelector(".greeting");
  const timeOfDay = getTimeOfDay();
  const greetingText = `Good ${timeOfDay}`;
  greeting.textContent = greetingText;
}

function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();
  if (hours >= 6 && hours < 12) return "morning";
  if (hours >= 12 && hours < 18) return "day";
  if (hours >= 18 && hours < 24) return "evening";
  if (hours >= 0 && hours < 6) return "night";
}

let randomNum;

function getRandomNum() {
  randomNum = String(Math.floor(Math.random() * 19 + 1));
}
getRandomNum();

function setBg() {
  const img = new Image();
  const body = document.querySelector("body");
  const timeOfDay = getTimeOfDay();
  if (randomNum < 10) {
    randomNum = `0${randomNum}`;
    // randomNum.padStart(2, "0")
  }
  const bgNum = randomNum;
  img.src = `https://raw.githubusercontent.com/shalick/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
  img.onload = () => {
    body.style.backgroundImage = `url('https://raw.githubusercontent.com/shalick/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg')`;
  };
}
setBg();

function getSlideNext() {
  randomNum < 20 ? randomNum++ : (randomNum = 1);
  setBg();
}
const slideNext = document.querySelector(".slide-next");
slideNext.addEventListener("click", getSlideNext);

function getSlidePrev() {
  randomNum > 1 ? randomNum-- : (randomNum = 20);
  setBg();
}
const slidePrev = document.querySelector(".slide-prev");
slidePrev.addEventListener("click", getSlidePrev);

const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const weatherError = document.querySelector(".weather-error");

const city = document.querySelector(".city");

async function getWeather() {
  if (!city.value) city.value = "Minsk";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=7be37864b0ff679ef0583a88d1ce3363&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.cod >= 400 && data.cod < 600) {
    weatherIcon.className = "";
    temperature.textContent = "";
    weatherDescription.textContent = "";
    wind.textContent = "";
    humidity.textContent = "";
    weatherError.textContent = "Wrong city input";
  } else {
    weatherError.textContent = "";
    weatherIcon.className = "weather-icon owf";
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
  }
}
getWeather();
city.addEventListener("change", getWeather);

const quote = document.querySelector(".quote");
const author = document.querySelector(".author");
const changeQuote = document.querySelector(".change-quote");

async function getQuotes() {
  const url = `https://type.fit/api/quotes`;
  const res = await fetch(url);
  const data = await res.json();
  let num = Math.floor(Math.random() * 1000);
  quote.textContent = data[num].text;
  author.textContent = data[num].author;
}
getQuotes();
changeQuote.addEventListener("click", getQuotes);

let isPlay = false;
let playNum = 0;
const play = document.querySelector(".play");
const audio = new Audio();
const songTitle = document.querySelector(".song-title");
audio.src = playList[playNum].src;


const playListContainer = document.querySelector("ul.play-list");
// playList.forEach((el) => {
//   const playListContainerCild = document.createElement("div");
//   playListContainerCild.classList.add("container-child")
//   const button = document.createElement("div");
//   button.classList.add("playlist-play-pause-buton");
//   const iplay = document.createElement("i");
//   iplay.classList.add("fas");
//   iplay.classList.add("fa-play");
//   button.append(iplay);
//   const ipause = document.createElement("i");
//   ipause.classList.add("fas");
//   ipause.classList.add("fa-pause");
//   ipause.classList.add("display-none");
//   button.append(ipause);
//   playListContainerCild.append(button);
//   const li = document.createElement("li");
//   li.classList.add("play-item");
//   li.textContent = el.title;
//   playListContainerCild.append(li);
//   playListContainer.append(playListContainerCild);
// });
playList.forEach((el) => {
  // const playListContainerCild = document.createElement("div");
  // playListContainerCild.classList.add("container-child")
  // const button = document.createElement("div");
  // button.classList.add("playlist-play-pause-buton");
  // const iplay = document.createElement("i");
  // iplay.classList.add("fas");
  // iplay.classList.add("fa-play");
  // button.append(iplay);
  // const ipause = document.createElement("i");
  // ipause.classList.add("fas");
  // ipause.classList.add("fa-pause");
  // ipause.classList.add("display-none");
  // button.append(ipause);
  // playListContainerCild.append(button);
  const li = document.createElement("li");
  li.classList.add("play-item");
  li.textContent = el.title;
  // playListContainerCild.append(li);
  playListContainer.append(li);
});
const playlistButton = document.querySelectorAll(".playlist-play-pause-buton");


function playAudio() {
  if (!isPlay) {
    // audio.currentTime = 0;
    audio.play();
    play.classList.add("pause");
    playListContainer.children[playNum].classList.add("item-active");
    songTitle.textContent = playList[playNum].title;
    isPlay = true;
  } else {
    audio.pause();
    play.classList.remove("pause");
    playListContainer.children[playNum].classList.remove("item-active");
    // songTitle.textContent = "";
    isPlay = false;
  }
}

// function playAudioWrapper(i) {
//   playNum = i;
//   return playAudio();
// }

play.addEventListener("click", playAudio);
// playlistButton.forEach((el, i) => {
//   el.addEventListener("click", playAudioWrapper(i));
// })

function getPlayNext() {
  playListContainer.children[playNum].classList.remove("item-active");
  playNum < 3 ? playNum++ : (playNum = 0);
  audio.currentTime = 0;
  isPlay = false;
  playAudio();
}
const playNext = document.querySelector(".play-next");
playNext.addEventListener("click", getPlayNext);

function getPlayPrev() {
  playListContainer.children[playNum].classList.remove("item-active");
  playNum > 0 ? playNum-- : (playNum = 3);
  audio.currentTime = 0;
  isPlay = false;
  playAudio();
}
const playPrev = document.querySelector(".play-prev");
playPrev.addEventListener("click", getPlayPrev);

audio.addEventListener("ended", getPlayNext);

const progressBar = document.querySelector("#progress-bar"); // element where progress bar appears
const durationTime = document.querySelector(".durationTime");
const currentTime = document.querySelector(".currentTime");

// update progressBar.max to song object's duration, same for progressBar.value, update currentTime/duration DOM
function updateProgressValue() {
  progressBar.max = audio.duration;
  progressBar.value = audio.currentTime;
  currentTime.innerHTML = formatTime(Math.floor(audio.currentTime));
  if (formatTime(Math.floor(audio.duration)) === "NaN:NaN") {
    durationTime.innerHTML = "0:00";
  } else {
    durationTime.innerHTML = formatTime(Math.floor(audio.duration));
  }
}

function formatTime(seconds) {
  let min = Math.floor(seconds / 60);
  let sec = Math.floor(seconds - min * 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return `${min}:${sec}`;
}

// run updateProgressValue function every 1/2 second to show change in progressBar and song.currentTime on the DOM
setInterval(updateProgressValue, 500);

// function where progressBar.value is changed when slider thumb is dragged without auto-playing audio
function changeProgressBar() {
  audio.currentTime = progressBar.value;
}
progressBar.addEventListener("change", changeProgressBar);

const volumeProgressBar = document.querySelector("#soundVolume");
function changeVolumeProgressBar() {
  audio.volume = volumeProgressBar.value;
  updateVolumeIcon();
}
volumeProgressBar.addEventListener("change", changeVolumeProgressBar);


const volumeIcon = document.querySelector(".volume-button");

function updateVolumeIcon() {
  if (audio.muted || audio.volume === 0) {
    volumeIcon.innerHTML = '<i class="fas fa-volume-mute"></i>';
    volumeIcon.style.opacity = 0.4;
  } else if (audio.volume > 0 && audio.volume <= 0.5) {
    volumeIcon.innerHTML = '<i class="fas fa-volume-down"></i>';
    volumeIcon.style.opacity = 0.9;
  } else {
    volumeIcon.innerHTML = '<i class="fas fa-volume-up"></i>';
    volumeIcon.style.opacity = 1;
  }
}
volumeIcon.addEventListener("click", updateVolumeIcon)

function toggleMute() {
  audio.muted = !audio.muted;
  updateVolumeIcon() 
  // if (audio.muted) {
  //   volumeIcon.innerHTML = '<i class="fas fa-volume-mute"></i>';
  // }
}
volumeIcon.addEventListener("click", toggleMute);

function setLocalStorage() {
  const name = document.querySelector(".name");
  const city = document.querySelector(".city");
  localStorage.setItem("name", name.value);
  localStorage.setItem("city", city.value);
}
window.addEventListener("beforeunload", setLocalStorage);

function getLocalStorage() {
  const name = document.querySelector(".name");
  const city = document.querySelector(".city");
  if (localStorage.getItem("name")) {
    name.value = localStorage.getItem("name");
  }
  if (localStorage.getItem("city")) {
    city.value = localStorage.getItem("city");
  }
}
window.addEventListener("load", getLocalStorage);
