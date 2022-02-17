import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';

export const usersApi = createApi({

  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com'
  }),
  endpoints: (build) => ({

    fetchAllUsers: build.query<ResponseMetaType, number>({
      query: (start: number) => ({
        url: `/users?_start=${start}&_limit=5`
      }),
      transformResponse(usersResponse: userType[], meta): Promise<ResponseMetaType> | ResponseMetaType {
        const limitQueryPage = 5
        const pageUsersTotalCount = (meta && meta.response)
          && (Number(meta.response.headers.get('X-Total-Count')) / limitQueryPage)
        return {usersResponse, pageUsersTotalCount}
      }
    }),
  }),
})
export type ResponseMetaType = {
  usersResponse: userType[]
  pageUsersTotalCount: number | undefined
}

export type userType = {
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

export type PhotoType = {
  albumId: number
  id: number
  title: string
  url: string
  thumbnailUrl: string
}