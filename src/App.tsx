import React, { useState } from 'react';
import  PdfViewer  from './components/PdfViewer';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const urldata = 'https://www.aeee.in/wp-content/uploads/2020/08/Sample-pdf.pdf'
const nav ='#4270db'
  return (
    <div>
      <button onClick={handleOpenModal}>Open PDF Viewer</button>
      {isModalOpen && (
        <PdfViewer
          url={urldata}
          ViewPDF={setIsModalOpen}
          ViewpageNo={false} NavColor= {nav}/>
      )}
    </div>
  );
};

export default App;