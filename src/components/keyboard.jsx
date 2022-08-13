import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import Keyboard from "react-simple-keyboard";

export default function Keeb() {
  const [input, setInput] = useState("");
  const [layout, setLayout] = useState("default");
  const keyboard = useRef();

  const isAllowedCharacter = (input) => {
    const regex = /[ASDFJKL:asdfjkl;]/g;
    const isMatch = regex.test(input);
    console.log(isMatch);
    return isMatch;
  };

  const onChange = (input) => {
    // const input = input.target.value;
    console.log('onChange input:', input)
    if (isAllowedCharacter(input)) {
      setInput(input);
      console.log("Input changed", input);
    }
  };

  const onKeyPress = (button) => {
    // const input = button.target.value;
    if (isAllowedCharacter(button)) {
      setInput(button);
      console.log("Key Pressed", button);
    }
  };

  const onChangeInput = (event) => {
    if (isAllowedCharacter(event.target.value)) {
      setInput(input);
      // keyboard.current.setInput(input);
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
          { class: "enabled-keys", buttons: "A S D F a s d f J K L : j k l ;" },
        ]}
        inputPattern={/[ASDFJKL:asdfjkl;]/g}
      />
    </div>
  );
}
