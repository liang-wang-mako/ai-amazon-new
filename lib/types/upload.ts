export type FileUploadResponse = {
  fileUrl: string;
  fileKey: string;
};

export type UploadError = {
  message: string;
  code?: string;
};

export interface FileWithPreview extends File {
  preview: string;
}

export type UploadResult = {
  success: boolean;
  error?: UploadError;
  data?: FileUploadResponse;
};

export type AllowedFileType = 'image' | 'pdf' | 'video';

export interface UploadConfig {
  maxSize: number; // in MB
  allowedTypes: AllowedFileType[];
}
