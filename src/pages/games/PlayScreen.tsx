import React, { useRef } from "react";
export const PlayScreen = ({ question, answer, editAnswer, submitAnswer }) => {
  const inputEl = useRef(null);
  const onSubmit = (e) => {
    inputEl.current.focus();
    submitAnswer.apply(null, e);
  };
  return (<div>
    <p>{question.a} x {question.b} =
        <input autoFocus={true} placeholder="?" value={answer} onChange={editAnswer} ref={inputEl} />
    </p>
    <button onClick={onSubmit}>Submit</button>
  </div>);
};
