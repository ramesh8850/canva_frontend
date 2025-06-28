import React, { useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Navbar from './components/Navbar';
import CanvasInitializer from './components/CanvasInitializer';
import Toolbar from './components/Toolbar';
import CanvasPreview from './components/CanvasPreview';
import ElementsList from './components/ElementsList';
import apiService from './services/apiService';

function App() {
  const [canvasState, setCanvasState] = useState(null);
  const [elements, setElements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const initializeCanvas = async (width, height) => {
    setIsLoading(true);
    try {
      const response = await apiService.initCanvas(width, height);
      if (response.success) {
        setCanvasState({ width, height });
        setElements([]);
        toast.success('Canvas initialized successfully!');
      }
    } catch (error) {
      toast.error('Failed to initialize canvas');
      console.error('Error initializing canvas:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addElement = async (elementData) => {
    if (!canvasState) {
      toast.error('Please initialize canvas first');
      return;
    }

    setIsLoading(true);
    try {
      let response;
      switch (elementData.type) {
        case 'rectangle':
          response = await apiService.addRectangle(elementData);
          break;
        case 'circle':
          response = await apiService.addCircle(elementData);
          break;
        case 'text':
          response = await apiService.addText(elementData);
          break;
        case 'image':
          if (elementData.file) {
            response = await apiService.addImageFile(elementData);
          } else {
            response = await apiService.addImageUrl(elementData);
          }
          break;
        default:
          throw new Error('Unknown element type');
      }

      if (response.success) {
        setElements(prev => [...prev, { ...elementData, id: Date.now() }]);
        toast.success(`${elementData.type} added successfully!`);
      }
    } catch (error) {
      toast.error(`Failed to add ${elementData.type}`);
      console.error('Error adding element:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const exportToPDF = async () => {
    if (!canvasState || elements.length === 0) {
      toast.error('Please add some elements to the canvas first');
      return;
    }

    setIsLoading(true);
    try {
      // First get the PDF URL from backend
      const exportResponse = await apiService.exportToPDF(canvasState);

      if (exportResponse.success && exportResponse.url) {
        // Then download the actual PDF file
        const pdfUrl = exportResponse.url.startsWith('http')
          ? exportResponse.url
          : `http://localhost:5000${exportResponse.url}`;

        const pdfResponse = await fetch(pdfUrl);
        const pdfBlob = await pdfResponse.blob();
        const blobUrl = window.URL.createObjectURL(pdfBlob);

        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = exportResponse.url.split('/').pop() || 'canvas-design.pdf';
        document.body.appendChild(a);
        a.click();

        // Cleanup
        window.URL.revokeObjectURL(blobUrl);
        document.body.removeChild(a);

        toast.success('PDF exported successfully!');
      } else {
        toast.error('Failed to export PDF: Invalid response');
      }
    } catch (error) {
      toast.error('Failed to export PDF');
      console.error('Error exporting PDF:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearCanvas = () => {
    setCanvasState(null);
    setElements([]);
    toast.info('Canvas cleared');
  };

  const removeElement = (elementId) => {
    setElements(prev => prev.filter(el => el.id !== elementId));
    toast.info('Element removed');
  };

  return (
    <div className="App">
      <Navbar />
      
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-lg-3">
            <div className="fade-in">
              <CanvasInitializer 
                onInitialize={initializeCanvas}
                isLoading={isLoading}
              />
              
              <Toolbar 
                onAddElement={addElement}
                isLoading={isLoading}
                canvasState={canvasState}
                fileInputRef={fileInputRef}
              />
              
              <ElementsList 
                elements={elements}
                onRemoveElement={removeElement}
              />
            </div>
          </div>
          
          <div className="col-lg-9">
            <div className="fade-in">
              <CanvasPreview 
                canvasState={canvasState}
                elements={elements}
                onExportPDF={exportToPDF}
                onClearCanvas={clearCanvas}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;