import ky, { type KyInstance, type Options } from 'ky'

/**
 * Minimal HTTP client using ky with common CRUD helpers.
 */
class HttpClient {
  private client: KyInstance
  private token: string | null = null

  constructor(baseURL?: string) {
    this.client = this.createClient(baseURL)
  }

  private createClient(baseURL?: string) {
    const prefixUrl = baseURL ?? import.meta.env.VITE_API_BASE_URL ?? ''
    return ky.create({
      prefixUrl,
      timeout: 10_000,
      hooks: {
        beforeRequest: [
          (request) => {
            const token = this.token
            if (token) request.headers.set('Authorization', `Bearer ${token}`)
          },
        ],
      },
    })
  }

  setToken(token?: string) {
    console.log('setToken', token)
    this.token = token ?? null
  }

  setBaseUrl(baseURL?: string) {
    this.client = this.createClient(baseURL)
  }

  get<T = unknown>(url: string, options?: Options) {
    return this.client.get(url, options).json<T>()
  }

  post<T = unknown>(url: string, json?: unknown, options?: Options) {
    return this.client.post(url, { json, ...options }).json<T>()
  }

  put<T = unknown>(url: string, json?: unknown, options?: Options) {
    return this.client.put(url, { json, ...options }).json<T>()
  }

  delete<T = unknown>(url: string, options?: Options) {
    return this.client.delete(url, options).json<T>()
  }
}

export const http = new HttpClient()

// Example usage:
// http.setToken('token')
// const data = await http.get('/endpoint')
