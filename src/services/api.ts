import { Axios } from 'axios'

export const api = new Axios({
  baseURL: process.env.NEXT_PUBLIC_AXIOS_URL!,
  headers: {
    'x-high-auth': 'its_our_little_secret'
  },
  timeout: 5000, // 5 segundos
  timeoutErrorMessage:
    'A solicitação expirou. Por favor, tente novamente mais tarde.'
})
