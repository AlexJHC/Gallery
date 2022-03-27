import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';

export const usersApi = createApi({

  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com'
  }),
  endpoints: (build) => ({
    fetchAllUsers: build.query<ResponseMetaType<UserType[]>, PostsParamsType>({
      query: ({page}) => ({
        url: `/users`,
        params: {
          _page: page,
          _limit: 3,
        }
      }),
      transformResponse(responseData: UserType[], meta): Promise<ResponseMetaType<UserType[]>> | ResponseMetaType<UserType[]> {
        const limitQueryPage = 3
        const totalPages = (meta && meta.response)
          && Math.ceil(Number(meta.response.headers.get('X-Total-Count')) / limitQueryPage)
        return {responseData, totalPages}
      }
    }),
    fetchAllPosts: build.query<ResponseMetaType<PostType[]>, PostsParamsType>({
      query: ({sort, order, page, search}) => ({
        url: `/posts`,
        params: {
          _sort: sort,
          _order: order,
          _page: page,
          _limit: 5,
          q: search
        }
      }),
      transformResponse(responseData: PostType[], meta): Promise<ResponseMetaType<PostType[]>> | ResponseMetaType<PostType[]> {
        const limitQueryPage = 5
        const totalPages = (meta && meta.response)
          && Math.ceil(Number(meta.response.headers.get('X-Total-Count')) / limitQueryPage)
        return {responseData, totalPages}
      }
    }),
    fetchPhotos: build.query<ResponseMetaType<PhotoType[]>, PostsParamsType>({
      query: ({page}) => ({
        url: `/photos`,
        params: {
          _page: page,
          _limit: 10,
        }
      }),
      transformResponse(responseData: PhotoType[], meta): Promise<ResponseMetaType<PhotoType[]>> | ResponseMetaType<PhotoType[]> {
        const limitQueryPage = 10
        const totalPages = (meta && meta.response)
          && Math.ceil(Number(meta.response.headers.get('X-Total-Count')) / limitQueryPage)
        return {responseData, totalPages}
      }
    }),
    fetchAlbums: build.query<AlbumType[], PostsParamsType>({
      query: () => ({
        url: `/albums`
      })
    })
  })
})

type PostsParamsType = {
  sort?: string
  order?: string
  page?: number
  search?: string
}
export type ResponseMetaType<T> = {
  responseData: T
  totalPages: number | undefined
}

export type PhotoType = {
  albumId: number
  id: number
  title: string
  url: string
  thumbnailUrl: string
}

export type PostType = {
  userId: number
  id: number
  title: string
  body: string
}

export type UserType = {
  id: number
  name: string
  username: string
  email: string
  address: {
    "street": string
    "suite": string
    "city": string
    "zipcode": string
    "geo": {
      "lat": string
      "lng": string
    }
  }
  phone: string
  website: string
  company: {
    "name": string
    "catchPhrase": string
    "bs": string
  }
}

export type AlbumType = {
  userId: number
  id: number
  title: string
}
