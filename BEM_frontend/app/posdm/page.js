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
        name: "Naquit Viego Putra Pribadi",
        position: "Menteri POSDM",
        image: "/assets/images/posdm/1.png",
        instagram: "https://www.instagram.com/naquitviego",
    },
    {
        id: 2,
        name: "Hilmi Zaki Pratama",
        position: "Dirjen Pengembangan Organisasi",
        image: "/assets/images/posdm/2.png",
        instagram: "https://www.instagram.com/hilmizaki",
    },
    {
        id: 3,
        name: "Nihla Thifala Azzah",
        position: "Dirjen Pengembangan SDM",
        image: "/assets/images/posdm/3.png",
        instagram: "https://www.instagram.com/nihlaazzah",
    },
];

const staffData = [
    {
        title: "Kedirjenan Pengembangan Organisasi",
        members: [
            { name: "Reyhan Dzaky Hermaputra", role: null },
            { name: "Indika Fauziyah", role: null },
            { name: "Seftiyan Intan Nur Khasanah", role: null },
            { name: "Miftah Uljannah", role: null },
            { name: "Yessi Sandra Giantha", role: null },
            { name: "Indra Rustanti", role: null },
            { name: "Elok Fitria Nur Endah Asri", role: null },
            { name: "Muhammad Rafli Firdaus", role: null },
        ],
    },
    {
        title: "Kedirjenan Pengembangan SDM",
        members: [
            { name: "Afdila Sri Kurniati", role: null },
            { name: "Aledya Anastasi Wijaya", role: null },
            { name: "Yariz Mehta Azman", role: null },
            { name: "Kinanti Anastasya", role: null },
            { name: "Karisma Pinky Nur Istiqomah", role: null },
            { name: "Lyanatul Anik Magfiroh", role: null },
            { name: "Noufall Farrell Adhyasta", role: null },
            { name: "Nur Salma Fadhilah", role: null },
        ],
    },
];

export default function Team() {
    const [relatedArticles, setRelatedArticles] = useState([]);
    const [isLoadingArticles, setIsLoadingArticles] = useState(true);

    useEffect(() => {
        fetchPosdmArticles();
    }, []);

    const fetchPosdmArticles = async () => {
        try {
            setIsLoadingArticles(true);
            const allArticles = await articlesApi.getArticles();
            
            // Filter articles by POSDM tags
            const posdmArticles = getArticlesByMinistry(allArticles, 'posdm');
            
            // Get latest 3 articles
            const latestArticles = posdmArticles
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(0, 3);
            
            setRelatedArticles(latestArticles);
        } catch (error) {
            console.error('Error fetching POSDM articles:', error);
            setRelatedArticles([]);
        } finally {
            setIsLoadingArticles(false);
        }
    };

    return (
        <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="POSDM">
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
                                                    src="/assets/images/posdm/keg1.png"
                                                    alt="POSDM BEM SV UNS"
                                                    loading="lazy"
                                                />
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="slider-item">
                                                <img
                                                    src="/assets/images/posdm/keg2.png"
                                                    alt="Tim POSDM"
                                                    loading="lazy"
                                                />
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="slider-item">
                                                <img
                                                    src="/assets/images/posdm/keg3.png"
                                                    alt="Kegiatan POSDM"
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
                                        <h2 className="tf-heading mb60" style={{ textAlign: 'left' }}>PENGEMBANGAN ORGANISASI DAN SUMBER DAYA MANUSIA</h2>
                                        <p className="description text-justify">
                                            Kementerian Pengembangan Organisasi dan Sumber Daya Manusia (POSDM) bertugas mengembangkan kapasitas organisasi dan meningkatkan kualitas sumber daya manusia BEM SV UNS. Kementerian ini terdiri dari dua direktorat:
                                        </p>
                                        <ul className="list-style mt-3 mb-4">
                                            <li><strong>Kedirjenan Pengembangan Organisasi:</strong> <br />Bertugas mengembangkan sistem dan struktur organisasi yang efektif serta efisien untuk mendukung kinerja BEM SV UNS.</li>
                                            <li><strong>Kedirjenan Pengembangan SDM:</strong> <br />Fokus pada peningkatan kapasitas, kompetensi, dan kualitas pengurus BEM SV UNS melalui berbagai program pelatihan dan pengembangan.</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="title mb-2">Sosial Media</h3>
                                        <ul className="social-item list-inline">
                                            <li className="list-inline-item">
                                                <Link
                                                    href="https://www.instagram.com/posdm25"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label="Instagram POSDM BEM SV UNS"
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
                                    <h2 className="heading">PENGURUS INTI POSDM</h2>
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
                <section className="tf-section" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
                    <div className="tf-container">
                        <div className="row justify-content-center">
                            <div className="col-md-12">
                                <div className="tf-heading mb60">
                                    <h2 className="heading">STAF KEMENTERIAN <span>POSDM</span></h2>
                                    <p className="sub-heading">Tim yang bertanggung jawab atas pengembangan organisasi dan peningkatan kualitas sumber daya manusia di lingkungan BEM SV</p>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="tf-card-box h-100">
                                    <div className="card-content">
                                        <div className="row">
                                            {staffData.map((bureau, index) => (
                                                <div key={index} className="col-md-6 mb-4">
                                                    <div className="staff-group border rounded p-4 shadow-sm">
                                                        <h3 className="mb-3">{bureau.title}</h3>
                                                        <ul className="staff-list list-unstyled">
                                                            {bureau.members.map((member, memberIndex) => (
                                                                <li key={memberIndex} className="d-flex align-items-center mb-2">
                                                                    <i className="fas fa-user-circle text-primary" style={{ marginRight: '8px' }}></i>
                                                                    {member.name}
                                                                    {member.role && ` (${member.role})`}
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
                                                    <p>Belum ada artikel terkait POSDM.</p>
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