window.addEventListener("load", function () {
  const song = document.querySelector("#song");
  const playButton = document.querySelector(".player-play");
  const prevButton = document.querySelector(".player-prev");
  const nextButton = document.querySelector(".player-next");
  const playerDuration = document.querySelector(".player-duration");
  const remaining = document.querySelector(".player-remaining");
  const progressBar = document.querySelector("#progress-bar");
  const playerImage = document.querySelector(".player-image");
  let playing = true;
  const list = ["holo.mp3", "summer.mp3", "home.mp3", "spark.mp3"];
  let songIdx = 0;
  playButton.addEventListener("click", handleMusicPlay);
  nextButton.addEventListener("click", function () {
    handleChangeMusic(1);
  });
  prevButton.addEventListener("click", function () {
    handleChangeMusic(-1);
  });
  song.addEventListener("ended", function () {
    handleChangeMusic(1);
  });
  function handleChangeMusic(direction) {
    if (direction == 1) {
      //Bài nhạc tiếp theo
      songIdx++;
      if (songIdx > list.length - 1) {
        songIdx = 0;
      }
      song.setAttribute("src", `./files/${list[songIdx]}`);
      playing = true;
      handleMusicPlay();
    } else if (direction == -1) {
      //Bài nhạc trước đó
      songIdx--;
      if (songIdx < 0) {
        songIdx = list.length - 1;
      }
      song.setAttribute("src", `./files/${list[songIdx]}`);
      playing = true;
      handleMusicPlay();
    }
  }
  function handleMusicPlay() {
    if (playing) {
      song.play();
      playerImage.classList.add("is-playing");
      playButton.classList.add("fa-pause");
      playing = false;
    } else {
      song.pause();
      playerImage.classList.remove("is-playing");
      playButton.classList.remove("fa-pause");
      playing = true;
    }
  }
  function displayTimer() {
    function displayTimer() {
      const { duration, currentTime } = song;
      progressBar.max = duration;
      progressBar.value = currentTime;
      remaining.textContent = formatTimer(currentTime);
      if (!duration) {
        playerDuration.textContent = "0:00";
      } else {
        playerDuration.textContent = formatTimer(duration);
      }
    }
  }
  function formatTimer(number) {
    const minutes = Math.floor(number / 60);
    const seconds = Math.floor(number - minutes * 60);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  }
  progressBar.addEventListener("change", handleDragProgressBar);
  function handleDragProgressBar() {
    song.currentTime = progressBar.value;
  }
  displayTimer();
  const timer = this.setInterval(displayTimer, 1000);
});
