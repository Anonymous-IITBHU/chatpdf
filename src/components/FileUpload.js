import React, { useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import * as pdfjsLib from 'pdfjs-dist/webpack';
import 'pdfjs-dist/build/pdf.worker.entry';
import './FileUpload.css';

const FileUpload = ({ setPdfText, onFileChange }) => {
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState(null);
  const [metadata, setMetadata] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileURL(URL.createObjectURL(selectedFile));

    const fileReader = new FileReader();
    fileReader.onload = function() {
      const typedarray = new Uint8Array(this.result);

      pdfjsLib.getDocument(typedarray).promise.then(pdf => {
        extractTextFromPDF(pdf);
        pdf.getMetadata().then(data => {
          setMetadata(data.info);
        });
      });
    };
    fileReader.readAsArrayBuffer(selectedFile);

    onFileChange(); // Call the prop function to clear chat messages
  };

  const extractTextFromPDF = (pdf) => {
    let textContent = '';

    const extractPageText = (pageNumber) => {
      return pdf.getPage(pageNumber).then(page => {
        return page.getTextContent().then(text => {
          text.items.forEach(item => {
            textContent += item.str + ' ';
          });
        });
      });
    };

    const pages = Array.from({ length: pdf.numPages }, (v, i) => i + 1);
    Promise.all(pages.map(extractPageText)).then(() => {
      setPdfText(textContent);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle file upload logic
  };

  return (
    <div className="file-upload">
      <form onSubmit={handleSubmit} className="upload-form">
        <input type="file" accept="application/pdf" onChange={handleFileChange} className="file-input" />
        <button type="submit" className="upload-button">Upload</button>
      </form>
      {fileURL && (
        <div className="pdf-viewer">
          <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
            <Viewer fileUrl={fileURL} />
          </Worker>
        </div>
      )}
      {metadata && (
        <div className="pdf-metadata">
          {/* <h3>PDF Metadata</h3>
          <p><strong>Title:</strong> {metadata.Title}</p>
          <p><strong>Author:</strong> {metadata.Author}</p> */}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
