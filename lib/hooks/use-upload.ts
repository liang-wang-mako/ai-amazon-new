import { useState } from 'react';
import { useUploadThing } from '@/lib/uploadthing';
import type { FileWithPreview, UploadResult } from '@/lib/types/upload';

interface UseUploadOptions {
  endpoint: 'productImage' | 'avatar' | 'productDocument';
  onUploadComplete?: (result: UploadResult) => void;
  onUploadError?: (error: Error) => void;
}

export function useUpload({ endpoint, onUploadComplete, onUploadError }: UseUploadOptions) {
  const [isUploading, setIsUploading] = useState(false);
  const { startUpload } = useUploadThing(endpoint);

  const upload = async (files: FileWithPreview[]): Promise<UploadResult> => {
    try {
      setIsUploading(true);
      const uploadedFiles = await startUpload(files);

      if (!uploadedFiles) {
        throw new Error('Upload failed');
      }

      const result: UploadResult = {
        success: true,
        data: {
          fileUrl: uploadedFiles[0].url,
          fileKey: uploadedFiles[0].key,
        },
      };

      onUploadComplete?.(result);
      return result;
    } catch (error) {
      const errorResult: UploadResult = {
        success: false,
        error: {
          message: error instanceof Error ? error.message : 'Upload failed',
        },
      };
      onUploadError?.(error instanceof Error ? error : new Error('Upload failed'));
      return errorResult;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    upload,
    isUploading,
  };
}
