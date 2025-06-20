'use client'

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Layout from "@/components/layout/Layout";
import articlesApi from '@/services/articlesApi';

export default function ArtikelDetail() {
    const searchParams = useSearchParams();
    const articleId = searchParams.get('id');
    const [article, setArticle] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [recentArticles, setRecentArticles] = useState([]);
    const [isSubmittingComment, setIsSubmittingComment] = useState(false);
    const [commentMessage, setCommentMessage] = useState('');
    const [commentForm, setCommentForm] = useState({
        name: '',
        email: '',
        phone: '',
        website: '',
        message: ''
    });
    
    useEffect(() => {
        if (articleId) {
            fetchData();
        } else {
            setError('Article ID is missing');
            setIsLoading(false);
        }
    }, [articleId]);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            setError(null);
            
            console.log(`Fetching article with ID: ${articleId}`);
            const data = await articlesApi.getArticle(articleId);
            setArticle(data);
            
            // Fetch recent articles for sidebar
            const allArticles = await articlesApi.getArticles();
            const filteredArticles = allArticles
                .filter(a => a.id != articleId && a.status === 'published')
                .slice(0, 3);
            setRecentArticles(filteredArticles);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error.message || 'Failed to fetch article');
            
            // Try to load a fallback article from localStorage as emergency backup
            try {
                const fallbackArticles = localStorage.getItem('bemsvuns_articles');
                if (fallbackArticles) {
                    const articles = JSON.parse(fallbackArticles);
                    const fallbackArticle = articles.find(a => a.id == articleId);
                    if (fallbackArticle) {
                        console.log('Using fallback article from localStorage:', fallbackArticle);
                        setArticle(fallbackArticle);
                        
                        // Also get recent articles for sidebar
                        const recentFallbackArticles = articles
                            .filter(a => a.id != articleId)
                            .slice(0, 3);
                        setRecentArticles(recentFallbackArticles);
                        
                        setError('Using cached version. Some data might be outdated.');
                    }
                }
            } catch (localStorageError) {
                console.error('Error accessing localStorage:', localStorageError);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        setIsSubmittingComment(true);
        setCommentMessage('');

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            setCommentMessage('Terima kasih! Komentar Anda telah terkirim dan sedang menunggu moderasi.');
            setCommentForm({
                name: '',
                email: '',
                phone: '',
                website: '',
                message: ''
            });
        } catch (error) {
            setCommentMessage('Terjadi kesalahan. Silakan coba lagi.');
        } finally {
            setIsSubmittingComment(false);
        }
    };

    const handleCommentChange = (e) => {
        const { name, value } = e.target;
        setCommentForm(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    if (isLoading) {
        return (
            <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="ARTIKEL DETAIL">
                <section className="tf-blog">
                    <div className="tf-container">
                        <div className="row justify-content-center">
                            <div className="col-md-8 text-center">
                                <div className="loading-spinner">
                                    <div className="spinner"></div>
                                </div>
                                <p>Memuat artikel...</p>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        );
    }

    if (error && !article) {
        return (
            <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="ARTIKEL DETAIL">
                <section className="tf-blog">
                    <div className="tf-container">
                        <div className="row justify-content-center">
                            <div className="col-md-8 text-center">
                                <div className="error-message">
                                    <i className="fas fa-exclamation-circle" style={{ fontSize: '3rem', color: '#dc3545', marginBottom: '1rem' }}></i>
                                    <h3>Artikel Tidak Ditemukan</h3>
                                    <p>{error}</p>
                                    <Link href="/artikel" className="tf-button">
                                        Kembali ke Daftar Artikel
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        );
    }

    if (!article) {
        return (
            <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="ARTIKEL DETAIL">
                <section className="tf-blog">
                    <div className="tf-container">
                        <div className="row justify-content-center">
                            <div className="col-md-8 text-center">
                                <h3>Artikel Tidak Ditemukan</h3>
                                <p>Artikel yang Anda cari tidak tersedia.</p>
                                <Link href="/artikel" className="tf-button">
                                    Kembali ke Daftar Artikel
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        );
    }

    return (
        <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="ARTIKEL DETAIL">
            <section className="tf-blog">
                <div className="tf-container">
                    {error && (
                        <div className="row">
                            <div className="col-12">
                                <div className="alert alert-warning" role="alert" style={{ marginBottom: '1.5rem' }}>
                                    <i className="fas fa-exclamation-triangle" style={{ marginRight: '0.5rem' }}></i>
                                    {error}
                                </div>
                            </div>
                        </div>
                    )}
                    
                    <div className="row">
                        <div className="col-xl-9 col-lg-8 col-md-12">
                            <div className="detail-inner">
                                <div className="image">
                                    <div style={{
                                        width: '100%',
                                        paddingBottom: '56.25%' /* 16:9 aspect ratio */,
                                        position: 'relative',
                                        overflow: 'hidden',
                                        borderRadius: '10px'
                                    }}>
                                        <img 
                                            src={article.image} 
                                            alt={article.title}
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/800x450/f0f0f0/666666?text=No+Image'
                                            }}
                                            style={{
                                                position: 'absolute',
                                                width: '100%',
                                                height: '100%',
                                                top: 0,
                                                left: 0,
                                                objectFit: 'cover',
                                                objectPosition: 'center'
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="title">
                                    <h3>{article.title}</h3>
                                    <div className="category">{article.category.toUpperCase()}</div>
                                </div>
                                <div className="meta">
                                    <span className="admin">
                                        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 0C8.51067 0 5.67188 2.8388 5.67188 6.32812C5.67188 9.81745 8.51067 12.6562 12 12.6562C15.4893 12.6562 18.3281 9.81745 18.3281 6.32812C18.3281 2.8388 15.4893 0 12 0Z" fill="#21E786" />
                                            <path d="M19.8734 16.7904C18.1409 15.0313 15.8442 14.0625 13.4062 14.0625H10.5938C8.15588 14.0625 5.85909 15.0313 4.12659 16.7904C2.40258 18.5409 1.45312 20.8515 1.45312 23.2969C1.45312 23.6852 1.76794 24 2.15625 24H21.8438C22.2321 24 22.5469 23.6852 22.5469 23.2969C22.5469 20.8515 21.5974 18.5409 19.8734 16.7904Z" fill="#21E786" />
                                        </svg>
                                        {article.author || 'BEM SV UNS'}
                                    </span>
                                    <span className="date">
                                        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2 9C2 7.11438 2 6.17157 2.58579 5.58579C3.17157 5 4.11438 5 6 5H18C19.8856 5 20.8284 5 21.4142 5.58579C22 6.17157 22 7.11438 22 9C22 9.4714 22 9.70711 21.8536 9.85355C21.7071 10 21.4714 10 21 10H3C2.5286 10 2.29289 10 2.14645 9.85355C2 9.70711 2 9.4714 2 9Z" fill="#21E786" />
                                            <path fillRule="evenodd" clipRule="evenodd" d="M2.58579 21.4142C2 20.8284 2 19.8856 2 18V13C2 12.5286 2 12.2929 2.14645 12.1464C2.29289 12 2.5286 12 3 12H21C21.4714 12 21.7071 12 21.8536 12.1464C22 12.2929 22 12.5286 22 13V18C22 19.8856 22 20.8284 21.4142 21.4142C20.8284 22 19.8856 22 18 22H6C4.11438 22 3.17157 22 2.58579 21.4142ZM8 16C7.44772 16 7 16.4477 7 17C7 17.5523 7.44772 18 8 18H16C16.5523 18 17 17.5523 17 17C17 16.4477 16.5523 16 16 16H8Z" fill="#21E786" />
                                            <path d="M7 3L7 6" stroke="#21E786" strokeWidth={2} strokeLinecap="round" />
                                            <path d="M17 3L17 6" stroke="#21E786" strokeWidth={2} strokeLinecap="round" />
                                        </svg>
                                        {article.date}
                                    </span>
                                </div>
                                <div className="content-inner mb24">
                                    {article.content ? (
                                        typeof article.content === 'string' ? (
                                            article.content.split('\n').map((paragraph, index) => (
                                                <p key={index}>{paragraph}</p>
                                            ))
                                        ) : (
                                            Array.isArray(article.content) ? (
                                                article.content.map((paragraph, index) => (
                                                    <p key={index}>{paragraph}</p>
                                                ))
                                            ) : (
                                                <p>{article.excerpt}</p>
                                            )
                                        )
                                    ) : (
                                        <p>{article.excerpt}</p>
                                    )}
                                </div>
                                
                                {/* Tags Section */}
                                {article.tags && article.tags.length > 0 && (
                                    <div className="content-bottom">
                                        <div className="widget widget-tag">
                                            <h6 className="widget-title">TAGS:</h6>
                                            <ul>
                                                {article.tags.map((tag, index) => (
                                                    <li key={index}><Link href={`/artikel?tag=${tag}`}>{tag.toUpperCase()}</Link></li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="widget widget-socical">
                                            <h6 className="widget-title">SHARE:</h6>
                                            <ul>
                                                <li><Link href="#" className="fab fa-facebook-f" /></li>
                                                <li><Link href="#" className="fab fa-twitter" /></li>
                                                <li><Link href="#" className="fab fa-instagram" /></li>
                                            </ul>
                                        </div>
                                    </div>
                                )}
                                
                                {/* Previous/Next Article Navigation */}
                                <ul className="post-navigator">
                                    {article.prevArticle && (
                                        <li>
                                            <div className="thump" style={{
                                                width: '100px',
                                                height: '56px' /* 16:9 ratio */,
                                                position: 'relative',
                                                overflow: 'hidden',
                                                borderRadius: '5px'
                                            }}>
                                                <img 
                                                    src={article.prevArticle.image} 
                                                    alt={article.prevArticle.title}
                                                    onError={(e) => {
                                                        e.target.src = 'https://via.placeholder.com/100x56/f0f0f0/666666?text=No+Image'
                                                    }}
                                                    style={{
                                                        position: 'absolute',
                                                        width: '100%',
                                                        height: '100%',
                                                        top: 0,
                                                        left: 0,
                                                        objectFit: 'cover',
                                                        objectPosition: 'center'
                                                    }}
                                                />
                                            </div>
                                            <div className="content">
                                                <Link href={`/artikel-detail?id=${article.prevArticle.id}`} className="btn-post btn-prev">SEBELUMNYA</Link>
                                                <h6 className="title">
                                                    <Link href={`/artikel-detail?id=${article.prevArticle.id}`}>
                                                        {article.prevArticle.title}
                                                    </Link>
                                                </h6>
                                            </div>
                                        </li>
                                    )}
                                    
                                    {article.nextArticle && (
                                        <li>
                                            <div className="thump" style={{
                                                width: '100px',
                                                height: '56px' /* 16:9 ratio */,
                                                position: 'relative',
                                                overflow: 'hidden',
                                                borderRadius: '5px'
                                            }}>
                                                <img 
                                                    src={article.nextArticle.image} 
                                                    alt={article.nextArticle.title}
                                                    onError={(e) => {
                                                        e.target.src = 'https://via.placeholder.com/100x56/f0f0f0/666666?text=No+Image'
                                                    }}
                                                    style={{
                                                        position: 'absolute',
                                                        width: '100%',
                                                        height: '100%',
                                                        top: 0,
                                                        left: 0,
                                                        objectFit: 'cover',
                                                        objectPosition: 'center'
                                                    }}
                                                />
                                            </div>
                                            <div className="content">
                                                <Link href={`/artikel-detail?id=${article.nextArticle.id}`} className="btn-post btn-next">SELANJUTNYA</Link>
                                                <h6 className="title">
                                                    <Link href={`/artikel-detail?id=${article.nextArticle.id}`}>
                                                        {article.nextArticle.title}
                                                    </Link>
                                                </h6>
                                            </div>
                                        </li>
                                    )}
                                </ul>
                                
                                {/* Comments Section */}
                                <div id="comments">
                                    <h3 className="heading">TINGGALKAN KOMENTAR</h3>
                                    <div className="sub-heading">
                                        Email Anda tidak akan dipublikasikan. Kolom yang wajib diisi ditandai dengan *
                                    </div>

                                    {commentMessage && (
                                        <div className={`comment-message ${commentMessage.includes('Terima kasih') ? 'success' : 'error'}`} 
                                             style={{ 
                                                 padding: '10px 15px', 
                                                 marginBottom: '20px', 
                                                 borderRadius: '5px',
                                                 backgroundColor: commentMessage.includes('Terima kasih') ? '#d4edda' : '#f8d7da',
                                                 color: commentMessage.includes('Terima kasih') ? '#155724' : '#721c24'
                                             }}>
                                            {commentMessage}
                                        </div>
                                    )}

                                    <form onSubmit={handleCommentSubmit} className="comment-form">
                                        <fieldset className="name">
                                            <input 
                                                type="text" 
                                                id="name" 
                                                placeholder="Nama*" 
                                                className="tb-my-input" 
                                                name="name" 
                                                value={commentForm.name}
                                                onChange={handleCommentChange}
                                                required 
                                                disabled={isSubmittingComment}
                                            />
                                        </fieldset>
                                        <fieldset className="email">
                                            <input 
                                                type="email" 
                                                id="email" 
                                                placeholder="Email*" 
                                                className="tb-my-input" 
                                                name="email" 
                                                value={commentForm.email}
                                                onChange={handleCommentChange}
                                                required 
                                                disabled={isSubmittingComment}
                                            />
                                        </fieldset>
                                        <fieldset className="phone">
                                            <input 
                                                type="text" 
                                                id="phone" 
                                                placeholder="No. Telepon" 
                                                className="tb-my-input" 
                                                name="phone" 
                                                value={commentForm.phone}
                                                onChange={handleCommentChange}
                                                disabled={isSubmittingComment}
                                            />
                                        </fieldset>
                                        <fieldset className="website">
                                            <input 
                                                type="text" 
                                                id="website" 
                                                placeholder="Website" 
                                                className="tb-my-input" 
                                                name="website" 
                                                value={commentForm.website}
                                                onChange={handleCommentChange}
                                                disabled={isSubmittingComment}
                                            />
                                        </fieldset>
                                        <fieldset className="message">
                                            <textarea 
                                                id="message" 
                                                name="message" 
                                                rows={4} 
                                                placeholder="Komentar*" 
                                                value={commentForm.message}
                                                onChange={handleCommentChange}
                                                required 
                                                disabled={isSubmittingComment}
                                            />
                                        </fieldset>
                                        <div className="btn-submit mg-t-36">
                                            <button 
                                                className="tf-button" 
                                                type="submit"
                                                disabled={isSubmittingComment}
                                            >
                                                {isSubmittingComment ? 'MENGIRIM...' : 'KIRIM KOMENTAR'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        
                        {/* Sidebar */}
                        <div className="col-xl-3 col-lg-4 col-md-12">
                            <div className="side-bar">
                                <div className="widget widget-search">
                                    <form action="/artikel">
                                        <input type="text" name="search" placeholder="Cari Artikel" required />
                                        <button className="btn-search" type="submit"><i className="fas fa-search"></i></button>
                                    </form>
                                </div>
                                
                                <div className="widget widget-category">
                                    <h4 className="widget-title">KATEGORI</h4>
                                    <ul>
                                        <li><Link href="/artikel?category=Kaderisasi">Kaderisasi</Link></li>
                                        <li><Link href="/artikel?category=Sosial">Sosial</Link></li>
                                        <li><Link href="/artikel?category=Akademik">Akademik</Link></li>
                                        <li><Link href="/artikel?category=Lingkungan">Lingkungan</Link></li>
                                        <li><Link href="/artikel?category=Kegiatan">Kegiatan</Link></li>
                                        <li><Link href="/artikel?category=Pengumuman">Pengumuman</Link></li>
                                    </ul>
                                </div>
                                
                                <div className="widget widget-recent-post">
                                    <h4 className="widget-title">ARTIKEL TERBARU</h4>
                                    <ul>
                                        {recentArticles.length > 0 ? (
                                            recentArticles.map((recentArticle) => (
                                                <li key={recentArticle.id}>
                                                    <div className="post-img" style={{
                                                        width: '80px',
                                                        height: '45px' /* 16:9 ratio */,
                                                        position: 'relative',
                                                        overflow: 'hidden',
                                                        borderRadius: '5px'
                                                    }}>
                                                        <img 
                                                            src={recentArticle.image} 
                                                            alt={recentArticle.title}
                                                            onError={(e) => {
                                                                e.target.src = 'https://via.placeholder.com/80x45/f0f0f0/666666?text=No+Image'
                                                            }}
                                                            style={{
                                                                position: 'absolute',
                                                                width: '100%',
                                                                height: '100%',
                                                                top: 0,
                                                                left: 0,
                                                                objectFit: 'cover',
                                                                objectPosition: 'center'
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="post-content">
                                                        <h6 className="title">
                                                            <Link href={`/artikel-detail?id=${recentArticle.id}`}>
                                                                {recentArticle.title.length > 40 
                                                                    ? `${recentArticle.title.substring(0, 40)}...` 
                                                                    : recentArticle.title
                                                                }
                                                            </Link>
                                                        </h6>
                                                        <div className="post-meta">
                                                            <span className="category">{recentArticle.category.toUpperCase()}</span>
                                                            <span className="date">{recentArticle.date}</span>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))
                                        ) : (
                                            <li className="text-center">Tidak ada artikel terbaru</li>
                                        )}
                                    </ul>
                                </div>
                                
                                {article.tags && article.tags.length > 0 && (
                                    <div className="widget widget-tag">
                                        <h4 className="widget-title">TAG</h4>
                                        <ul>
                                            {article.tags.map((tag, index) => (
                                                <li key={index}><Link href={`/artikel?tag=${tag}`}>{tag}</Link></li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}