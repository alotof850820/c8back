import { jsonHttp, mutiHttp } from '@/utils/http/axios';

enum Api {
  loginPost = 'admins/login',
  getUsers = 'users',
  addImg = 'users/image',
  getUserDetail = 'users/',
  addBgImg = 'users/background',
}

interface Login {
  account: string;
  password: string;
}

interface UserList {
  pageIndex: number;
  pageSize: number;
}
interface CreateUser {
  email: string;
  userName: string;
  password: string;
  sexType: number;
  imagePath: string;
  type: number;
}
interface UploadImg {
  image: FormData;
}
interface UpdateStatus {
  status: number;
}
interface UpdateUser {
  email: string;
  userName: string;
  sexType: number;
  status: number;
  type?: number;
}

// 登入
export function loginPost(params: Login) {
  return jsonHttp.post({
    url: Api.loginPost,
    params,
  });
}
// 取得用戶列表
export const getUsers = (params: UserList) => {
  return jsonHttp.get({
    url: Api.getUsers,
    params,
  });
};
//  創建前台用戶
export const addUsers = (params: CreateUser) => {
  return jsonHttp.post({
    url: Api.getUsers,
    params,
  });
};
//  上傳用戶圖片(建立或編輯用戶時使用)
export const addImg = (params: UploadImg) => {
  return mutiHttp.post({
    url: Api.addImg,
    params,
  });
};
// 上傳用戶背景圖片
export const addBgImg = (params: UploadImg) => {
  return mutiHttp.post({
    url: Api.addBgImg,
    params,
  });
};

//  更新用戶狀態
export const updateStatus = (userId: number, params: UpdateStatus) => {
  return jsonHttp.patch({
    url: `users/${userId}/status`,
    params,
  });
};
// 上傳用戶頭貼(用戶列表或編輯用戶資料時使用)
export const uploadImg = (userId: number, params: UploadImg) => {
  return mutiHttp.patch({
    url: `users/${userId}/image`,
    params,
  });
};
// 上傳用戶背景圖片(編輯用)
export const uploadBgImg = (userId: number, params: UploadImg) => {
  return mutiHttp.patch({
    url: `users/${userId}/background`,
    params,
  });
};
// 取得用戶資料
export const getUserDetail = (userId: number) => {
  return jsonHttp.get({
    url: `users/${userId}`,
  });
};

// 修改用戶
export const editUser = (userId: number, params: UpdateUser) => {
  return jsonHttp.put({
    url: `users/${userId}`,
    params,
  });
};
