import React, { useState } from 'react';
import { FaRuler, FaPlay } from 'react-icons/fa';

const CanvasInitializer = ({ onInitialize, isLoading }) => {
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (width > 0 && height > 0) {
      onInitialize(width, height);
    }
  };

  const presetSizes = [
    { name: 'A4 Portrait', width: 595, height: 842 },
    { name: 'A4 Landscape', width: 842, height: 595 },
    { name: 'Square', width: 600, height: 600 },
    { name: 'Wide Banner', width: 1200, height: 400 },
  ];

  return (
    <div className="card mb-4">
      <div className="card-header bg-primary text-white">
        <h5 className="card-title mb-0 d-flex align-items-center">
          <FaRuler className="me-2" />
          Canvas Setup
        </h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-6">
              <label className="form-label">Width (px)</label>
              <input
                type="number"
                className="form-control"
                value={width}
                onChange={(e) => setWidth(parseInt(e.target.value))}
                min="100"
                max="2000"
                required
              />
            </div>
            <div className="col-6">
              <label className="form-label">Height (px)</label>
              <input
                type="number"
                className="form-control"
                value={height}
                onChange={(e) => setHeight(parseInt(e.target.value))}
                min="100"
                max="2000"
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Quick Presets</label>
            <div className="d-flex flex-wrap gap-2">
              {presetSizes.map((preset, index) => (
                <button
                  key={index}
                  type="button"
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => {
                    setWidth(preset.width);
                    setHeight(preset.height);
                  }}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary-custom btn-custom w-100"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading-spinner me-2"></span>
                Initializing...
              </>
            ) : (
              <>
                <FaPlay className="me-2" />
                Initialize Canvas
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CanvasInitializer;