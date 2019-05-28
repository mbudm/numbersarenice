import * as React from "react"

export const EditName = ({ onEdit }) => {
  const [name, setName] = React.useState("");
  const onChange = e => setName(e.target.value);
  const onSubmit = e => onEdit(name);
  return (<span>
    <input data-testid="edit-name-input" type="text" value={name} onChange={onChange} placeholder="Your name" />
    <button data-testid="edit-name-save-button" onClick={onSubmit}>
      Save
      </button>
  </span>);
};
