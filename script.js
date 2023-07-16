const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const playButton = document.getElementById("play");

// Music
const songs = [
  {
    name: "Full Video_ Deewangi Deewangi _  Om Shanti Om _ Shahrukh Khan _ Vishal Dadlani, Shekhar Ravjiani (128 kbps).mp3",
    displayName: "Deewangi - Om Shanti Om",
    artist: "Vishal | Shekhar",
    image: "deewangi-song-poster.jpg",
  },
  {
    name: "A.R. Rahman - Raanjhanaa Best Lyric VideoSonam KapoorDhanushJaswinderShiraz.mp3",
    displayName: "Raanjhana",
    artist: "A.R Rahman",
    image: "raanjhana-poster.jpeg",
  },
  {
    name: "bachna ae haseeno full song HQ.mp3",
    displayName: "Bachana Ae Haseeno",
    artist: "Kishore Kumar",
    image: "bachana-ae-song-poster.jpeg",
  },
  {
    name: "'Gallan Goodiyaan' Full Song (Audio) _ Dil Dhadakne Do _ T-Series (320 kbps).mp3",
    displayName: "Gallan Goodiyan",
    artist: "Manish Kumar | Farhan Akhtar",
    image: "gallan-goodiyan-poster.jpeg",
  },
];

// Check if playing
let isPlaying = false;

// PLay
function playSong() {
  isPlaying = true;
  playButton.classList.replace("fa-play", "fa-pause");
  playButton.setAttribute("title", "Pause");
  music.play();
}

// Pause
function pauseSong() {
  isPlaying = false;
  playButton.classList.replace("fa-pause", "fa-play");
  playButton.setAttribute("title", "Play");
  music.pause();
}

// Play or Pause event listener
playButton.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

// Update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `./music/${song.name}`;
  image.src = `./img/${song.image}`;
}

// Current Song
let songIndex = 0;

function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar and Time
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    // update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    // console.log(progressPercent)
    progress.style.width = `${progressPercent}%`;

    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }

    // Delay switching to avoid NaN
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }

    const progressMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }

    // Delay switching to avoid NaN
    if (durationSeconds) {
      currentTimeEl.textContent = `${progressMinutes}:${currentSeconds}`;
    }
  }
}

// Set Prorgress Bar
function setProgressBar(e) {
  const width = this.clientWidth;
  console.log(width);
  const clickX = e.offsetX;
  console.log(clickX);
  const { duration } = music;
  console.log((clickX / width) * duration);
  music.currentTime = (clickX / width) * duration
}

// Event Listeners
prevButton.addEventListener("click", prevSong);
nextButton.addEventListener("click", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
music.addEventListener("ended", nextSong);
progressContainer.addEventListener("click", setProgressBar);
