const allSongs = [
  {
    id: 1,
    name: "Jinguchaa Telugu",
    artist: "AR Rahman",
    image: "media/1.jpg",
    genre: "pop",
    source: "media/1.mp3",
  },
  {
    id: 2,
    name: "Chekuthan Malayalam",
    artist: "Ribin Richard, Nihal Sadiq",
    image: "media/2.jpg",
    genre: "rock",
    source: "media/2.mp3",
  },
  {
    id: 3,
    name: "Cradles - Sub Urban",
    artist: "Fin Draper",
    image: "media/3.jpg",
    genre: "rock",
    source: "media/3.mp3",
  },
  {
    id: 4,
    name: "Attention",
    artist: "Charlie Puth",
    image: "media/4.jpg",
    genre: "pop",
    source: "media/4.mp3",
  },
  {
    id: 5,
    name: "Hymn For The Weekend",
    artist: "Coldplay",
    image: "media/5.jpg",
    genre: "rock",
    source: "media/5.mp3",
  },
  {
    id: 6,
    name: "Big Dawgs ",
    artist: "Hanumankind, Kalmi",
    image: "media/6.jpg",
    genre: "hiphop",
    source: "media/6.mp3",
  },
  {
    id: 7,
    name: "The Weeknd - Starboy",
    artist: "Daft Punk",
    image: "media/7.jpg",
    genre: "hiphop",
    source: "media/7.mp3",
  },
  {
    id: 8,
    name: "Shape of You",
    artist: "Ed Sheeran",
    image: "media/8.jpg",
    genre: "pop",
    source: "media/8.mp3",
  },
  {
    id: 9,
    name: "Illuminati Malayalam",
    artist: "Sushin Shyam, Dabzee",
    image: "media/9.jpg",
    genre: "hiphop",
    source: "media/9.mp3",
  },
  {
    id: 10,
    name: "The Karma Theme",
    artist: "Anirudh",
    image: "media/10.jpg",
    genre: "hiphop",
    source: "media/10.mp3",
  },
];

/*****************************************************************************************************************/
let allPlaylists = [
  { name: "My Playlist", songs: [] },
  { name: "Playlist 2", songs: [] },
];
let selectedPlaylist;
let currentSongId;

// showing all the songs
showSongs();
displayAllPlaylists();

// Adding event listener for genre change
document.getElementById("selectGenre").addEventListener("change", showSongs);

// Adding event listener for next song
document.getElementById("next").addEventListener("click", nextSong);

// Adding event listener for previous song
document.getElementById("prev").addEventListener("click", prevSong);

// Adding event listener for add to playlist
document
  .getElementById("addToPlaylist")
  .addEventListener("click", addToPlaylist);

// Adding event listener to create new playlist button
document
  .getElementById("createNewPlaylist")
  .addEventListener("click", createPlaylist);

// To play next song automatically when the current song ended
const audioPlayer = document.getElementById("audioPlayer");
audioPlayer.addEventListener("ended", () => {
  nextSong();
});

// Adding event listener to change theme

const themeSwitch = document.getElementById("switchCheckReverse");

themeSwitch.addEventListener("change", () => {
  toggleTheme();
});

/*****************************************************************************************************************/

// Show songs for songs section
function showSongs() {
  const songsList = document.getElementById("songsList");
  const selectedGenre = document.getElementById("selectGenre").value;

  // Clear previous songs
  songsList.innerHTML = "";

  // Hiding the song-image
  const songImage = document.getElementById("songImage");
  if (!currentSongId) songImage.style.display = "none";
  const cdWrapper = document.querySelector(".cd-wrapper");
  if (!currentSongId) cdWrapper.style.display = "none";

  // Filter and display matching songs
  for (const song of allSongs) {
    if (selectedGenre === "all" || selectedGenre === song.genre) {
      const songTitle = document.createElement("p");
      songTitle.classList.add("song-title");
      songTitle.textContent = song.name;
      songsList.appendChild(songTitle);
      songTitle.addEventListener("click", () => {
        renderCurrentSong(song.id);
      });
    }
  }
}

/*****************************************************************************************************************/

// Render current song in the song card section
function renderCurrentSong(id) {
  currentSong = allSongs[id - 1];
  const nowPlaying = document.querySelector(".now-playing");
  const songImage = document.querySelector(".song-image");
  const songAudio = document.querySelector(".song-audio");

  // Unhiding the songImage element
  songImage.style.display = "flex";

  const cdWrapper = document.querySelector(".cd-wrapper");
  cdWrapper.style.display = "flex";

  nowPlaying.innerHTML = `Now Playing: ${currentSong.name}
  <h6>${currentSong.artist}</h6>`;
  songImage.src = currentSong.image;
  songAudio.src = currentSong.source;

  // assigning id to make it globally accessible
  currentSongId = id;
}

/*****************************************************************************************************************/

// Next song
function nextSong() {
  if (allSongs[currentSongId]) {
    renderCurrentSong(currentSongId + 1);
  } else {
    alert("Oops! You have reached the last song!");
  }
}

// Previous song
function prevSong() {
  if (currentSongId - 1) {
    renderCurrentSong(currentSongId - 1);
  } else {
    alert("You have reached the begining.");
  }
}

/*****************************************************************************************************************/

// add the song to the selected playlist
// let currentPlaylist = myPlaylist;
function addToPlaylist() {
  if (selectedPlaylist !== undefined) {
    if (currentSongId !== undefined) {
      // console.log(selectedPlaylist);
      // console.log(currentSongId);
      allPlaylists.forEach((playlist) => {
        if (playlist.name == selectedPlaylist) {
          if (playlist.songs.includes(currentSongId)) {
            alert("This song is already in your selected playlist");
          } else {
            playlist.songs.push(currentSongId);
            // alert(`Song added to your playlist - ${selectedPlaylist}`);
            showCurrentPlaylistSongs();
            openCurrentPlaylist();
          }
          // console.log(playlist.songs);
        }
      });
    } else {
      alert("Play a song from the songlist");
    }
  } else {
    alert("Select a playlist from all playlists or Create a new Playlist");
  }
}
/*****************************************************************************************************************/

// create playlist function to create a new Playlist
function createPlaylist() {
  let playlistNameEl = document.getElementById("playlistName");
  let playlistName = playlistNameEl.value.trim();
  if (playlistName !== "") {
    if (
      allPlaylists.some(
        (p) => p.name.toLowerCase() === playlistName.toLowerCase()
      )
    ) {
      alert("A playlist with this name already exists!");
      playlistNameEl.value = "";
    } else {
      allPlaylists.push({ name: playlistName, songs: [] });
      playlistNameEl.value = "";
    }
  } else {
    alert("Enter a name to create your new playlist!");
  }
  // show /display Playlist
  const allPlaylistEl = document.getElementById("allPlaylistsContainer");
  allPlaylistEl.innerHTML = "";
  displayAllPlaylists();
}

/*****************************************************************************************************************/

// display all playlists

function displayAllPlaylists() {
  const allPlaylistEl = document.getElementById("allPlaylistsContainer");
  allPlaylists.forEach((playlist) => {
    const newPlaylist = document.createElement("p");
    newPlaylist.classList.add("new-playlist");
    newPlaylist.textContent = playlist.name;
    allPlaylistEl.appendChild(newPlaylist);

    // hiding the currentPlaylistContainer
    const currentPlaylistContainer = document.getElementById(
      "currentPlaylistContainer"
    );
    currentPlaylistContainer.style.display = "none";

    newPlaylist.addEventListener("click", () => {
      selectedPlaylist = newPlaylist.textContent;
      // console.log(selectedPlaylist);
      showCurrentPlaylist();
      showCurrentPlaylistSongs();
    });
  });
}

/*****************************************************************************************************************/

function showCurrentPlaylist() {
  // Unhiding the currentPlaylist container
  const currentPlaylistContainer = document.getElementById(
    "currentPlaylistContainer"
  );
  currentPlaylistContainer.style.display = "block";

  const currentPlaylistEl = document.getElementById("currentPlaylist");

  currentPlaylistEl.innerHTML = `Current Playlist - ${selectedPlaylist}`;

  currentPlaylistEl.addEventListener("click", () => {
    showCurrentPlaylistSongs();
  });
}

/*****************************************************************************************************************/

// render playlist song which should render all the songs in the playlist when it is selected;
function showCurrentPlaylistSongs() {
  allPlaylists.forEach((playlist) => {
    if (playlist.name == selectedPlaylist) {
      const playlistSongEl = document.getElementById("currentPlaylistSongs");
      playlistSongEl.innerHTML = "";

      playlist.songs.forEach((id) => {
        const songEl = document.createElement("p");
        playlistSongEl.appendChild(songEl);
        songEl.innerHTML = `${
          allSongs[id - 1].name
        }  <button type="button" class="btn-close" aria-label="Close"></button>`;

        // Handle playing the song when <p> is clicked
        songEl.addEventListener("click", (e) => {
          if (!e.target.classList.contains("btn-close")) {
            renderCurrentSong(id);
          }
        });

        // Handle removing the song when X is clicked
        const closeBtn = songEl.querySelector(".btn-close");
        closeBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          const index = playlist.songs.indexOf(id);
          if (index !== -1) {
            playlist.songs.splice(index, 1);
            showCurrentPlaylistSongs();
          }
        });
      });
    }
  });
}

/*****************************************************************************************************************/

// function to open the current playlistSongs upon adding a song to playlist

function openCurrentPlaylist() {
  const collapseElement = document.getElementById("myCollapse");
  const collapseInstance = new bootstrap.Collapse(collapseElement, {
    toggle: false, // Prevent it from toggling automatically
  });

  collapseInstance.show(); // Show the collapse content
}

/*****************************************************************************************************************/

// Toggle Theme
function toggleTheme() {
  const body = document.body;
  body.classList.toggle("dark-theme", themeSwitch.checked);
}

/*****************************************************************************************************************/

// search option for song and playlist section
const searchInput = document.getElementById("searchInput");
const dropdown = document.getElementById("searchDropdown");

searchInput.addEventListener("input", function () {
  const query = this.value.toLowerCase();
  dropdown.innerHTML = ""; // Clear previous results

  if (query === "") {
    dropdown.style.display = "none";
    return;
  }

  const results = allSongs.filter(
    (song) =>
      song.name.toLowerCase().includes(query) ||
      song.artist.toLowerCase().includes(query)
  );

  dropdown.style.display = "block"; // Show dropdown

  if (results.length === 0) {
    const noResult = document.createElement("p");
    noResult.textContent = "No results found.";
    noResult.style.color = "gray";
    noResult.style.fontStyle = "italic";
    dropdown.appendChild(noResult);
    return;
  }

  results.forEach((song) => {
    const item = document.createElement("p");
    item.textContent = `${song.name} - ${song.artist}`;
    item.addEventListener("click", () => {
      renderCurrentSong(song.id);
      dropdown.style.display = "none";
      searchInput.value = ""; // Optionally clear search
    });
    dropdown.appendChild(item);
  });
});

// Hiding the dropdown when clicked outside
document.addEventListener("click", (e) => {
  if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.style.display = "none";
  }
});

// To rotate the image during play and pause actions
const audio = document.querySelector("audio");
const image = document.querySelector(".cd-wrapper");

audio.addEventListener("play", () => {
  image.classList.add("spin");
});

audio.addEventListener("pause", () => {
  image.classList.remove("spin");
});

audio.addEventListener("ended", () => {
  image.classList.remove("spin");
});
