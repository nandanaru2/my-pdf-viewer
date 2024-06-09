import React, { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/web/pdf_viewer.css';
import { Pdf } from '../styles/PdfViewercss';
import dimColor from './common';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface PdfViewerProps {
    url: string;
    ViewPDF: React.Dispatch<React.SetStateAction<boolean>>;
    ViewpageNo: boolean;
    NavColor?:string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ url, ViewPDF, ViewpageNo ,NavColor}) => {
    const [pdf, setPdf] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [numPages, setNumPages] = useState(0);
    const [dim,_setDim] = useState(NavColor?dimColor(NavColor):"")
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const loadingTask = pdfjsLib.getDocument(url);
        loadingTask.promise.then((loadedPdf) => {
            setPdf(loadedPdf);
            setNumPages(loadedPdf.numPages);
        }).catch(console.error);
    }, [url]);

    useEffect(() => {
        if (pdf && canvasRef.current) {
            pdf.getPage(currentPage).then(page => {
                const viewport = page.getViewport({ scale: 1.0 });
                const canvas = canvasRef.current!;
                const context = canvas.getContext('2d')!;

                canvas.height = viewport.height;
                canvas.width = viewport.width;

                // Clear the canvas before rendering
                context.clearRect(0, 0, canvas.width, canvas.height);

                // Save context state before applying transformations
                context.save();

                // Translate and rotate the context based on the page rotation
                switch (page.rotate) {
                    case 90:
                        context.translate(canvas.width, 0);
                        context.rotate(Math.PI / 2);
                        break;
                    case 180:
                        context.translate(canvas.width, canvas.height);
                        context.rotate(Math.PI);
                        break;
                    case 270:
                        context.translate(0, canvas.height);
                        context.rotate(-Math.PI / 2);
                        break;
                    default:
                        break;
                }

                const renderContext = {
                    canvasContext: context,
                    viewport: viewport,
                };

                page.render(renderContext).promise.then(() => {
                    // Restore context state after rendering
                    context.restore();
                });
            });
        }
    }, [pdf, currentPage]);

    const handleNextPage = () => {
        if (currentPage < numPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <Pdf $primary={NavColor} $secondary ={dim}>
        <div className="modal">
            <div className="modal-content">
                {ViewpageNo && <span className="page-info">
                    {currentPage} / {numPages}
                </span>}
                <span className="close" onClick={() => ViewPDF(false)}>&times;</span>
                <canvas ref={canvasRef}></canvas>
                {numPages > 1 && <div className="navigation">
                    <button
                        onClick={handlePreviousPage}
                        disabled={currentPage <= 1}
                        className="nav-button"
                    >
                        &lt;
                    </button>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage >= numPages}
                        className="nav-button"
                    >
                        &gt;
                    </button>
                </div>}
            </div>
        </div>
        </Pdf>
    );
};

export default PdfViewer;
