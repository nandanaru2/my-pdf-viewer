# My Pdf viewer Component Package

Introduction
This package provides a PdfViewer component that allows you to display and navigate PDF documents within a React application. The component is built using TypeScript, pdfjs-dist, and React, and is bundled with Webpack for distribution.

# Example
Usage
```bash
npm install 

npm start
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
