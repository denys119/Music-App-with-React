import React from "react";

const LibrarySong = ({ song, songs, setCurrentSong, id, setSongs }) => {
  const songSelectHandler = () => {
    const selectedSong = song;
    setCurrentSong(selectedSong);
    //add active state
    const newSongs = songs.map((song) => {
      if (song.id === id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setSongs(newSongs);
  };

  return (
    <div
      onClick={songSelectHandler}
      className={`library-song ${song.active ? `selected` : ""}`}
    >
      <img alt={song.name} src={song.cover}></img>
      <div className="song-description">
        <h2>{song.name}</h2>
        <h3>{song.artist}</h3>
      </div>
    </div>
  );
};

export default LibrarySong;
