import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { getServerSession } from 'next-auth';

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  productImage: f({ image: { maxFileSize: '4MB', maxFileCount: 3 } })
    .middleware(async () => {
      const session = await getServerSession();

      if (!session) throw new Error('Unauthorized');

      // Return metadata to be stored with the file
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('Upload complete for userId:', metadata.userId);
      console.log('File URL:', file.url);
    }),

  avatar: f({ image: { maxFileSize: '1MB', maxFileCount: 1 } })
    .middleware(async () => {
      const session = await getServerSession();
      if (!session) throw new Error('Unauthorized');
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('Avatar upload complete for userId:', metadata.userId);
      console.log('File URL:', file.url);
    }),

  productDocument: f({ pdf: { maxFileSize: '8MB', maxFileCount: 1 } })
    .middleware(async () => {
      const session = await getServerSession();
      if (!session) throw new Error('Unauthorized');
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('Document upload complete for userId:', metadata.userId);
      console.log('File URL:', file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
