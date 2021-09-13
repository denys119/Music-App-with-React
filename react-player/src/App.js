import React, { useState } from "react";
//import styles
import "./styles/app.css";
//Adding components
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";
//import utils
import data from "./util";

function App() {
  //State
  const [songs, setSongs] = useState(data()); //am creat un state care contine toate piesele din util.js
  const [currentSong, setCurrentSong] = useState(songs[0]); //am creat un state care contine prima piesa din primul state
  const [isPlaying, setIsPlaying] = useState(false); //utilizam acest state pentru a tine minte daca piesa ruleaza sau nu
  const [libraryStatus, setLibraryStatus] = useState(false);
  return (
    <div className="App">
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      {/* am trimis la componenta song state-ul care contine prima piesa */}
      <Song currentSong={currentSong} />
      <Player
        // trimitem si setIsPlaying pentru a putea modifica isPlaying din false in true
        setIsPlaying={setIsPlaying}
        isPlaying={isPlaying}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        songs={songs}
        setSongs={setSongs}
      />
      <Library
        songs={songs}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
      />
    </div>
  );
}

export default App;
