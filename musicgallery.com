<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Premium Music Player</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>

    <div class="music-player">
        <div class="song-info">
            <h2>Music Player</h2>
            <p id="song-title">Song Title</p>
        </div>

        <!-- Song Image -->
        <div class="song-image" id="song-image"></div>

        <div class="player-controls">
            <button class="btn" id="prev-song">&#8249;</button>
            <button class="btn" id="play-pause">&#9654;</button>
            <button class="btn" id="next-song">&#8250;</button>
        </div>

        <div class="volume-control">
            <span>Volume:</span>
            <input type="range" class="slider" id="volume" value="100" max="100" />
            <button class="mute-btn" id="mute">&#128263;</button>
        </div>

        <div class="song-slider" id="song-slider">
            <div class="song-slider-progress" id="song-progress"></div>
        </div>

        <div class="song-time">
            <span id="current-time">0:00</span> / <span id="duration">3:45</span>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
