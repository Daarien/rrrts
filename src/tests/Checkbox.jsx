import React, { useState } from 'react';

export default function Checkbox({labelOn, labelOff}) {
    const [isChecked, toggleCheck] = useState(false);

    const onChange = () => {
        toggleCheck(!isChecked);
    }
  
    return (
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={onChange}
        />
        {isChecked ? labelOn : labelOff}
      </label>
    );
}