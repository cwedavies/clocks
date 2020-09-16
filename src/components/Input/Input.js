import React, { useState } from "react";

const Input = (props) => {
  const { value: initialValue, onChange: onChangeProp, ...otherProps } = props;

  const [value, setValue] = useState(initialValue);

  const onChange = (e) => {
    e.preventDefault();
    if (e.target.value !== initialValue) {
      setValue(e.target.value);
    }
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.target.blur();
    }
  };

  const onBlur = () => {
    onChangeProp(value);
  };

  return (
    <input
      {...otherProps}
      type="text"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
    />
  );
};

export default Input;
