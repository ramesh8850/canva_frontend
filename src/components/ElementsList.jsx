import React from 'react';
import { 
  FaSquare, 
  FaCircle, 
  FaFont, 
  FaImage, 
  FaTrash,
  FaList 
} from 'react-icons/fa';

const ElementsList = ({ elements, onRemoveElement }) => {
  const getElementIcon = (type) => {
    switch (type) {
      case 'rectangle': return <FaSquare />;
      case 'circle': return <FaCircle />;
      case 'text': return <FaFont />;
      case 'image': return <FaImage />;
      default: return null;
    }
  };

  const getElementDescription = (element) => {
    switch (element.type) {
      case 'rectangle':
        return `${element.width}×${element.height}px`;
      case 'circle':
        return `r=${element.radius}px`;
      case 'text':
        return `"${element.text.substring(0, 20)}${element.text.length > 20 ? '...' : ''}"`;
      case 'image':
        return `${element.width}×${element.height}px`;
      default:
        return '';
    }
  };

  if (elements.length === 0) {
    return (
      <div className="card">
        <div className="card-header">
          <h6 className="card-title mb-0 d-flex align-items-center">
            <FaList className="me-2" />
            Elements
          </h6>
        </div>
        <div className="card-body text-center text-muted">
          <FaList size={32} className="mb-2" />
          <p className="mb-0">No elements added yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <h6 className="card-title mb-0 d-flex align-items-center">
          <FaList className="me-2" />
          Elements ({elements.length})
        </h6>
      </div>
      <div className="card-body p-0">
        <div className="list-group list-group-flush">
          {elements.map((element, index) => (
            <div key={element.id} className="list-group-item d-flex align-items-center">
              <div className="me-3 d-flex align-items-center">
                <div 
                  className="me-2"
                  style={{ color: element.color || '#666' }}
                >
                  {getElementIcon(element.type)}
                </div>
                <div>
                  <div className="fw-medium text-capitalize">
                    {element.type}
                  </div>
                  <small className="text-muted">
                    {getElementDescription(element)}
                  </small>
                </div>
              </div>
              
              <div className="ms-auto">
                <small className="text-muted me-2">
                  ({element.x}, {element.y})
                </small>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => onRemoveElement(element.id)}
                  title="Remove element"
                >
                  <FaTrash size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ElementsList;