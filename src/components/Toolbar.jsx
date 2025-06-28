import React, { useState } from 'react';
import { 
  FaSquare, 
  FaCircle, 
  FaFont, 
  FaImage, 
  FaPlus 
} from 'react-icons/fa';
import ColorPicker from './ColorPicker';

const Toolbar = ({ onAddElement, isLoading, canvasState, fileInputRef }) => {
  const [activeTab, setActiveTab] = useState('rectangle');
  const [formData, setFormData] = useState({
    x: 50,
    y: 50,
    width: 100,
    height: 100,
    radius: 50,
    color: '#3498db',
    text: 'Sample Text',
    font: 'Arial',
    imageUrl: '',
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddElement = (type) => {
    if (!canvasState) return;

    const elementData = { type, ...formData };
    
    if (type === 'image' && fileInputRef.current?.files[0]) {
      elementData.file = fileInputRef.current.files[0];
    }

    onAddElement(elementData);
  };

  const handleFileUpload = () => {
    if (fileInputRef.current?.files[0]) {
      handleAddElement('image');
    }
  };

  const tabs = [
    { id: 'rectangle', label: 'Rectangle', icon: FaSquare },
    { id: 'circle', label: 'Circle', icon: FaCircle },
    { id: 'text', label: 'Text', icon: FaFont },
    { id: 'image', label: 'Image', icon: FaImage },
  ];

  return (
    <div className="card mb-4">
      <div className="card-header">
        <ul className="nav nav-pills card-header-pills">
          {tabs.map(tab => (
            <li key={tab.id} className="nav-item">
              <button
                className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon className="me-1" />
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="card-body">
        {/* Position Controls */}
        <div className="row mb-3">
          <div className="col-6">
            <label className="form-label">X Position</label>
            <input
              type="number"
              className="form-control"
              value={formData.x}
              onChange={(e) => handleInputChange('x', parseInt(e.target.value))}
              min="0"
              max={canvasState?.width || 800}
            />
          </div>
          <div className="col-6">
            <label className="form-label">Y Position</label>
            <input
              type="number"
              className="form-control"
              value={formData.y}
              onChange={(e) => handleInputChange('y', parseInt(e.target.value))}
              min="0"
              max={canvasState?.height || 600}
            />
          </div>
        </div>

        {/* Rectangle Controls */}
        {activeTab === 'rectangle' && (
          <>
            <div className="row mb-3">
              <div className="col-6">
                <label className="form-label">Width</label>
                <input
                  type="number"
                  className="form-control"
                  value={formData.width}
                  onChange={(e) => handleInputChange('width', parseInt(e.target.value))}
                  min="1"
                />
              </div>
              <div className="col-6">
                <label className="form-label">Height</label>
                <input
                  type="number"
                  className="form-control"
                  value={formData.height}
                  onChange={(e) => handleInputChange('height', parseInt(e.target.value))}
                  min="1"
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Color</label>
              <ColorPicker
                color={formData.color}
                onChange={(color) => handleInputChange('color', color)}
              />
            </div>
            <button
              className="btn btn-primary-custom btn-custom w-100"
              onClick={() => handleAddElement('rectangle')}
              disabled={isLoading || !canvasState}
            >
              <FaPlus className="me-2" />
              Add Rectangle
            </button>
          </>
        )}

        {/* Circle Controls */}
        {activeTab === 'circle' && (
          <>
            <div className="mb-3">
              <label className="form-label">Radius</label>
              <input
                type="number"
                className="form-control"
                value={formData.radius}
                onChange={(e) => handleInputChange('radius', parseInt(e.target.value))}
                min="1"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Color</label>
              <ColorPicker
                color={formData.color}
                onChange={(color) => handleInputChange('color', color)}
              />
            </div>
            <button
              className="btn btn-success-custom btn-custom w-100"
              onClick={() => handleAddElement('circle')}
              disabled={isLoading || !canvasState}
            >
              <FaPlus className="me-2" />
              Add Circle
            </button>
          </>
        )}

        {/* Text Controls */}
        {activeTab === 'text' && (
          <>
            <div className="mb-3">
              <label className="form-label">Text</label>
              <input
                type="text"
                className="form-control"
                value={formData.text}
                onChange={(e) => handleInputChange('text', e.target.value)}
                placeholder="Enter your text"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Font</label>
              <select
                className="form-control"
                value={formData.font}
                onChange={(e) => handleInputChange('font', e.target.value)}
              >
                <option value="Arial">Arial</option>
                <option value="Helvetica">Helvetica</option>
                <option value="Times-Roman">Times Roman</option>
                <option value="Courier">Courier</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Color</label>
              <ColorPicker
                color={formData.color}
                onChange={(color) => handleInputChange('color', color)}
              />
            </div>
            <button
              className="btn btn-warning-custom btn-custom w-100"
              onClick={() => handleAddElement('text')}
              disabled={isLoading || !canvasState}
            >
              <FaPlus className="me-2" />
              Add Text
            </button>
          </>
        )}

        {/* Image Controls */}
        {activeTab === 'image' && (
          <>
            <div className="mb-3">
              <label className="form-label">Image URL</label>
              <input
                type="url"
                className="form-control"
                value={formData.imageUrl}
                onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Or Upload File</label>
              <input
                type="file"
                className="form-control"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileUpload}
              />
            </div>
            <div className="row mb-3">
              <div className="col-6">
                <label className="form-label">Width</label>
                <input
                  type="number"
                  className="form-control"
                  value={formData.width}
                  onChange={(e) => handleInputChange('width', parseInt(e.target.value))}
                  min="1"
                />
              </div>
              <div className="col-6">
                <label className="form-label">Height</label>
                <input
                  type="number"
                  className="form-control"
                  value={formData.height}
                  onChange={(e) => handleInputChange('height', parseInt(e.target.value))}
                  min="1"
                />
              </div>
            </div>
            <button
              className="btn btn-info-custom btn-custom w-100"
              onClick={() => handleAddElement('image')}
              disabled={isLoading || !canvasState || (!formData.imageUrl && !fileInputRef.current?.files[0])}
            >
              <FaPlus className="me-2" />
              Add Image
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Toolbar;