//import { generateComponents } from '@uploadthing/react';
import { UploadButton, UploadDropzone, Uploader, generateReactHelpers } from '@uploadthing/react';


import type { OurFileRouter } from '@/app/api/uploadthing/core';

//export const { UploadButton, UploadDropzone, Uploader } = generateComponents<OurFileRouter>();
export { UploadButton, UploadDropzone, Uploader };

export const { useUploadThing, uploadFiles } = generateReactHelpers<OurFileRouter>();
