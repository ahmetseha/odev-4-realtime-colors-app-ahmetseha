import "./App.css";
import { ChromePicker } from "react-color";
import React, { useState, useEffect} from "react";
import { initSocket, disconnectSocket, recieveColor, sendColor } from './socketServices';

function App() {
  const [color, setColor] = useState("darkcyan");
  const [hidden, setHidden] = useState(false);
  
  useEffect(() => {
    initSocket();
    recieveColor(color => { 
      console.log("Reactin içinde:" , color);
      setColor(color);
    })
    return () => disconnectSocket();
  }, []);
  useEffect(() => {
    sendColor(color);
    console.log(color);
  }, [color]);
  return (
    <div style={{ background: color }} className="App">
      {hidden && (
        <ChromePicker
          className="picker"
          color={color}
          onChange={(uptatedColor) => setColor(uptatedColor.hex)}
        />
      )}
      <button className="button" onClick={() => setHidden(!hidden)}>
        {hidden ? "Renk Paletini Kapat" : "Renk Seçimi Yap"}
      </button>
    </div>
  );
}

export default App;
