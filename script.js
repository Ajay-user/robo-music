const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress-bar");
const music = document.querySelector("audio");
const body = document.querySelector("body");

const span = document.querySelectorAll("span");

const roboText = document.getElementById("robo-text");

const roboHead = document.getElementById("head");
const leftArm = document.getElementById("left_arm");
const torso = document.getElementById("torso");
const leftLeg = document.getElementById("left_leg");

const songInfoEl = document.getElementById("song-info-container");
const artist = document.getElementById("artist");
const title = document.getElementById("song-title");

const songs = [
  {
    name: "jacinto-1",
    displayName: "Electric Chill Machine",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-2",
    displayName: "Seven Nation Army (Remix)",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-3",
    displayName: "Goodnight, Disco Queen",
    artist: "Jacinto Design",
  },
  {
    name: "metric-1",
    displayName: "Front Row (Remix)",
    artist: "Metric/Jacinto Design",
  },
];

// global variables
let isPlaying = false;
let currentSongIndex = 0;

const toggleSongInfo = () => {
  roboText.hidden = true;
  songInfoEl.hidden = false;
  setTimeout(() => {
    songInfoEl.hidden = true;
    roboText.hidden = false;
  }, 10000);
};

// load the music
const loadSong = (song) => {
  music.src = `music/${song.name}.mp3`;
  // music info
  artist.innerText = `${song.artist}`;
  title.innerText = `${song.displayName}`;
  roboText.innerText = `${song.displayName}`;
};

// play / pause music on click
const playMusic = () => {
  isPlaying = true;
  loadSong(songs[currentSongIndex]);
  music.play();
  toggleSongInfo();
  playBtn.classList.replace("fa-play", "fa-pause");
};
const pauseMusic = () => {
  isPlaying = false;
  music.pause();
  playBtn.classList.replace("fa-pause", "fa-play");
};

// change songs
const prevSong = () => {
  currentSongIndex--;
  if (currentSongIndex < 0) {
    currentSongIndex = songs.length - 1;
  }
  playMusic();
};
const nextSong = () => {
  currentSongIndex++;
  if (currentSongIndex > 3) {
    currentSongIndex = 0;
  }
  playMusic();
};

// percentage calculator
const getPercentage = (x, y) => Math.floor((x / y) * 100);
// seek music using progress bar
const seekProgress = (e) => {
  const { offsetX } = e;
  const clientWidth = e.srcElement.clientWidth;

  const percentage = getPercentage(offsetX, clientWidth);
  const duration = music.duration;
  // update the current position
  music.currentTime = (duration * percentage) / 100;
};

// change background-color
const getColors = () => {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
const getDirections = () => {
  var directions = [
    "top left",
    "top center",
    "top right",
    "center left",
    "center center",
    "center right",
    "bottom left",
    "bottom center",
    "bottom right",
  ];
  return directions[Math.floor(Math.random() * directions.length)];
};
const changeBackgroundColor = () => {
  body.style.background = `linear-gradient(to bottom, ${getColors()} 0%, ${getColors()} 100%)`;
};

// convert the time in seconds intp  minutes:seconds   -  utilty function
const convertTimeToMinutesAndSeconds = (inputTimeInSeconds) => {
  let timeInMinutes = Math.floor(inputTimeInSeconds / 60);
  let timeInSeconds = Math.floor(inputTimeInSeconds % 60);
  if (timeInMinutes < 10) {
    timeInMinutes = `0${timeInMinutes}`;
  }
  if (timeInSeconds < 10) {
    timeInSeconds = `0${timeInSeconds}`;
  }

  return { timeInMinutes, timeInSeconds };
};

// updates the playback info current-time and duration --  utilty function
const infoUpdate = (info, index) => {
  const { timeInMinutes, timeInSeconds } = convertTimeToMinutesAndSeconds(info);
  if (timeInMinutes) {
    span[index].textContent = `${timeInMinutes}:${timeInSeconds}`;
  }
};

const playbackUpdate = (e) => {
  const { duration, currentTime } = e.target;
  // compute the progress percentage to update progress-bar
  const progressPercentage = Math.floor((currentTime / duration) * 100);
  progress.style.width = `${progressPercentage}%`;
  // change background color
  changeBackgroundColor();

  // updating playback current-time and duration
  infoUpdate(currentTime, 0);
  infoUpdate(duration, 1);

  // dance moves
  roboHead.classList.toggle("rotate_3d_left");
  leftArm.classList.toggle("rotate_20_left");
  torso.classList.toggle("rotate_5_left");
  leftLeg.classList.toggle("rotate_20_left");
};

// event listeners
playBtn.addEventListener("click", () => {
  isPlaying ? pauseMusic() : playMusic();
});
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("timeupdate", playbackUpdate);
music.addEventListener("ended", nextSong);
progressContainer.addEventListener("click", seekProgress);
