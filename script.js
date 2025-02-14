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
        title: "Aaj Se Teri - Padman",
        image: "http://hityaflopmovieworld.com/wp-content/uploads/2017/12/aaj-se-teri-from-padman.jpg",
        audio: "MUSIC/128-Aaj Se Teri - Padman 128 Kbps.mp3", // Sample audio
        
    },
    {
        title: "Chale Aana - De De Pyaar De",
        image: "https://i2.wp.com/www.lyricsbogie.com/wp-content/uploads/2020/07/chale-aana-lyrics.jpg?fit=1280%2C720&ssl=1",
        audio: "MUSIC/128-Chale Aana - De De Pyaar De 128 Kbps.mp3", // Sample audio
        
    },
    {
        title: "Ghungroo - War",
        image: "https://i.scdn.co/image/ab67616d0000b273281650a8e8c5d04658d31ac1",
        audio: "MUSIC/128-Ghungroo - War 128 Kbps.mp3", // Sample audio
        
    },
    {
        title: "Hale Dil - Murder 2",
        image: "https://i.ytimg.com/vi/GPVXvEvDwdY/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-DoACwAiKAgwIABABGGUgYyhTMA8=&rs=AOn4CLBPIBeqlj3fgg72_Q1L4FLZdUjBNg",
        audio: "MUSIC/128-Hale Dil - Murder 2 128 Kbps.mp3", // Sample audio
        
    },
    
    {
        title: "Jai Jai Shivshankar - War",
        image: "https://i.ytimg.com/vi/vbQyOJeQ4dg/maxresdefault.jpg",
        audio: "MUSIC/128-Jai Jai Shivshankar - War 128 Kbps.mp3", // Sample audio
        
    },
    
    {
        title: "Kabira (Encore) - Yeh Jawaani Hai Deewani",
        image: "https://s2.dmcdn.net/v/CtNAf1MY3gZGkKMxT/x1080",
        audio: "MUSIC/128-Kabira (Encore) - Yeh Jawaani Hai Deewani 128 Kbps.mp3", // Sample audio
        
    },
    
    {
        title: "Lutt Putt Gaya - Dunki",
        image: "https://i.ytimg.com/vi/iv_TKytXi88/maxresdefault.jpg",
        audio: "MUSIC/128-Lutt Putt Gaya - Dunki 128 Kbps.mp3", // Sample audio
        
    },
    
    {
        title: "Nainowale Ne - Padmaavat",
        image: "https://i.ytimg.com/vi/xE9FBL7jUGA/maxresdefault.jpg",
        audio: "MUSIC/128-Nainowale Ne - Padmaavat 128 Kbps.mp3", // Sample audio
        
    },
    
    {
        title: "Paon Ki Jutti - Jaani",
        image: "https://i.ytimg.com/vi/gkds6yVdDLI/maxresdefault.jpg",
        audio: "MUSIC/128-Paon Ki Jutti - Jaani 128 Kbps.mp3", // Sample audio
        
    },
    
    {
        title: "Ram Siya Ram - Adipurush",
        image: "http://hityaflopmovieworld.com/wp-content/uploads/2023/05/ram-siya-ram-video-song-from-adi.jpg",
        audio: "MUSIC/128-Ram Siya Ram - Adipurush 128 Kbps.mp3", // Sample audio
        
    },
    
    {
        title: "Sab Tera - Baaghi",
        image: "https://s2.dmcdn.net/v/EOUax1Myxd6XSTdwk/x1080",
        audio: "MUSIC/128-Sab Tera - Baaghi 128 Kbps.mp3", // Sample audio
        
    },
    
    {
        title: "Saware - Phantom",
        image: "https://i.ytimg.com/vi/CsOsmgUmT9U/maxresdefault.jpg",
        audio: "MUSIC/128-Saware - Phantom 128 Kbps.mp3", // Sample audio
        
    },
    
    {
        title: "Tere Hawaale - Laal Singh Chaddha",
        image: "https://i1.sndcdn.com/artworks-doyIETzV9gSoxU9t-eEe1AA-t500x500.jpg",
        audio: "MUSIC/128-Tere Hawaale - Laal Singh Chaddha 128 Kbps.mp3", // Sample audio
        
    },
    
    {
        title: "Arcade - Arcade",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThnGzGq2ZYoLytRjFolBLRxNaSWwoj1aOP9g&s",
        audio: "MUSIC/Arcade - Arcade (160 kbps) (1).mp3", // Sample audio
        
    },
    
    {
        title: "Bulleya Sultan",
        image: "https://c.saavncdn.com/583/Bulleya-Reprise-From-Sultan-Hindi-2018-20180531-500x500.jpg",
        audio: "MUSIC/Bulleya Sultan 128 Kbps.mp3", // Sample audio
        
    },
    
    {
        title: "Ed Sheeran - Perfect",
        image: "https://upload.wikimedia.org/wikipedia/en/8/80/Ed_Sheeran_Perfect_Single_cover.jpg",
        audio: "MUSIC/Ed Sheeran - Perfect(Pagalworld.skin).mp3", // Sample audio
        
    },
    
    {
        title: "Gulabi Sadi - Sanju Rathod",
        image: "https://c.saavncdn.com/593/Gulabi-Sadi-Marathi-2024-20240220043332-500x500.jpg",
        audio: "MUSIC/Gulabi Sadi - Sanju Rathod 128 Kbps.mp3", // Sample audio
        
    },
    
    {
        title: "Humnava Mere Jubin Nautiyal",
        image: "https://i.scdn.co/image/ab67616d0000b273c1cd18ce264a99c525dd88f5",
        audio: "MUSIC/Humnava Mere Jubin Nautiyal 128 Kbps.mp3", // Sample audio
        
    },
    
    {
        title: "Ishq Jaisa Kuch - Fighter",
        image: "https://i.ytimg.com/vi/sE5ClC6_yQ8/maxresdefault.jpg",
        audio: "MUSIC/Ishq Jaisa Kuch - Fighter .mp3", // Sample audio
        
    },
    
    {
        title: "Mere Naam Tu - Zero",
        image: "https://i.ytimg.com/vi/TbjbZFqLEtw/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBi2fhu6D_UX9-aH6uF6YHFhO9zqg",
        audio: "MUSIC/Mere Naam Tu - Zero 128 Kbps.mp3", // Sample audio
        
    },
    
    {
        title: "Meri Jaan Gangubai Kathiawadi",
        image: "https://i.ytimg.com/vi/MX-xE6qSXtk/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDzX5LedBIVFQG0EDhsiQ6NeLXdEg",
        audio: "MUSIC/Meri Jaan Gangubai Kathiawadi 128 Kbps.mp3", // Sample audio
        
    },
    
    {
        title: "Payal Glory",
        image: "https://m.media-amazon.com/images/I/41Ns6EsmpCL._UXNaN_FMjpg_QL85_.jpg",
        audio: "MUSIC/Payal Glory 128 Kbps.mp3", // Sample audio
        
    },
    
    {
        title: "Pehla Pyaar - Kabir Singh",
        image: "https://i.ytimg.com/vi/Mm_xoC5kPuw/maxresdefault.jpg",
        audio: "MUSIC/Pehla Pyaar - Kabir Singh 128 Kbps.mp3", // Sample audio
        
    },
    
    {
        title: "Raabta",
        image: "https://i.scdn.co/image/ab67616d0000b2731bcc10d3bd1d77d7c3f164c6",
        audio: "MUSIC/Raabta.mp3" // Sample audio
        
    },
    
    {
        title: "Ram-Aayenge",
        image: "https://i.ytimg.com/vi/lc54LDZjon8/sddefault.jpg?v=654da41c",
        audio: "MUSIC/Ram-Aayenge(PagalNew.Com.Se).mp3"// Sample audio
        
    },
    
    {
        title: "Teri Khair Mangdi",
        image: "https://i.ytimg.com/vi/dMByhaezv9A/maxresdefault.jpg",
        audio: "MUSIC/Teri Khair Mangdi.mp3"// Sample audio
        
    }
    ,
    
    {
        title: "Tu-Tu-Hai-Wahi",
        image: "https://i.ytimg.com/vi/hjfzFVw2Zjo/sddefault.jpg",
        audio: "MUSIC/Tu-Tu-Hai-Wahi(PagalNew.Com.Se).mp3"// Sample audio
        
    }
    ,
    
    {
        title: "Uska Hi Banana 1920 Evil Returns ",
        image: "https://i1.sndcdn.com/artworks-000348125490-iboe4g-t1080x1080.jpg",
        audio: "MUSIC/Uska Hi Banana 1920 Evil Returns 128 Kbps.mp3"// Sample audio
        
    }
    ,
    
    {
        title: "Zaalima Raees",
        image: "https://st1.bollywoodlife.com/wp-content/uploads/photos/2017/01/871688.jpg?impolicy=Medium_Widthonly&w=412&h=290",
        audio: "MUSIC/Zaalima Raees 128 Kbps.mp3"// Sample audio
        
    }
    ,
    
    {
        title: "Tu Meri",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmvp2uRE0ZWunQpyghcxMcULnOrhrKMKm56A&s",
        audio: "MUSIC/bollywood_BB 2014 - Tu Meri.mp3"// Sample audio
        
    }
    ,
    
    {
        title: "tere vaste",
        image: "https://i1.sndcdn.com/artworks-yE3bynzfQQQTpm2r-ktoK9A-t500x500.jpg",
        audio: "MUSIC/tere vaste.mp3"// Sample audio
        
    }
    ,
    
    {
        title: "Nazm Nazm (Ayushmann Khurrana Version)",
        image: "https://i.ytimg.com/vi/0Pu8KCya9YY/hqdefault.jpg",
        audio: "MUSICbollywood_BKB 2017 - Nazm Nazm (Ayushmann Khurrana Version).mp3"// Sample audio
        
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


//list
// Elements
const songListBtn = document.getElementById('song-list-btn');
const songListContainer = document.getElementById('song-list-container');

// Function to toggle the song list display
function toggleSongList() {
    // Show the list with animation
    if (songListContainer.style.display === 'none' || songListContainer.style.display === '') {
        songListContainer.style.display = 'block';
        setTimeout(() => {
            songListContainer.style.opacity = 1;  // Fade-in effect
        }, 10);
    } else {
        songListContainer.style.opacity = 0;
        setTimeout(() => {
            songListContainer.style.display = 'none';  // Hide the list after fade-out
        }, 300);
    }
}

// Function to handle song selection from the list
function selectSong(songIndex) {
    currentSongIndex = songIndex;
    audio.src = songs[currentSongIndex].audio;
    updateSongInfo();
    if (isPlaying) {
        audio.play();
    }
    
    // Hide song list after selection
    songListContainer.style.opacity = 0;
    setTimeout(() => {
        songListContainer.style.display = 'none';  // Hide the list after fading out
    }, 300);
}

// Function to generate and show the song list dynamically
function generateSongList() {
    const songList = document.createElement('ul');
    songs.forEach((song, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = song.title;
        listItem.onclick = () => selectSong(index); // Add click listener for each song
        songList.appendChild(listItem);
    });
    songListContainer.appendChild(songList);
}

// Event Listeners
songListBtn.addEventListener('click', toggleSongList);

// Initialize the song list
generateSongList();


const lightShowToggle = document.getElementById('light-show-toggle');
const lightShowContainer = document.createElement('div');
lightShowContainer.classList.add('light-show');
document.body.appendChild(lightShowContainer);

let lightShowActive = false;

// Function to start or stop the light show
function toggleLightShow() {
    lightShowActive = !lightShowActive;
    if (lightShowActive) {
        lightShowContainer.classList.add('active');
        createCircles();
        lightShowToggle.textContent = '🔆 Light Show ON';
    } else {
        lightShowContainer.classList.remove('active');
        lightShowContainer.innerHTML = '';  // Clear circles when light show is off
        lightShowToggle.textContent = '🔅 Light Show OFF';
    }
}

// Function to generate random circles for the light show
function createCircles() {
    const numberOfCircles = 10;  // Adjust this for more/less circles
    for (let i = 0; i < numberOfCircles; i++) {
        const circle = document.createElement('div');
        circle.classList.add('circle');
        circle.style.width = `${Math.random() * 120 + 20}px`;  // Random size
        circle.style.height = circle.style.width;  // Maintain circle shape
        circle.style.top = `${Math.random() * 100}%`;  // Random position
        circle.style.left = `${Math.random() * 100}%`;  // Random position
        circle.style.animationDuration = `${Math.random() * 2 + 1}s`;  // Random animation duration
        circle.style.animationTimingFunction = 'ease-in-out';
        lightShowContainer.appendChild(circle);
    }
}

// Event listener to toggle light show
lightShowToggle.addEventListener('click', toggleLightShow);

