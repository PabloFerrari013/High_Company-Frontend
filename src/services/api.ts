import { Axios } from 'axios'

export const api = new Axios({
  baseURL: 'http://54.233.228.109:3333/xpto/products/',
  headers: {
    'x-high-auth': 'its_our_little_secret'
  },
  timeout: 5000, // 5 segundos
  timeoutErrorMessage:
    'A solicitação expirou. Por favor, tente novamente mais tarde.'
})