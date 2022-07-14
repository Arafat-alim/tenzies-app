import React from "react";

export default function Die(props) {
  return (
    <div className="dice-face">
      <div className="dice-value">{props.value}</div>
    </div>
  );
}
