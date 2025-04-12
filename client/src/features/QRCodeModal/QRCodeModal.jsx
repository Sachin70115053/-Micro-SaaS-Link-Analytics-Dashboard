import React from 'react';


import { useState } from 'react';
import QRCode from 'qrcode.react';
import { saveAs } from 'file-saver';

const QRCodeModal = ({ url }) => {
  const [isOpen, setIsOpen] = useState(false);

  const downloadQRCode = () => {
    const canvas = document.getElementById('qrcode-canvas');
    canvas.toBlob((blob) => {
      saveAs(blob, `qrcode-${url.split('/').pop()}.png`);
    });
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="text-purple-600 hover:text-purple-800"
      >
        View QR
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-purple-700">QR Code</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="flex flex-col items-center gap-4">
              <QRCode 
                id="qrcode-canvas"
                value={url} 
                size={256}
                level="H"
                includeMargin
                className="border-4 border-white rounded-lg"
              />
              
              <button
                onClick={downloadQRCode}
                className="btn-primary"
              >
                Download QR Code
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QRCodeModal;