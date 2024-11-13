import axios, { AxiosResponse } from 'axios'
const apiURL = "http://localhost:8080/"

export default async function apiHandler(formData: FormData, url: string, method: string): Promise<any> {

    try {
        const config = {
            method: method.toLowerCase(),
            url: apiURL+url,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const response: AxiosResponse = await axios(config)
        return response.data

    } catch (error) {

        if (axios.isAxiosError(error)) {
            // console.error('Axios error:', error.message)
            if (error.response && error.response.status < 400 && error.response.status > 499) {
                console.error('Response data:', error.response.data)
            }
        } else {
            console.error('Unexpected error:', error)
        }
    }
}
