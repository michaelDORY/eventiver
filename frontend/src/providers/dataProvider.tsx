import simpleRestProvider from 'ra-data-simple-rest'
import { fetchUtils } from 'ra-core'
import { DataProvider, Options } from 'react-admin'

const httpClient = (url: string, options?: Options) => {
  const newOptions = options ?? {}

  const token = localStorage.getItem('token') ?? ''

  newOptions.headers = new Headers({
    ...newOptions.headers,
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
  })

  return fetchUtils.fetchJson(url, newOptions)
}

const dataProvider: DataProvider = simpleRestProvider(import.meta.env.VITE_API_URL, httpClient)

export default dataProvider
