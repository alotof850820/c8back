import { jsonHttp } from '@/utils/http/axios';

enum Api {
  tags = 'tags',
}

interface TagList {
  pageIndex: number;
  pageSize: number;
  enable: boolean;
}
interface TagStatus {
  enable: boolean;
}
// 取得標籤列表
export const getTagList = (params: TagList) => {
  return jsonHttp.get({
    url: Api.tags,
    params,
  });
};

// 修改標籤狀態
export const updateTagStatus = (tagId: number, params: TagStatus) => {
  return jsonHttp.patch({
    url: `tags/${tagId}`,
    params,
  });
};
