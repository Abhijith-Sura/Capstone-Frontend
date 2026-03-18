import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import * as styles from '../styles/common.js'
import axios from 'axios'

function ArticleByID() {
    const { articleId } = useParams()
    const { state } = useLocation()
    const [article, setArticle] = useState(state || null)
    const [loading, setLoading] = useState(!state)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!article) {
            const fetchArticle = async () => {
                setLoading(true)
                try {
                    const res = await axios.get(`http://localhost:4000/common-api/articles/${articleId}`)
                    setArticle(res.data.payload)
                } catch (err) {
                    setError(err.response?.data?.message || 'Failed to fetch article')
                } finally {
                    setLoading(false)
                }
            }
            fetchArticle()
        }
    }, [article, articleId])

    const formatIST = (dateString) => {
        if (!dateString) return ''
        return new Date(dateString).toLocaleString('en-IN', {
            timeZone: 'Asia/Kolkata',
            dateStyle: 'long',
            timeStyle: 'short'
        })
    }

    if (loading) return <div className="text-center mt-10 text-xl">Loading...</div>
    if (error) return <div className="text-center mt-10 text-red-500 text-xl">{error}</div>
    if (!article) return <div className="text-center mt-10 text-xl">Article not found</div>

    return (
        <div className={styles.pageBackground}>
            <div className={styles.pageWrapper + " py-10!"}>
                <div className="max-w-3xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <span className={styles.tagClass}>
                            {article.category}
                        </span>
                        <span className={styles.timestampClass}>
                            {formatIST(article.dateOfModification || article.dateOfCreation)}
                        </span>
                    </div>

                    <h1 className={styles.pageTitleClass + " mb-10"}>
                        {article.title}
                    </h1>

                    <div className="flex items-center mb-12 border-b border-[#e8e8ed] pb-8">
                        <div className="w-12 h-12 bg-[#f5f5f7] rounded-full flex items-center justify-center text-[#1d1d1f] font-bold mr-4 border border-[#d2d2d7]">
                            {article.authorData?.username?.charAt(0).toUpperCase() || 'A'}
                        </div>
                        <div>
                            <p className="text-[#1d1d1f] font-semibold">{article.authorData?.username || 'Unknown Author'}</p>
                            <p className={styles.mutedText + " uppercase tracking-widest text-[0.6rem]"}>Contributor</p>
                        </div>
                    </div>

                    <div className={styles.articleBody + " whitespace-pre-line"}>
                        {article.content}
                    </div>

                    <div className={styles.divider}></div>
                </div>
            </div>
        </div>
    )
}

export default ArticleByID
