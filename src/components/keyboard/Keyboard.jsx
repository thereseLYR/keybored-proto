import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import SaveIcon from "@mui/icons-material/Save";
import { Button, IconButton, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import axios from "axios";
import React, { useRef, useState } from "react";
import Keyboard from "react-simple-keyboard";

function KeyboardRow(props) {
  const { input, layout, onKeyPress } = props;
  return (
    <Grid item container direction="row">
      <Grid item xs={12}>
        <div id="keyboard-sound">
          <input
            value={input}
            placeholder={"Tap on the virtual keyboard to start"}
            className="input-box"
            disabled
          />
          <Keyboard
            // keyboardRef={(r) => (keyboard.current = r)}
            layoutName={layout}
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
      </Grid>
    </Grid>
  );
}

 function UtilityRow(props) {
  const {onChangeTitleFunction, titleBoxStatusFunction, saveSongFunction, stitchInputFunction, inputState, songTitleState} = props
    return (
      <Grid item container direction="row">
        <Grid item xs={10} style={{}} py={2}>
          <TextField
            id="title-textfield"
            type="string"
            label="Title"
            variant="standard"
            autoComplete="off"
            fullWidth={true}
            onChange={onChangeTitleFunction}
            onFocus={() => titleBoxStatusFunction(true)}
            onBlur={() => titleBoxStatusFunction(false)}
          />
        </Grid>

        <Grid item xs={1} style={{ textAlign: "center" }} alignItems="center">
          <IconButton
            onClick={saveSongFunction}
            size="large"
            disabled={!(inputState.length && songTitleState.length)}
          >
            <SaveIcon fontSize="inherit" />
          </IconButton>
        </Grid>

        <Grid item xs={1} style={{ textAlign: "center" }}>
          <IconButton
            onClick={stitchInputFunction}
            size="large"
            disabled={!songTitleState.length}
          >
            <PlayCircleIcon fontSize="inherit" />
          </IconButton>
        </Grid>
      </Grid>
    );
  }

export default function Keeb() {
  const [input, setInput] = useState("");
  const [layout, setLayout] = useState("default");
  const [songTitle, setSongTitle] = useState("");
  const [titleBoxActive, setTitleBoxActive] = useState(false);

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
    // backspace input, which is tested as {bksp} doesnt remove last character from input even when isMatch is overriden
    return isMatch;
  };

  const onKeyPress = (button) => {
    if (isAllowedCharacter(button) && titleBoxActive == false) {
      setInput(input + button);
      midiPort.send(noteMap[button]);
      // midiPort.send(noteMap[button]).wait(500).send(noteMapOff[button]); // this doesnt make the note play for any longer than the line above
    }
  };

  const onChangeTitle = (textInputEvent) => {
    if (titleBoxActive) {
      setSongTitle(textInputEvent.target.value);
    }
  };

  const saveSongData = () => {
    console.log("saving your song...");
    const postPayload = {
      title: songTitle,
      songData: input,
    };
    console.log(postPayload);

    axios
      .post("/songs", postPayload)
      // .then(setSongTitle(""))
      .catch((err) => {
        console.log(err);
        alert("Please register an account to save your work");
      });
  };

 

  return (
    <div style={{ margin: "25px" }}>
      <Grid
        container
        spacing={0}
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{
          height: "100%",
          minHeight: "100vh",
          maxWidth: "100%",
          display: "flex",
        }}
      >

        <UtilityRow onChangeTitleFunction={onChangeTitle} titleBoxStatusFunction={setTitleBoxActive} saveSongFunction={saveSongData} stitchInputFunction={stitchInput} inputState={input} songTitleState={songTitle} />

        <KeyboardRow input={input} layout={layout} onKeyPress={onKeyPress} />
      </Grid>
    </div>
  );
}
