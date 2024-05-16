import { apiAxios } from '@/data/axios';

interface PageReqVO {
  pageNo: number;
  pageSize: number;
}

const fetchTableData = async ({ pageNo, pageSize }: PageReqVO) => {
  const response = await apiAxios.get(
    `http://111.231.60.214:48080/admin-api/infra/book-qtcode-item/page`,
    {
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      params: {
        pageReqVO: JSON.stringify({ pageNo, pageSize }),
      },
    },
  );
  return response.data;
};

export { fetchTableData };
