'use client';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { useEffect, useState } from 'react';
import articlesApi from '@/services/articlesApi';
import { getArticlesByMinistry } from '@/utils/ministryTagsMapping';

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    loop: true,
    slidesPerView: 1,
    spaceBetween: 30,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        clickable: true,
        el: '.swiper-pagination-team',
    },
    navigation: {
        nextEl: ".button-team-detail-next",
        prevEl: ".button-team-detail-prev",
    },
};

const coreTeamMembers = [
    {
        id: 1,
        name: "Nayyara Nur Khasia S",
        position: "Menteri Manajemen Kabinet",
        image: "/assets/images/menkab/1.png",
        instagram: "https://www.instagram.com/nayyarankhs",
    },
    {
        id: 2,
        name: "Siti Sa'idah Witriyanti",
        position: "Dirjen Sekretaris Kabinet",
        image: "/assets/images/menkab/2.png",
        instagram: "https://www.instagram.com/siti_witriyanti",
    },
    {
        id: 3,
        name: "Zahra Budiyanto",
        position: "Dirjen Keuangan Kabinet",
        image: "/assets/images/menkab/3.png",
        instagram: "https://www.instagram.com/zahra_budiyanto",
    },
    {
        id: 4,
        name: "Muhammad Naufal Abhista",
        position: "Dirjen Ekonomi Kreatif",
        image: "/assets/images/menkab/4.png",
        instagram: "https://www.instagram.com/naufal_abhi",
    },
];

const staffData = [
    {
        title: "Kedirjenan Sekretaris Kabinet",
        members: [
            { name: "Aninda Khoyrul Afif", role: null },
            { name: "Agustina Jacinda Alda", role: null },
            { name: "Salma Az-Zahra Rifda Adzkia", role: null },
            { name: "Vania Cahyaningrum", role: null },
            { name: "Nur Putri Afifah", role: null },
            { name: "Dea Dwi Yuliana", role: null },
            { name: "Septin Dian Pratiwi", role: null },
        ],
    },
    {
        title: "Kedirjenan Keuangan Kabinet",
        members: [
            { name: "Anggraini Dewi Wulandari", role: null },
            { name: "Lathifah Nur Ardiyanti", role: null },
            { name: "Nabilla Mutiara Ramadhani", role: null },
            { name: "Rahmanisa Abdullah Putri", role: null },
            { name: "Ulfah Qoirun Nabila", role: null },
            { name: "Zulfa Fahryani Andina", role: null },
            { name: "Zulfa Mutya Rahma", role: null },
        ],
    },
    {
        title: "Kedirjenan Ekonomi Kreatif",
        members: [
            { name: "Muhammad Amien Rais", role: null },
            { name: "Ummi Sa'adah", role: null },
            { name: "Mutiara Firdaus", role: null },
            { name: "Aulia Salsabila", role: null },
            { name: "Shabila Dini Aprilia", role: null },
            { name: "Krisna Adi Saputra", role: null },
            { name: "Shoffia Sari Rachmawati", role: null },
        ],
    },
];

export default function Team() {
    const [relatedArticles, setRelatedArticles] = useState([]);
    const [isLoadingArticles, setIsLoadingArticles] = useState(true);

    useEffect(() => {
        fetchManajemenKabinetArticles();
    }, []);

    const fetchManajemenKabinetArticles = async () => {
        try {
            setIsLoadingArticles(true);
            const allArticles = await articlesApi.getArticles();
            
            // Filter articles by manajemen kabinet tags
            const menkabArticles = getArticlesByMinistry(allArticles, 'manajemen_kabinet');
            
            // Get latest 3 articles
            const latestArticles = menkabArticles
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(0, 3);
            
            setRelatedArticles(latestArticles);
        } catch (error) {
            console.error('Error fetching manajemen kabinet articles:', error);
            setRelatedArticles([]);
        } finally {
            setIsLoadingArticles(false);
        }
    };

    return (
        <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="MANAJEMEN KABINET">
            <div>
                {/* Team Detail Section */}
                <section className="tf-section tf-team-detail" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
                    <div className="tf-container">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="swiper-container team-details">
                                    <Swiper {...swiperOptions} className="swiper-wrapper">
                                        <SwiperSlide>
                                            <div className="slider-item">
                                                <img
                                                    src="/assets/images/menkab/keg1.png"
                                                    alt="Manajemen Kabinet BEM SV UNS"
                                                    loading="lazy"
                                                />
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="slider-item">
                                                <img
                                                    src="/assets/images/menkab/keg2.png"
                                                    alt="Tim Manajemen Kabinet"
                                                    loading="lazy"
                                                />
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="slider-item">
                                                <img
                                                    src="/assets/images/menkab/keg3.png"
                                                    alt="Kegiatan Manajemen Kabinet"
                                                    loading="lazy"
                                                />
                                            </div>
                                        </SwiperSlide>
                                    </Swiper>

                                    <div className="swiper-button-next button-team-detail-next"></div>
                                    <div className="swiper-button-prev button-team-detail-prev"></div>
                                    <div className="swiper-pagination swiper-pagination-team" style={{ marginBottom: '20px' }}></div>
                                </div>
                            </div>
                            <div className="col-md-6 d-flex">
                                <div className="content-detail p-4 w-100 h-100 d-flex flex-column justify-content-between border rounded shadow-sm">
                                    <div>
                                        <p className="position text-uppercase text-muted mb-2">KEMENTERIAN</p>
                                        <h1 className="name mb-3">MANAJEMEN KABINET</h1>
                                        <p className="description">
                                            Kementerian Manajemen Kabinet bertugas mengelola administrasi, keuangan, dan kemandirian finansial BEM SV UNS. Kementerian ini terdiri dari tiga direktorat:
                                        </p>
                                        <ul className="list-style mt-3 mb-4">
                                            <li><strong>Kedirjenan Sekretaris Kabinet:</strong> <br />Mengatur dan mengawasi administrasi seluruh kementerian.</li>
                                            <li><strong>Kedirjenan Keuangan Kabinet:</strong> <br />Mengelola dan mengontrol keuangan organisasi.</li>
                                            <li><strong>Kedirjenan Ekonomi Kreatif:</strong> <br />Menjadi wadah pengembangan kewirausahaan mahasiswa serta mendorong kemandirian finansial BEM.</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="title mb-2">Sosial Media</h3>
                                        <ul className="social-item list-inline">
                                            <li className="list-inline-item">
                                                <Link
                                                    href="https://www.instagram.com/manajemenkabinet"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label="Instagram BEM SV UNS"
                                                >
                                                    <i className="fab fa-instagram fa-lg" />
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                                <section className="tf-section team" style={{ paddingTop: '100px', paddingBottom: '80px' }}>
                                    <div className="tf-container">
                                        <div className="row justify-content-center">
                                            <div className="col-md-12">
                                                <div className="tf-heading mb60">
                                                    <h2 className="heading">PENGURUS INTI MANAJEMEN KABINET</h2>
                                                </div>
                                            </div>
                                            {coreTeamMembers.map((member) => (
                                                <div key={member.id} className="col-lg-3 col-md-4 col-sm-6 col-12 d-flex">
                                                    <div className="tf-team w-100 h-100 d-flex flex-column align-items-center justify-content-between border rounded shadow-sm">
                                                        <div className="image" style={{ width: '100%', height: 'auto', overflow: 'hidden' }}>
                                                            <img
                                                                src={member.image}
                                                                alt={`${member.name} - ${member.position}`}
                                                                loading="lazy"
                                                                style={{ width: '150px', height: '150px', objectFit: 'cover', border: '2px solid #fff', borderRadius: '50%' }}
                                                            />
                                                        </div>
                                                        <h3 className="name text-center mt-3">
                                                            <Link href="#" aria-label={`Profil ${member.name}`}>
                                                                {member.name}
                                                            </Link>
                                                        </h3>
                                                        <p className="position text-center">{member.position}</p>
                                                        <ul className="social list-inline mt-2 mb-3">
                                                            <li className="list-inline-item">
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </section>

                                {/* Staff Section */}
                <section className="tf-section" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
                    <div className="tf-container">
                        <div className="row justify-content-center">
                            <div className="col-md-12">
                                <div className="tf-heading mb60">
                                    <h2 className="heading">STAF KEMENTERIAN <span>MANAJEMEN KABINET</span></h2>
                                    <p className="sub-heading">Tim yang bertanggung jawab atas pengelolaan internal serta koordinasi administratif dan finansial di lingkungan BEM SV</p>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="tf-card-box h-100">
                                    <div className="card-content">
                                        <div className="row">
                                            {staffData.map((bureau, index) => (
                                                <div key={index} className="col-md-4 mb-4">
                                                    <div className="staff-group">
                                                        <h3 className="mb-3">{bureau.title}</h3>
                                                        <ul className="staff-list">
                                                            {bureau.members.map((member, memberIndex) => (
                                                                <li key={memberIndex} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                                                    <i className="fas fa-user-circle" style={{ marginRight: '10px', color: '#007bff' }}></i>
                                                                    <span>
                                                                        {member.name}
                                                                        {member.role && ` (${member.role})`}
                                                                    </span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Related Articles Section */}
                <section className="tf-section" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
                    <div className="tf-container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="tf-heading mb-5 text-center">
                                    <h2 className="heading">ARTIKEL <span>TERKAIT</span></h2>
                                </div>
                            </div>
                            <div className="col-md-12">
                                {isLoadingArticles ? (
                                    <div className="text-center">
                                        <div className="loading-spinner">
                                            <div className="spinner"></div>
                                        </div>
                                        <p>Memuat artikel...</p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="row">
                                            {relatedArticles.length > 0 ? (
                                                relatedArticles.map((article) => (
                                                    <div key={article.id} className="col-lg-4 col-md-6 mb-4">
                                                        <article className="tf-blog-item">
                                                            <div className="image">
                                                                <Link href={`/artikel-detail?id=${article.id}`}>
                                                                    <img
                                                                        src={article.image}
                                                                        alt={article.title}
                                                                        loading="lazy"
                                                                        onError={(e) => {
                                                                            e.target.src = '/assets/images/blog/default-article.jpg'
                                                                        }}
                                                                    />
                                                                </Link>
                                                                <Link
                                                                    href={`/artikel?category=${article.category}`}
                                                                    className="category"
                                                                >
                                                                    {article.category}
                                                                </Link>
                                                            </div>
                                                            <div className="meta">
                                                                <span className="admin">{article.author}</span>
                                                                <span className="date">{article.date}</span>
                                                            </div>
                                                            <h3 className="title">
                                                                <Link href={`/artikel-detail?id=${article.id}`}>
                                                                    {article.title}
                                                                </Link>
                                                            </h3>
                                                            <p className="content">
                                                                {article.excerpt && article.excerpt.length > 100 
                                                                    ? `${article.excerpt.substring(0, 100)}...` 
                                                                    : article.excerpt || 'Tidak ada ringkasan tersedia.'
                                                                }
                                                            </p>
                                                            <Link
                                                                href={`/artikel-detail?id=${article.id}`}
                                                                className="btn-readmore"
                                                            >
                                                                BACA SELENGKAPNYA <i className="fal fa-long-arrow-right" />
                                                            </Link>
                                                        </article>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="col-md-12 text-center">
                                                    <p>Belum ada artikel terkait manajemen kabinet.</p>
                                                </div>
                                            )}
                                        </div>
                                        <div className="text-center mt-4">
                                            <Link href="/artikel" className="tf-button">
                                                LIHAT SEMUA ARTIKEL
                                            </Link>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
