declare module 'pdfkit' {
  import { Readable } from 'stream';
  
  interface PDFDocumentOptions {
    margin?: number;
    size?: string | [number, number];
    [key: string]: any;
  }
  
  class PDFDocument extends Readable {
    constructor(options?: PDFDocumentOptions);
    fontSize(size: number): PDFDocument;
    fillColor(color: string): PDFDocument;
    text(text: string, x?: number, y?: number, options?: any): PDFDocument;
    moveDown(amount?: number): PDFDocument;
    image(path: string, x: number, y: number, options?: any): PDFDocument;
    rect(x: number, y: number, w: number, h: number): PDFDocument;
    fill(): PDFDocument;
    bufferedPageRange(): { start: number; count: number };
    switchToPage(page: number): PDFDocument;
    page: { height: number; width: number };
    end(): void;
    [key: string]: any;
  }
  
  export = PDFDocument;
}

