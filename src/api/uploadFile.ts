import apiClient from './apiClient';
import { API_ENDPOINTS } from './apiEndpoints';

export interface UploadFileProps {
  fileItem: File;
  uploaderId: string;
}

export const fetchUploadIconFile = async ({ fileItem, uploaderId }: UploadFileProps) => {
  const formData = new FormData();
  formData.append('file', fileItem);
  formData.append('fileCategory', 'ICON');
  formData.append('uploaderId', uploaderId);

  try {
    const res = await apiClient.post(API_ENDPOINTS.ADMIN.ICON_FILES, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Auth: 'admin',
      },
    });
    return res.data;
  } catch (error) {
    console.error('failed to upload icon image');
  }
};

export const fetchFileUrl = async (id: number) => {
  try {
    const res = await apiClient.get(`${API_ENDPOINTS.FILES.GET}/${id}`, {
      headers: {
        Auth: 'anyone',
      },
    });
    return res.data;
  } catch (error) {
    console.error('failed to fetch file', error);
  }
};
