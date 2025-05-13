import { useState } from 'react';
import { Download, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from './Button';

interface PDFViewerProps {
  url: string;
  title: string;
  onDownload?: () => void;
}

export function PDFViewer({ url, title, onDownload }: PDFViewerProps) {
  const [zoom, setZoom] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            >
              <ChevronLeft size={16} />
            </Button>
            <span className="text-sm">Página {currentPage}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => prev + 1)}
            >
              <ChevronRight size={16} />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setZoom(prev => Math.max(prev - 10, 50))}
            >
              <ZoomOut size={16} />
            </Button>
            <span className="text-sm">{zoom}%</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setZoom(prev => Math.min(prev + 10, 200))}
            >
              <ZoomIn size={16} />
            </Button>
          </div>
        </div>

        {onDownload && (
          <Button variant="outline" size="sm" onClick={onDownload}>
            <Download size={16} className="mr-2" />
            Download
          </Button>
        )}
      </div>

      <div className="flex-1 overflow-auto p-4">
        <iframe
          src={url}
          title={title}
          className="w-full h-full border-0"
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top left' }}
        />
      </div>
    </div>
  );
}