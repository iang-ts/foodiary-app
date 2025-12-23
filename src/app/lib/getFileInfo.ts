import { File } from 'expo-file-system';

export async function getFileInfo(fileUri: string) {
  const fileInfo = new File(fileUri).info();
  const fileName = fileUri.split('/').at(-1);

  if (!fileInfo.exists || !fileInfo.size || !fileName) {
    throw new Error(fileUri + ': This file does not exists');
  }

  const type = fileName.endsWith('.jpg') ? 'image/jpeg' : 'audio/m4a';

  return {
    size: fileInfo.size,
    fileName,
    type,
  } as const;
}
