# My Pdf viewer Component Package

Introduction
This package provides a PdfViewer component that allows you to display and navigate PDF documents within a React application. The component is built using TypeScript, pdfjs-dist, and React, and is bundled with Webpack for distribution.

Installation
To install the package, use the following command:
```bash
npm install my-pdf-viewer
```
# Example
Usage
Here’s an example of how to use the my-pdf-viewer component in a React application:

```typescript
import React, { useState } from 'react';
import { PdfViewer } from 'my-pdf-viewer';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const urldata = 'https://pdfobject.com/pdf/sample.pdf'

  return (
    <div>
      <button onClick={handleOpenModal}>Open PDF Viewer</button>
      {isModalOpen && (
        <PdfViewer
          url={urldata}
          ViewPDF={setIsModalOpen}
          ViewpageNo={false} />
      )}
    </div>
  );
};

export default App;


```
| Props | Type | Required | Description|
| ------ | ------ | ------ | ------ |
| url | string | Yes | The URL of the PDF document to display.|
| ViewPDF | React.Dispatch<React.SetStateAction<boolean>> | Yes | The state setter function for controlling the visibility of the PDF viewer.|
| ViewpageNo | boolean | Yes | Flag to display the current page number and total pages.|


## Maintenance Status

Additional features will be added in upcoming versions.

## MIT License

[MIT](LICENSE)
