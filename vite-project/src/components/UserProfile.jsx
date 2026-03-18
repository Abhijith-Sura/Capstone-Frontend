import { useAuthStore } from '../store/authStore'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as styles from '../styles/common.js'
import axios from 'axios'


function UserProfile() {
    const logout = useAuthStore(state => state.logout)
    const token = useAuthStore(state => state.token)
    const navigate = useNavigate()
    const [articles, setArticles] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const onLogout = async () => {
        await logout()
        navigate("/login")
    }

    useEffect(() => {
        const getArticles = async () => {
            setLoading(true)
            try {
                console.log("UserProfile: Fetching articles with token:", token)
                let res = await axios.get("http://localhost:4000/user-api/articles", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    withCredentials: true
                })
                console.log("UserProfile: Articles response:", res.data)
                setArticles(res.data.payload || [])
            } catch (err) {
                console.error("UserProfile: Fetch articles error:", err)
                setError(err.response?.data.error || "failed to fetch articles")
            } finally {
                setLoading(false)
            }
        }
        getArticles()
    }, [])

    const readMore = (article) => {
        navigate(`/article/${article.articleId}`, { state: article })
    }

    return (
        <div className="py-10">
            <div className="flex justify-between items-end mb-12 border-b border-[#e8e8ed] pb-8">
                <div>
                    <h1 className={styles.pageTitleClass}>Explore</h1>
                    <p className={styles.bodyText}>Discover the latest insights from our community.</p>
                </div>
                <button
                    onClick={onLogout}
                    className={styles.secondaryBtn}
                >
                    Sign Out
                </button>
            </div>

            {loading ? (
                <div className={styles.loadingClass}>Searching for excellence...</div>
            ) : error ? (
                <div className={styles.errorClass}>{error}</div>
            ) : (
                <div className={styles.articleGrid}>
                    {articles.map(article => (
                        <div
                            key={article.articleId}
                            className={styles.articleCardClass}
                            onClick={() => readMore(article)}
                        >
                            <span className={styles.tagClass}>
                                {article.category}
                            </span>
                            <h2 className={styles.articleTitle}>
                                {article.title}
                            </h2>
                            <p className={styles.articleExcerpt}>
                                {article.content}
                            </p>
                            <div className="mt-auto pt-4 flex items-center justify-between">
                                <span className={styles.linkClass + " text-xs font-medium"}>Read Article</span>
                                <span className={styles.mutedText}>→</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!loading && articles.length === 0 && !error && (
                <div className={styles.emptyStateClass}>
                    No articles found matching your criteria.
                </div>
            )}
        </div>
    )
}

export default UserProfile