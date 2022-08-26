import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import Keyboard from "react-simple-keyboard";
import axios from "axios";
// import JZZ from 'jazz-midi'

export default function Keeb() {
  const [input, setInput] = useState("");
  const [layout, setLayout] = useState("default");
  const [songTitle, setSongTitle] = useState('')
  const keyboard = useRef();

  // synth initialization
  JZZ.synth.Tiny.register("Synth");
  const midiPort = JZZ()
    .openMidiOut()
    .or(function () {
      console.log("Cannot open MIDI port!");
    });

  // contains arrays of MIDI note values - [note on, note off, aftertouch]
  // 'C4 D4 E4 F4 G4 A4 B4 C5'
  const noteMap = {
    a: [0x90, 60, 127], // C4
    s: [0x90, 62, 127], // D4
    d: [0x90, 64, 127], // E4
    f: [0x90, 65, 127], // F4
    j: [0x90, 67, 127], // G4
    k: [0x90, 69, 127], // A4
    l: [0x90, 71, 127], // B4
    ";": [0x90, 72, 127], // C5
  };

  const noteMapOff = {
    a: [0x80, 60, 0], // C4
    s: [0x80, 62, 0], // D4
    d: [0x80, 64, 0], // E4
    f: [0x80, 65, 0], // F4
    j: [0x80, 67, 0], // G4
    k: [0x80, 69, 0], // A4
    l: [0x80, 71, 0], // B4
    ";": [0x80, 72, 0], // C5
  };

  const stitchInput = () => {
    const songStr = input;
    for (let i = 0; i < songStr.length; i++) {
      setTimeout(function timer() {
        const inputChar = songStr.charAt(i);
        midiPort.send(noteMap[inputChar]).wait(500).send(noteMapOff[inputChar]);
        // midiPort.send(noteMap[inputChar]).wait(500); // either one works, this version will let the note hold
      }, (i + 1) * 250); // either 500 or 250 sounds ok
    }
  };

  const isAllowedCharacter = (input) => {
    const regex = /^[ASDFJKL:asdfjkl;\b]*$/g;
    const isMatch = regex.test(input);
    return isMatch;
  };

  const onChange = (input) => {
    if (isAllowedCharacter(input)) {
      setInput(input);
    }
  };

  const onKeyPress = (button) => {
    if (isAllowedCharacter(button)) {
      setInput(button);
      midiPort.send(noteMap[button]);
      // midiPort.send(noteMap[button]).wait(500).send(noteMapOff[button]); // this doesnt make the note play for any longer than the line above
    }
  };

  const onChangeInput = (event) => {
    const input = event.target.value;
    if (isAllowedCharacter(input)) {
      setInput(input);
      keyboard.current.setInput(input);
    }
  };

  const onChangeTitle = (textInputEvent) => {
    setSongTitle(textInputEvent.target.value)
  }

  const saveSongData = () => {
    console.log('saving your song...')
    const postPayload = {
      title: songTitle, songData: input
    }
    console.log(postPayload)
    axios.post('/songs', postPayload)
  }

  return (
    <div className="simple-keyboard">
      <input
        value={input}
        placeholder={"Tap on the virtual keyboard to start"}
        onChange={onChangeInput}
        className="input-box"
      />
      <Keyboard
        keyboardRef={(r) => (keyboard.current = r)}
        layoutName={layout}
        onChange={onChange}
        onKeyPress={onKeyPress}
        physicalKeyboardHighlight={true}
        physicalKeyboardHighlightPress={true}
        buttonTheme={[
          {
            class: "enabled-keys",
            buttons: "A S D F a s d f J K L : j k l ; {bksp}",
          },
        ]}
        inputPattern={/^[ASDFJKL:asdfjkl;\b]*$/g}
      />
      <button onClick={stitchInput}>PLAYBACK</button>
      <div>
        <input id="titleInput" type="text" onChange={onChangeTitle}/>
        <button onClick={saveSongData}>SAVE YOUR WORK</button>

      </div>
    </div>
  );
}
