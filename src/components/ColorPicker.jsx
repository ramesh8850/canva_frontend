import React, { useState } from 'react';

const ColorPicker = ({ color, onChange }) => {
  const [showPicker, setShowPicker] = useState(false);

  const presetColors = [
    '#3498db', '#e74c3c', '#2ecc71', '#f39c12',
    '#9b59b6', '#1abc9c', '#34495e', '#e67e22',
    '#f1c40f', '#e91e63', '#8e44ad', '#27ae60'
  ];

  return (
    <div className="color-picker-wrapper">
      <div className="d-flex align-items-center gap-2">
        <div
          className="color-preview"
          style={{ backgroundColor: color }}
          onClick={() => setShowPicker(!showPicker)}
        ></div>
        <input
          type="color"
          className="form-control form-control-color"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          style={{ width: '60px' }}
        />
      </div>
      
      {showPicker && (
        <div className="mt-2">
          <div className="d-flex flex-wrap gap-1">
            {presetColors.map((presetColor, index) => (
              <div
                key={index}
                className="color-preview"
                style={{ 
                  backgroundColor: presetColor,
                  width: '30px',
                  height: '30px',
                  cursor: 'pointer',
                  border: color === presetColor ? '3px solid #000' : '1px solid #ddd'
                }}
                onClick={() => {
                  onChange(presetColor);
                  setShowPicker(false);
                }}
              ></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;