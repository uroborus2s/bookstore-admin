import { apiAxios } from '@/data/axios';
import {
  BookFormSchemaPO,
  SearchBookSchemaVO,
  SectionListVO,
} from '@/data/book/schema';

const fetchBookListData = async (options: SearchBookSchemaVO) => {
  const response = await apiAxios.get(`/admin-api/infra/book-info/page`, {
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    params: {
      ...options,
    },
  });
  return { ...response.data.data };
};

const postBookData = async (data: BookFormSchemaPO) => {
  const response = await apiAxios.post(
    `/admin-api/infra/book-info/create`,
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

async function deleteBookItem(id: number) {
  try {
    const response = await apiAxios(
      `/admin-api/infra/book-info/delete?id=${id}`,
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

const fetchSectionListData = async ({ bookNo }: SectionListVO) => {
  const response = await apiAxios.get(
    `/admin-api/infra/book-chapter/page-all`,
    {
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      params: {
        bookNo,
      },
    },
  );
  return { ...response.data.data };
};

const fetchBookCategory = () => [
  { label: '教材', value: '00' },
  { label: '教辅', value: '01' },
  { label: '课外拓展', value: '02' },
  { label: '其他', value: '03' },
];

const fetchBookStatuses = () => [
  {
    value: '0',
    label: '启用',
  },
  {
    value: '1',
    label: '不启用',
  },
];

export {
  fetchBookListData,
  postBookData,
  deleteBookItem,
  fetchSectionListData,
  fetchBookCategory,
  fetchBookStatuses,
};
