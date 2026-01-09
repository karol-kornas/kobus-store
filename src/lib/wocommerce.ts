import axios from 'axios'

export const wooApi = axios.create({
  baseURL: process.env.WC_API_URL,
  auth: {
    username: process.env.WC_CONSUMER_KEY!,
    password: process.env.WC_CONSUMER_SECRET!,
  },
  headers: {
    'Content-Type': 'application/json',
  },
})
