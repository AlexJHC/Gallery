import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';

export const appApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({baseUrl: 'https://jsonplaceholder.typicode.com'}),
  endpoints: (build) => ({
    fetchAllUsers: build.query<userType[], string>({
      query: () => ({
        url: '/users'
      })
    }),
    fetchAllAlbum: build.query<AlbumType[], string>({
      query: () => ({
        url: '/albums'
      })
    }),
    fetchPhotos: build.query<PhotoType[], string>({
      query: () => ({
        url: '/photos'
      })
    })
  })
})

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
    },
    phone: string
    website: string
    company: {
      "name": string
      "catchPhrase": string
      "bs": string
    }
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