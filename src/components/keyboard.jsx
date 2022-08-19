import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import Keyboard from "react-simple-keyboard";
// import JZZ from 'jazz-midi'

export default function Keeb() {
  const [input, setInput] = useState("");
  const [layout, setLayout] = useState("default");
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
    ';': [0x90, 72, 127], // C5
  };

  // to add playback function to some button by reading input and stitching the keys together

  const isAllowedCharacter = (input) => {
    const regex = /^[ASDFJKL:asdfjkl;\b]*$/g;
    const isMatch = regex.test(input);
    console.log("evaluating isAllowedCharacter:", input);
    console.log("matches regex?", isMatch);
    return isMatch;
  };

  const onChange = (input) => {
    if (isAllowedCharacter(input)) {
      setInput(input);
      console.log("onChange input:", input);
    }
  };

  const onKeyPress = (button) => {
    if (isAllowedCharacter(button)) {
      setInput(button);
      console.log("onKeypress key pressed", button);
      console.log(typeof(button))
      console.log(noteMap[button])
      midiPort.send(noteMap[button]); 
    }
  };

  const onChangeInput = (event) => {
    const input = event.target.value;
    if (isAllowedCharacter(input)) {
      setInput(input);
      keyboard.current.setInput(input);
      console.log("onChangeInput");
    }
  };

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
    </div>
  );
}
