declare module 'react-pdf' {
  import Document from 'react-pdf/dist/Document';
  import Outline from 'react-pdf/dist/Outline';
  import Page from 'react-pdf/dist/Page';

  interface GlobalWorkerOptionsProps {
    workerSrc: string;
  }

  interface PDFjsStatic {
    version: string;
    GlobalWorkerOptions: GlobalWorkerOptionsProps;
  }

  let pdfjs: PDFjsStatic;

  export {
    Document,
    Outline,
    Page,
    pdfjs
  };
}
