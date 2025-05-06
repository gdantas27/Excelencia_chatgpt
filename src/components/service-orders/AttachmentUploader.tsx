import { useState } from 'react';
import { Paperclip, Trash } from 'lucide-react';

interface Attachment {
  name: string;
  url: string;
}

interface AttachmentUploaderProps {
  attachments: Attachment[];
  onChange: (newAttachments: Attachment[]) => void;
}

export function AttachmentUploader({
  attachments,
  onChange,
}: AttachmentUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    const newAttachments = newFiles.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file), // mock: local preview apenas
    }));
    onChange([...attachments, ...newAttachments]);
  };

  const handleRemove = (name: string) => {
    const updated = attachments.filter((file) => file.name !== name);
    onChange(updated);
  };

  return (
    <div className="space-y-3">
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-brand-primary/10 file:text-brand-primary hover:file:bg-brand-primary/20"
      />
      <ul className="space-y-2">
        {attachments.map((file) => (
          <li
            key={file.name}
            className="flex items-center justify-between p-2 bg-gray-50 rounded border"
          >
            <a
              href={file.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-700 hover:underline"
            >
              <Paperclip className="w-4 h-4" />
              {file.name}
            </a>
            <button
              onClick={() => handleRemove(file.name)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash className="w-4 h-4" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}