const songTitle = document.getElementById('song-title');
const playPauseBtn = document.getElementById('play-pause');
const prevBtn = document.getElementById('prev-song');
const nextBtn = document.getElementById('next-song');
const songSlider = document.getElementById('song-slider');
const songProgress = document.getElementById('song-progress');
const volumeSlider = document.getElementById('volume');
const muteBtn = document.getElementById('mute');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const songImage = document.getElementById('song-image');

let isPlaying = false;
let currentSongIndex = 0;
let isMuted = false;
let scrollTimeout = null;  // To handle scroll debounce
let touchStart = 0;  // To store touch start position
let songs = [
    {
        title: "Song 1",
        image: "https://via.placeholder.com/150",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Sample audio
        duration: 225 // Duration in seconds
    },
    {
        title: "Song 2",
        image: "https://via.placeholder.com/150",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", // Sample audio
        duration: 240
    },
    {
        title: "Song 3",
        image: "https://via.placeholder.com/150",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", // Sample audio
        duration: 180
    }
];
let audio = new Audio(songs[currentSongIndex].audio);

// Update Song Title, Image and Duration
function updateSongInfo() {
    songTitle.textContent = songs[currentSongIndex].title;
    songImage.style.backgroundImage = `url(${songs[currentSongIndex].image})`;
    durationEl.textContent = formatTime(songs[currentSongIndex].duration);
}

// Play/Pause the Song
function playPause() {
    isPlaying = !isPlaying;
    playPauseBtn.textContent = isPlaying ? "⏸" : "▶";
    if (isPlaying) {
        audio.play();
        updateProgressBar();
    } else {
        audio.pause();
    }
}

// Play next song
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    audio.src = songs[currentSongIndex].audio;
    updateSongInfo();
    if (isPlaying) {
        audio.play();
    }
}

// Play previous song
function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    audio.src = songs[currentSongIndex].audio;
    updateSongInfo();
    if (isPlaying) {
        audio.play();
    }
}

// Mute/Unmute the Audio
function toggleMute() {
    isMuted = !isMuted;
    muteBtn.textContent = isMuted ? "🔊" : "🔇";
    volumeSlider.disabled = isMuted;
    audio.muted = isMuted;
}

// Update Volume
function updateVolume() {
    if (!isMuted) {
        const volume = volumeSlider.value;
        audio.volume = volume / 100;
    }
}

// Format time in MM:SS format
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds}`;
}

// Update song progress
function updateProgressBar() {
    audio.addEventListener('timeupdate', function() {
        const currentTime = audio.currentTime;
        songProgress.style.width = `${(currentTime / audio.duration) * 100}%`;
        currentTimeEl.textContent = formatTime(currentTime);
    });
}

// Scroll to change song after full scroll (mouse and touch)
function handleScroll(event) {
    if (scrollTimeout !== null) {
        clearTimeout(scrollTimeout);  // Clear previous scroll event
    }

    scrollTimeout = setTimeout(function() {
        if (event.deltaY < 0) {
            prevSong(); // Scroll up
        } else if (event.deltaY > 0) {
            nextSong(); // Scroll down
        }
    }, 200);  // Delay in ms after scroll action is done
}

// Click on the song progress bar to skip
songSlider.addEventListener('click', function(event) {
    const progressWidth = songSlider.offsetWidth;
    const clickPosition = event.offsetX;
    const newTime = (clickPosition / progressWidth) * audio.duration;
    audio.currentTime = newTime;
    songProgress.style.width = `${(newTime / audio.duration) * 100}%`;
});

// Handle touch start to detect swipe direction on mobile
songSlider.addEventListener('touchstart', function(event) {
    touchStart = event.touches[0].clientY; // Store the initial touch position
});

// Handle touch move to detect swipe direction on mobile
songSlider.addEventListener('touchmove', function(event) {
    handleTouchScroll(event); // Use the same handleScroll function to detect scroll
});

// Function to handle touch scroll for mobile
function handleTouchScroll(event) {
    const touchDelta = touchStart - event.touches[0].clientY;
    if (touchDelta > 50) { // Swipe up
        prevSong();
        touchStart = event.touches[0].clientY; // Reset touchStart after action
    } else if (touchDelta < -50) { // Swipe down
        nextSong();
        touchStart = event.touches[0].clientY; // Reset touchStart after action
    }
}

// Event Listeners
playPauseBtn.addEventListener('click', playPause);
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);
muteBtn.addEventListener('click', toggleMute);
volumeSlider.addEventListener('input', updateVolume);
window.addEventListener('wheel', handleScroll); // Handle mouse scroll event for changing songs

// Initial Setup
updateSongInfo();
audio.onloadedmetadata = () => updateSongInfo();
