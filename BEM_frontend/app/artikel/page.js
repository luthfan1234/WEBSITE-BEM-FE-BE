'use client'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import articlesApi from '@/services/articlesApi'
import { getMinistryDisplayName, isArticleMatchingMinistry } from "@/utils/ministryTagsMapping"

// Tag mapping for ministries is now handled by imported utility functions.

export default function Artikel() {
    const searchParams = useSearchParams()
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [filters, setFilters] = useState({
        category: searchParams.get('category') || '',
        tag: searchParams.get('tag') || '',
        search: searchParams.get('search') || ''
    })
    
    const articlesPerPage = 9

    useEffect(() => {
        fetchArticles()
    }, [currentPage, filters])

    // getTagDisplayName and isArticleMatchingTag are now imported from a central utility file.

    const fetchArticles = async () => {
        try {
            setIsLoading(true)
            const allArticles = await articlesApi.getArticles()
            
            // Filter articles based on search params
            let filteredArticles = allArticles.filter(article => {
                if (filters.category && article.category.toLowerCase() !== filters.category.toLowerCase()) {
                    return false
                }
                if (filters.tag && !isArticleMatchingMinistry(article, filters.tag)) {
                    return false
                }
                if (filters.search) {
                    const searchLower = filters.search.toLowerCase()
                    return article.title.toLowerCase().includes(searchLower) ||
                           article.excerpt?.toLowerCase().includes(searchLower) ||
                           article.category.toLowerCase().includes(searchLower)
                }
                return true
            })
            
            // Only show published articles
            filteredArticles = filteredArticles.filter(article => article.status === 'published')
            
            // Pagination
            const startIndex = (currentPage - 1) * articlesPerPage
            const endIndex = startIndex + articlesPerPage
            const paginatedArticles = filteredArticles.slice(startIndex, endIndex)
            
            setArticles(paginatedArticles)
            setTotalPages(Math.ceil(filteredArticles.length / articlesPerPage))
            setError(null)
        } catch (err) {
            console.error('Error fetching articles:', err)
            setError('Failed to load articles. Please try again later.')
            setArticles([])
        } finally {
            setIsLoading(false)
        }
    }

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page)
            // Scroll to top when page changes
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    const clearFilters = () => {
        setFilters({ category: '', tag: '', search: '' })
        setCurrentPage(1)
        // Update URL
        window.history.pushState({}, '', '/artikel')
    }

    if (isLoading) {
        return (
            <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="ARTIKEL BEM SV UNS">
                <section className="tf-blog">
                    <div className="tf-container">
                        <div className="row justify-content-center">
                            <div className="col-md-8 text-center">
                                <div className="loading-spinner">
                                    <div className="spinner"></div>
                                </div>
                                <h3 className="mt-3">Memuat artikel...</h3>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        )
    }

    if (error) {
        return (
            <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="ARTIKEL BEM SV UNS">
                <section className="tf-blog">
                    <div className="tf-container">
                        <div className="row justify-content-center">
                            <div className="col-md-8 text-center">
                                <div className="error-message">
                                    <h3>Gagal Memuat Artikel</h3>
                                    <p>{error}</p>
                                </div>
                                <button onClick={fetchArticles} className="tf-button">
                                    Coba Lagi
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        )
    }

    return (
        <>
            <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="ARTIKEL BEM SV UNS">
                <section className="tf-blog">
                    <div className="tf-container">
                        {/* Filter Info */}
                        {(filters.category || filters.tag || filters.search) && (
                            <div className="row mb-4">
                                <div className="col-md-12">
                                    <div className="filter-info">
                                        <p>
                                            Menampilkan artikel untuk: 
                                            {filters.category && <span className="filter-tag">Kategori: {filters.category}</span>}
                                            {filters.tag && <span className="filter-tag">Tag: {getMinistryDisplayName(filters.tag)}</span>}
                                            {filters.search && <span className="filter-tag">Pencarian: "{filters.search}"</span>}
                                            <button onClick={clearFilters} className="btn-clear-filter">
                                                <i className="fas fa-times"></i> Hapus Filter
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="row">
                            {articles.length > 0 ? (
                                articles.map((article) => (
                                    <div key={article.id} className="col-xl-4 col-lg-6 col-md-6">
                                        <article className="tf-blog-item">
                                            <div className="image">
                                                <Link href={`/artikel-detail?id=${article.id}`}>
                                                    <img 
                                                        src={article.image} 
                                                        alt={article.title}
                                                        onError={(e) => {
                                                            e.target.src = '/assets/images/blog/default-article.jpg'
                                                        }}
                                                    />
                                                </Link>
                                                <Link href={`/artikel?category=${article.category}`} className="category">
                                                    {article.category}
                                                </Link>
                                            </div>
                                            <div className="meta">
                                                <span className="admin">
                                                    <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M10 0C7.09223 0 4.72656 2.36566 4.72656 5.27344C4.72656 8.18121 7.09223 10.5469 10 10.5469C12.9078 10.5469 15.2734 8.18121 15.2734 5.27344C15.2734 2.36566 12.9078 0 10 0Z" fill="#FBAD2D" />
                                                        <path d="M16.5612 13.992C15.1174 12.5261 13.2035 11.7188 11.1719 11.7188H8.82812C6.79656 11.7188 4.88258 12.5261 3.43883 13.992C2.00215 15.4507 1.21094 17.3763 1.21094 19.4141C1.21094 19.7377 1.47328 20 1.79688 20H18.2031C18.5267 20 18.7891 19.7377 18.7891 19.4141C18.7891 17.3763 17.9979 15.4507 16.5612 13.992Z" fill="#FBAD2D" />
                                                    </svg>
                                                    {article.author}
                                                </span>
                                                <span className="date">
                                                    <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M1.66602 7.50033C1.66602 6.25417 1.66602 5.63109 1.93396 5.16699C2.1095 4.86295 2.36198 4.61048 2.66602 4.43494C3.13012 4.16699 3.75319 4.16699 4.99935 4.16699H14.9993C16.2455 4.16699 16.8686 4.16699 17.3327 4.43494C17.6367 4.61048 17.8892 4.86295 18.0647 5.16699C18.3327 5.63109 18.3327 6.25417 18.3327 7.50033C18.3327 7.81186 18.3327 7.96763 18.2657 8.08366C18.2218 8.15967 18.1587 8.22279 18.0827 8.26667C17.9667 8.33366 17.8109 8.33366 17.4993 8.33366H2.49935C2.18781 8.33366 2.03204 8.33366 1.91602 8.26667C1.84001 8.22279 1.77689 8.15967 1.733 8.08366C1.66602 7.96763 1.66602 7.81186 1.66602 7.50033Z" fill="#FBAD2D" />
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M2.2518 17.7475C1.66602 17.1618 1.66602 16.219 1.66602 14.3333V11C1.66602 10.5286 1.66602 10.2929 1.81246 10.1464C1.95891 10 2.19461 10 2.66601 10H17.3327C17.8041 10 18.0398 10 18.1862 10.1464C18.3327 10.2929 18.3327 10.5286 18.3327 11V14.3333C18.3327 16.219 18.3327 17.1618 17.7469 17.7475C17.1611 18.3333 16.2183 18.3333 14.3327 18.3333H5.66602C3.7804 18.3333 2.83759 18.3333 2.2518 17.7475ZM6.66602 13.1667C6.11373 13.1667 5.66602 13.6144 5.66602 14.1667C5.66602 14.719 6.11373 15.1667 6.66602 15.1667H13.3327C13.885 15.1667 14.3327 14.719 14.3327 14.1667C14.3327 13.6144 13.885 13.1667 13.3327 13.1667H6.66602Z" fill="#FBAD2D" />
                                                        <path d="M5.83398 2.5L5.83398 5" stroke="#FBAD2D" strokeWidth={2} strokeLinecap="round" />
                                                        <path d="M14.166 2.5L14.166 5" stroke="#FBAD2D" strokeWidth={2} strokeLinecap="round" />
                                                    </svg>
                                                    {article.date}
                                                </span>
                                            </div>
                                            <h3 className="title">
                                                <Link href={`/artikel-detail?id=${article.id}`}>
                                                    {article.title}
                                                </Link>
                                            </h3>
                                            <p className="content">
                                                {article.excerpt && article.excerpt.length > 150 
                                                    ? `${article.excerpt.substring(0, 150)}...` 
                                                    : article.excerpt || 'Tidak ada ringkasan tersedia.'
                                                }
                                            </p>
                                            <Link href={`/artikel-detail?id=${article.id}`} className="btn-readmore">
                                                BACA SELENGKAPNYA <i className="fal fa-long-arrow-right" />
                                            </Link>
                                        </article>
                                    </div>
                                ))
                            ) : (
                                <div className="col-md-12">
                                    <div className="no-articles text-center py-5">
                                        <h3>Tidak Ada Artikel</h3>
                                        <p>
                                            {filters.category || filters.tag || filters.search 
                                                ? 'Tidak ada artikel yang sesuai dengan filter yang dipilih.' 
                                                : 'Belum ada artikel yang dipublikasikan.'
                                            }
                                        </p>
                                        {(filters.category || filters.tag || filters.search) && (
                                            <button onClick={clearFilters} className="tf-button">
                                                Lihat Semua Artikel
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="tf-pagination">
                                        <ul>
                                            {/* Previous Button */}
                                            <li className={`btn-page ${currentPage === 1 ? 'disabled' : ''}`}>
                                                <button 
                                                    onClick={() => handlePageChange(currentPage - 1)}
                                                    disabled={currentPage === 1}
                                                >
                                                    <i className="far fa-angle-left" />
                                                </button>
                                            </li>

                                            {/* Page Numbers */}
                                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                                <li key={page} className={currentPage === page ? 'active' : ''}>
                                                    <button onClick={() => handlePageChange(page)}>
                                                        {page}
                                                    </button>
                                                </li>
                                            ))}

                                            {/* Next Button */}
                                            <li className={`btn-page btn-next ${currentPage === totalPages ? 'disabled' : ''}`}>
                                                <button 
                                                    onClick={() => handlePageChange(currentPage + 1)}
                                                    disabled={currentPage === totalPages}
                                                >
                                                    <i className="far fa-angle-right" />
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </Layout>
        </>
    )
}