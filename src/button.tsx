//create a button component that can be used in the app called MFE1 if a count function
import React, { useState } from "react";
import "./App.css";
export const Button: React.FC = () => {
  const [count, setCount] = useState(0);
  return (
    <button type="button" onClick={() => setCount((count) => count + 1)}>
      MFE2 test count {count}
    </button>
  );
};
