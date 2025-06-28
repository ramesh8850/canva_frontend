import React from 'react';
import { FaDownload, FaTrash, FaEye } from 'react-icons/fa';

const CanvasPreview = ({ canvasState, elements, onExportPDF, onClearCanvas, isLoading }) => {
  if (!canvasState) {
    return (
      <div className="canvas-container text-center py-5">
        <div className="text-muted">
          <FaEye size={48} className="mb-3" />
          <h4>Canvas Preview</h4>
          <p>Initialize a canvas to start designing</p>
        </div>
      </div>
    );
  }

  const scale = Math.min(800 / canvasState.width, 600 / canvasState.height, 1);
  const scaledWidth = canvasState.width * scale;
  const scaledHeight = canvasState.height * scale;

  const renderElement = (element, index) => {
    const style = {
      left: element.x * scale,
      top: element.y * scale,
    };

    switch (element.type) {
      case 'rectangle':
        return (
          <div
            key={index}
            className="element-item"
            style={{
              ...style,
              width: element.width * scale,
              height: element.height * scale,
              backgroundColor: element.color,
              border: '1px solid rgba(0,0,0,0.1)',
            }}
          />
        );
      
      case 'circle':
        return (
          <div
            key={index}
            className="element-item"
            style={{
              ...style,
              width: element.radius * 2 * scale,
              height: element.radius * 2 * scale,
              backgroundColor: element.color,
              borderRadius: '50%',
              border: '1px solid rgba(0,0,0,0.1)',
            }}
          />
        );
      
      case 'text':
        return (
          <div
            key={index}
            className="element-item"
            style={{
              ...style,
              color: element.color,
              fontFamily: element.font || 'Arial',
              fontSize: 12 * scale,
              whiteSpace: 'nowrap',
            }}
          >
            {element.text}
          </div>
        );
      
      case 'image':
        return (
          <div
            key={index}
            className="element-item"
            style={{
              ...style,
              width: element.width * scale,
              height: element.height * scale,
              backgroundColor: '#f0f0f0',
              border: '2px dashed #ccc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              color: '#666',
            }}
          >
            {element.imageUrl ? (
              <img
                src={element.imageUrl}
                alt="Canvas element"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentNode.innerHTML = 'Image failed to load';
                }}
              />
            ) : (
              'Image'
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="canvas-container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Canvas Preview</h4>
        <div className="d-flex gap-2">
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={onClearCanvas}
            disabled={isLoading}
          >
            <FaTrash className="me-1" />
            Clear
          </button>
          <button
            className="btn btn-success btn-sm"
            onClick={onExportPDF}
            disabled={isLoading || elements.length === 0}
          >
            {isLoading ? (
              <>
                <span className="loading-spinner me-2"></span>
                Exporting...
              </>
            ) : (
              <>
                <FaDownload className="me-1" />
                Export PDF
              </>
            )}
          </button>
        </div>
      </div>

      <div className="canvas-info mb-3">
        <small className="text-muted">
          Canvas Size: {canvasState.width} × {canvasState.height}px | 
          Elements: {elements.length} | 
          Scale: {Math.round(scale * 100)}%
        </small>
      </div>

      <div
        className="canvas-preview position-relative"
        style={{
          width: scaledWidth,
          height: scaledHeight,
          margin: '0 auto',
        }}
      >
        {elements.map(renderElement)}
        
        {elements.length === 0 && (
          <div className="position-absolute top-50 start-50 translate-middle text-muted">
            <div className="text-center">
              <FaEye size={32} className="mb-2" />
              <p>Add elements to see them here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CanvasPreview;