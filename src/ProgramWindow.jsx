import { useEffect, useState, useRef } from 'react';

const ProgramWindow = ({ title = "Program", content, isOpen, onClose, width = 500, height = 300 }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [position, setPosition] = useState({ x: 50, y: 50 });
    const [size, setSize] = useState({ width, height });
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [resizeStart, setResizeStart] = useState({ x: 0, y: 0 });
    const [initialSize, setInitialSize] = useState({ width, height });
    const windowRef = useRef(null);
 
    useEffect(() => {
      // Focus the window when it opens
      if (isOpen && windowRef.current) {
        windowRef.current.focus();
      }
    }, [isOpen]);
 
    const handleMouseDown = (e) => {
      if (e.target.closest('.window-header')) {
        setIsDragging(true);
        const rect = windowRef.current.getBoundingClientRect();
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };
 
    const handleMouseMove = (e) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
      } else if (isResizing) {
        // Calculate new width and height based on mouse position
        const newWidth = Math.max(200, initialSize.width + (e.clientX - resizeStart.x));
        const newHeight = Math.max(150, initialSize.height + (e.clientY - resizeStart.y));
        
        setSize({
          width: newWidth,
          height: newHeight
        });
      }
    };
 
    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };
    
    const handleResizeStart = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsResizing(true);
      setResizeStart({
        x: e.clientX,
        y: e.clientY
      });
      setInitialSize({
        width: size.width,
        height: size.height
      });
    };
 
    useEffect(() => {
      if (isDragging || isResizing) {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
      } else {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      }
     
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }, [isDragging, isResizing]);
 
    if (!isOpen) return null;
 
    return (
      <div
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={(e) => {
          // Only close if clicking outside the window
          if (e.target === e.currentTarget) {
            // Do nothing - we want to prevent unfocusing except via close button
          }
        }}
      >
        <div
          ref={windowRef}
          className="bg-gray-400 border border-gray-600 shadow-lg overflow-hidden outline-none relative"
          style={{
            width: `${size.width}px`,
            height: `${size.height}px`,
            position: 'absolute',
            left: `${position.x}px`,
            top: `${position.y}px`,
            cursor: isDragging ? 'grabbing' : 'default'
          }}
          onMouseDown={handleMouseDown}
          tabIndex={0}
        >
          {/* Window Header */}
          <div className="window-header bg-white text-black py-2 px-3 flex items-center justify-between cursor-grab">
            <div className="font-medium truncate">{title}</div>
            <button
              className="bg-red-500 hover:bg-red-600 text-white w-10 h-5 flex items-center justify-center border border-black"
              onClick={onClose}
            >
              <div className='mb-1'>
                x
              </div>
            </button>
          </div>
         
          {/* Window Content */}
          <div className="p-4 overflow-auto" style={{ height: `calc(100% - 38px)` }}>
            {content}
          </div>
          
          {/* Resize Handle */}
          <div 
            className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
            onMouseDown={handleResizeStart}
            style={{
              background: 'transparent',
              boxShadow: '2px 2px 0 #333 inset'
            }}
          />
        </div>
        <div
          className="text-gray-200 font-mono italic overflow-hidden text-xs absolute bottom-0 right-0"
          style={{
              left: `${position.x + size.width - 150}px`,
              top: `${position.y + size.height + 30}px`,
            }}
        >
          Try resizing with the corner!
        </div>
      </div>
    );
  };
  
  export default ProgramWindow;