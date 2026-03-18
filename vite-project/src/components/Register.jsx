import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router'
import * as styles from "../styles/common"

function Register() {
    const { register, handleSubmit } = useForm()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const [] = useState()

    const onUserRegister = async (newUser) => {
        console.log(newUser)
        try {
            let { role, ...userObj } = newUser
            setLoading(true)
            //make API req to user/author registation
            if (newUser.role === "user") {
                //make API req to user registation
                let resObj = await axios.post("http://localhost:4000/user-api/users", userObj)
                console.log(resObj)
                let res = resObj.data
                if (resObj.status === 201) {
                    navigate("/login")
                }

            }
            if (newUser.role === "author") {
                //make API req to author registation
                let resObj = await axios.post("http://localhost:4000/author-api/users", userObj)
                let res = resObj.data
                if (resObj.status === 201) {
                    navigate("/login")
                }
            }
        } catch (err) {
            setError(err.response?.data.error || "Registration failed")
        } finally {
            setLoading(false)
        }
    }

    //loading
    if (loading === true) {
        return <p className={styles.loadingClass}>Loading...</p>
    }

    //error
    if (error) {
        return <p className={styles.errorClass}>{error} </p>
    }

    return (
        <div className={styles.formCard}>
            <h2 className={styles.formTitle}>Create Account</h2>

            {error && <div className={styles.errorClass + " mb-6"}>{error}</div>}

            <form onSubmit={handleSubmit(onUserRegister)}>
                {/* Role Selection */}
                <div className="flex gap-6 mb-8 justify-center bg-white p-3 rounded-xl border border-[#d2d2d7]">
                    <div className="flex items-center gap-2">
                        <input
                            type="radio"
                            {...register("role")}
                            id="user"
                            value="user"
                            defaultChecked
                            className="w-4 h-4 text-[#0066cc] border-[#d2d2d7] focus:ring-[#0066cc]/10"
                        />
                        <label htmlFor="user" className="text-sm font-medium text-[#1d1d1f] cursor-pointer">User</label>
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="radio"
                            {...register("role")}
                            id="author"
                            value="author"
                            className="w-4 h-4 text-[#0066cc] border-[#d2d2d7] focus:ring-[#0066cc]/10"
                        />
                        <label htmlFor="author" className="text-sm font-medium text-[#1d1d1f] cursor-pointer">Author</label>
                    </div>
                </div>

                {/* Inputs Grid */}
                <div className="grid grid-cols-1 gap-4 mb-6">
                    <div>
                        <label className={styles.labelClass}>Username</label>
                        <input type='text' {...register("username")} placeholder='johndoe' className={styles.inputClass} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={styles.labelClass}>First Name</label>
                            <input type='text' {...register("firstname")} placeholder='John' className={styles.inputClass} />
                        </div>
                        <div>
                            <label className={styles.labelClass}>Last Name</label>
                            <input type='text' {...register("lastname")} placeholder='Doe' className={styles.inputClass} />
                        </div>
                    </div>

                    <div>
                        <label className={styles.labelClass}>Email Address</label>
                        <input type='email' {...register("email")} placeholder='name@example.com' className={styles.inputClass} />
                    </div>

                    <div>
                        <label className={styles.labelClass}>Password</label>
                        <input type='password' {...register("password")} placeholder='••••••••' className={styles.inputClass} />
                    </div>

                    <div>
                        <label className={styles.labelClass}>Profile Image URL</label>
                        <input type='text' {...register("profileImageUrl")} placeholder='https://example.com/photo.jpg' className={styles.inputClass} />
                    </div>
                </div>

                <button type='submit' className={styles.submitBtn}>
                    {loading ? 'Creating account...' : 'Create Account'}
                </button>
            </form>

            <p className={styles.mutedText + " text-center mt-6"}>
                Already have an account? <span className={styles.linkClass + " cursor-pointer"}>Sign in</span>
            </p>
        </div>
    )
}

export default Register