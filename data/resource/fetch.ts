import { apiAxios } from '@/data/axios';
import {
  QrCodeProjectFormPO,
  QRCodeProjectListVO,
} from '@/data/resource/schema';

const fetchQrcodeListData = async (options: QRCodeProjectListVO) => {
  const response = await apiAxios.get(
    `/admin-api/infra/book-qtcode-item/page`,
    {
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      params: { ...options },
    },
  );
  return { ...response.data.data };
};

const postQrcodeProjectData = async (data: QrCodeProjectFormPO) => {
  const response = await apiAxios.post(
    `/admin-api/infra/book-qtcode-item/create`,
    data,
    {
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
    },
  );
  return response.data;
};

async function deleteQRCodeProjectItem(id: number) {
  try {
    const response = await apiAxios(
      `/admin-api/infra/book-qtcode-item/delete?id=${id}`,
      {
        method: 'DELETE',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

   return response.data;
  } catch (error) {
    console.error('Error deleting item:', error);
  }
}

export { fetchQrcodeListData, postQrcodeProjectData, deleteQRCodeProjectItem };
