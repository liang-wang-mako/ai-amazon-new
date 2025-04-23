import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { generateClientDropzoneAccept } from 'uploadthing/client';
import { Button } from '@/components/ui/button';
import { UploadCloud, X } from 'lucide-react';
import Image from 'next/image';
import type { FileWithPreview } from '@/lib/types/upload';

interface UploadDropzoneProps {
  maxFiles?: number;
  maxSize?: number; // in MB
  accept?: Record<string, string[]>;
  onFilesAdded?: (files: FileWithPreview[]) => void;
  onFileRemoved?: (file: FileWithPreview) => void;
  className?: string;
}

export function UploadDropzone({
  maxFiles = 1,
  maxSize = 4,
  accept = {
    'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
  },
  onFilesAdded,
  onFileRemoved,
  className = '',
}: UploadDropzoneProps) {
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      ) as FileWithPreview[];

      const updatedFiles = [...files, ...newFiles].slice(0, maxFiles);
      setFiles(updatedFiles);
      onFilesAdded?.(updatedFiles);
    },
    [files, maxFiles, onFilesAdded]
  );

  const removeFile = (fileToRemove: FileWithPreview) => {
    const updatedFiles = files.filter((file) => file !== fileToRemove);
    setFiles(updatedFiles);
    URL.revokeObjectURL(fileToRemove.preview);
    onFileRemoved?.(fileToRemove);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles: maxFiles - files.length,
    maxSize: maxSize * 1024 * 1024, // Convert MB to bytes
  });

  return (
    <div className={className}>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors
          ${isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300'}
          ${files.length >= maxFiles ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-2">
          <UploadCloud className="h-8 w-8 text-gray-500" />
          <p className="text-sm text-gray-600">
            {isDragActive ? 'Drop the files here...' : `Drag & drop files here, or click to select`}
          </p>
          <p className="text-xs text-gray-500">
            Max size: {maxSize}MB. {maxFiles > 1 ? `Up to ${maxFiles} files.` : ''}
          </p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {files.map((file) => (
            <div
              key={file.name}
              className="relative group rounded-lg overflow-hidden border border-gray-200"
            >
              {file.type.startsWith('image/') ? (
                <Image
                  src={file.preview}
                  alt={file.name}
                  className="h-40 w-full object-cover"
                  width={300}
                  height={160}
                />
              ) : (
                <div className="h-40 w-full flex items-center justify-center bg-gray-100">
                  <p className="text-sm text-gray-600">{file.name}</p>
                </div>
              )}
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeFile(file)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
