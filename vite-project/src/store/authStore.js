import { create } from "zustand"
import axios, { isAxiosError } from "axios"

const BASE_URL = import.meta.env.VITE_API_URL

export const useAuthStore = create(set => ({
    currentUser: null,
    token: localStorage.getItem("token") || null,
    error: null,
    loading: false,
    isAuthenticated: !!localStorage.getItem("token"),
    login: async (userCredWithRole) => {
        const { role, ...userCredObj } = userCredWithRole
        try {
            //set loading true
            set({ loading: true, error: null })
            //make api call
            let res = await axios.post(`${BASE_URL}/common-api/login`, userCredObj, { withCredentials: true })
            console.log("Login response data:", res.data)

            // Backend might be returning an axios response object itself, or wrapping in .data
            const actualData = res.data.data && res.data.status ? res.data.data : res.data
            const payload = actualData.payload || res.data.payload
            const token = actualData.token || payload?.token || res.data.token

            if (token) {
                console.log("Token found:", token)
                localStorage.setItem("token", token)
                set({ token: token, loading: false, isAuthenticated: true, currentUser: payload })
            } else {
                console.error("TOKEN NOT FOUND! Structure:", res.data)
                set({ loading: false, isAuthenticated: true, currentUser: payload })
            }

        } catch (err) {
            console.log("err is", err)
            set({
                loading: false,
                isAuthenticated: false,
                error: err.response?.data?.error || "error",
                currentUser: null
            })
        }
    },
    logout: async () => {
        try {
            //set loading state
            set({ loading: true, error: null })
            //make logout api request
            let res = await axios.get(`${BASE_URL}/common-api/logout`, { withCredentials: true })
            localStorage.removeItem("token")
            //update state
            set({
                loading: false,
                isAuthenticated: false,
                currentUser: null,
                token: null
            })
        } catch (err) {
            console.log("err is", err)
            set({
                loading: false,
                isAuthenticated: false,
                error: err.response?.data?.error || "error,login failed",
                currentUser: null
            })
        }
    }
}))


export default useAuthStore
