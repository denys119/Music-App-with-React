import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //Componenta FontAwesome
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons"; //Iconita faPlay
const Player = ({
  currentSong,
  isPlaying,
  setIsPlaying,
  setCurrentSong,
  songs,
  setSongs,
}) => {
  //Ref
  const audioRef = useRef(null); //in React nu putem folosi document.getQuerySelector, utilizam useRef
  //UseEffect
  useEffect(() => {
    //add active state
    const newSongs = songs.map((song) => {
      if (song.id === currentSong.id) {
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
  }, [currentSong]);
  //Event Handlers
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };
  //practic in timp ce melodia ruleaza putem extrage cu ajutorul functiei de mai jos timpul curent si durata intregului cantec dupa care putem seta stateul creat mai jos unde valorile erau nule cu cele actualizate in cadrul functiei
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    //calculate percentage
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100);
    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration,
      animationPercentage: animation,
    }); //we update the state everytime the song is running
  };
  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2) //formateaza timpul in minute si secunde
    );
  };
  const dragHandler = (e) => {
    //cand modific inputul vreau ca videoclipul sa isi schimbe valoarea timpului la cea noua
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value }); //actualizam state-ul si modificam timpul curent la cel nou obtinut prin evenimentul de schimbare a imputului
  };
  const autoPlayHandler = () => {
    if (isPlaying) {
      audioRef.current.play();
    }
  };
  const skipTrackHandler = (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id); //daca idul melodiei pe care am dat click este la fel cu id-ul melodiei curente inseamna ca suntem pe acea piesa deci va trebui sa o schimbam(asa aflam care este idul piesei curente)
    //verificam care este directia in care dorim sa schimbam melodia
    if (direction === "skip-forward") {
      setCurrentSong(songs[currentIndex + 1] || songs[0]); //va tot schimba melodia pana la ultima, iar daca nu mai sunt melodii va revenii la prima
    } else {
      setCurrentSong(songs[currentIndex - 1] || songs[songs.length - 1]); //la fel ca in cazul de mai sus doar ca de data asta se scade indexul
    }
  };
  const songEndHandler = () => {
    skipTrackHandler("skip-forward");
  };
  //State
  //use the next state so we can update the audio time
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });
  //add sttyle
  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };
  return (
    <div className="player-container">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`,
          }}
          className="track"
        >
          <input
            value={songInfo.currentTime}
            type="range"
            max={songInfo.duration || 0}
            min={0}
            onChange={dragHandler}
          />
          <div style={trackAnim} className="animate-track"></div>
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-back")}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-forward")}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
      {/* pentru a lega tagul de referinta ii adaugam un atribut ref in care punem referinta creata mai sus */}
      <audio
        onLoadedData={autoPlayHandler}
        onTimeUpdate={timeUpdateHandler}
        onEnded={songEndHandler}
        // utilizam evenimentul de mai jos pentru a actualiza timpul melodiei la momentul incarcarii documentului
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  );
};

export default Player;
