import { jsonHttp, mutiHttp } from '@/utils/http/axios';

enum Api {
  uploadVideo = 'videos/video',
  buildVideo = 'videos',
}

interface Video {
  video: FormData;
}

interface VideoDetail {
  title: string;
  description: string;
  coverPath: string;
  videoPath: string;
  sexType: number;
  type: number;
  duration: number;
  userId: number;
}

interface VideoList {
  pageIndex: number;
  pageSize: number;
}

interface VideoStatus {
  status: number;
}

// 上傳影片
export function uploadVideo(params: Video) {
  return mutiHttp.post({
    url: Api.uploadVideo,
    params,
  });
}
// 建立影片
export const buildVideo = (params: VideoDetail) => {
  return jsonHttp.post({
    url: Api.buildVideo,
    params,
  });
};
// 取得影片列表
export const getVideoList = (params: VideoList) => {
  return jsonHttp.get({
    url: Api.buildVideo,
    params,
  });
};
// 修改影片狀態
export const updateVideo = (videoId: number, params: VideoStatus) => {
  return jsonHttp.patch({
    url: `videos/${videoId}/status`,
    params,
  });
};
// 取得影片資訊
export const getVideoDetail = (videoId: number) => {
  return jsonHttp.get({
    url: `videos/${videoId}`,
  });
};
// 修改影片
export const putVideo = (videoId: number, params: VideoStatus) => {
  return jsonHttp.put({
    url: `videos/${videoId}`,
    params,
  });
};

// let total;
// let MaxTotal;
// let currentPage;
// 取得頻道申請列表
// export const GetChannelApplicationList = async (params: ChannelApplications) => {
//   try {
//     let response = await channelHttp.get({
//       url: Api.GetChannelApplicationList,
//       params,
//     });

//     if (params.page > 1) {
//       total = params.pageSize * params.page + 1;
//     } else if (params.page !== 1 && params.page < currentPage) {
//       total = params.page * params.pageSize - 1;
//     } else if (currentPage !== undefined) {
//       total = params.pageSize * currentPage + 1;
//     } else {
//       total = params.pageSize * params.page + 1;
//     }

//     if (total < MaxTotal) {
//       total = MaxTotal;
//     } else {
//       MaxTotal = total;
//     }

//     currentPage = params.page;

//     response = {
//       items: response.data.map((item) => ({
//         ...item,
//         nickName: item.user.nickName,
//       })),
//       totalCount: total,
//     };
//     return response;
//     // return response.data.map((item) => ({
//     //   ...item,
//     //   nickName: item.user.nickName,
//     // }));
//   } catch (error) {
//     console.error('Error:', error);
//   }
// };
