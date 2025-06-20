'use client';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { useEffect, useState } from 'react';
import articlesApi from '@/services/articlesApi';

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
        name: "Dino Adi Prasetyo",
        position: "Menteri Kemahasiswaan",
        image: "/assets/images/kemahasiswaan/1.png",
        instagram: "https://www.instagram.com/dinoadiprasetyo",
    },
    {
        id: 2,
        name: "Adhila Paramitha Larasati",
        position: "Dirjen Advokasi dan Kesejahteraan Mahasiswa",
        image: "/assets/images/kemahasiswaan/2.png",
        instagram: "https://www.instagram.com/adhilaparamitha",
    },
    {
        id: 3,
        name: "Devinda Zahra Angayomi",
        position: "Dirjen Kreasi Karya dan Potensi Mahasiswa",
        image: "/assets/images/kemahasiswaan/3.png",
        instagram: "https://www.instagram.com/devindazahra",
    },
];

const staffData = [
    {
        title: "Kedirjenan Advokasi dan Kesejahteraan Mahasiswa",
        members: [
            { name: "Donella Qolbi Ivana", role: null },
            { name: "Yolanda Amelia Herlintang", role: null },
            { name: "Revalina Fitria Isdamayanti", role: null },
            { name: "Novia Tri Hapsari", role: null },
            { name: "Fauziah Nur Iktisah", role: null },
            { name: "Firda Aulia Putri Wibowo", role: null },
            { name: "Justin Farrel Haza Ashari", role: null },
            { name: "Muhammad Rizqy Fadhilah", role: null },
        ],
    },
    {
        title: "Kedirjenan Kreasi Karya dan Potensi Mahasiswa",
        members: [
            { name: "Adrian Dewangga Putra", role: null },
            { name: "Dellia Musika Nada", role: null },
            { name: "Rafa Naura Tanisha Putri", role: null },
            { name: "Salmaa Fauziyyah", role: null },
            { name: "Novelia Astrid Damayanti", role: null },
            { name: "Zefannya Echaristiawan Bu'ulolo", role: null },
            { name: "Kent Raditya Setijawan", role: null },
            { name: "Salsabilla Hanum", role: null },
            { name: "Rio Ferdinand", role: null },
        ],
    },
];

export default function Team() {
    const [relatedArticles, setRelatedArticles] = useState([]);
    const [isLoadingArticles, setIsLoadingArticles] = useState(true);

    useEffect(() => {
        fetchKemahasiswaanArticles();
    }, []);

    const fetchKemahasiswaanArticles = async () => {
        try {
            setIsLoadingArticles(true);
            const allArticles = await articlesApi.getArticles();
            
            // Filter articles by kemahasiswaan tag
            const kemahasiswaanArticles = allArticles.filter(article => 
                article.status === 'published' && 
                article.tags?.some(tag => 
                    tag.toLowerCase().includes('kemahasiswaan') || 
                    tag.toLowerCase().includes('advokasi') || 
                    tag.toLowerCase().includes('kesejahteraan') ||
                    tag.toLowerCase().includes('kreasi') ||
                    tag.toLowerCase().includes('potensi')
                )
            );
            
            // Get latest 3 articles
            const latestArticles = kemahasiswaanArticles
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(0, 3);
            
            setRelatedArticles(latestArticles);
        } catch (error) {
            console.error('Error fetching kemahasiswaan articles:', error);
            setRelatedArticles([]);
        } finally {
            setIsLoadingArticles(false);
        }
    };

    return (
        <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Kemahasiswaan">
            <div>
                                <section className="tf-section tf-team-detail" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
                                    <div className="tf-container">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="swiper-container team-details">
                                                    <Swiper {...swiperOptions} className="swiper-wrapper">
                                                        <SwiperSlide>
                                                            <div className="slider-item">
                                                                <img
                                                                    src="/assets/images/kemahasiswaan/keg1.png"
                                                                    alt="Kemahasiswaan BEM SV UNS"
                                                                    loading="lazy"
                                                                />
                                                            </div>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <div className="slider-item">
                                                                <img
                                                                    src="/assets/images/kemahasiswaan/keg2.png"
                                                                    alt="Tim Kemahasiswaan"
                                                                    loading="lazy"
                                                                />
                                                            </div>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <div className="slider-item">
                                                                <img
                                                                    src="/assets/images/kemahasiswaan/keg3.png"
                                                                    alt="Kegiatan Kemahasiswaan"
                                                                    loading="lazy"
                                                                />
                                                            </div>
                                                        </SwiperSlide>
                                                    </Swiper>
                                                    <div className="swiper-button-next button-team-detail-next"></div>
                                                    <div className="swiper-button-prev button-team-detail-prev"></div>
                                                    <div className="swiper-pagination swiper-pagination-team" style={{ marginBottom: '20px' }}  ></div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 d-flex">
                                                <div className="content-detail p-4 w-100 h-100 d-flex flex-column justify-content-between border rounded shadow-sm">
                                                    <div>
                                                        <p className="position text-uppercase text-muted mb-2">KEMENTERIAN</p>
                                                        <h2 className="tf-heading mb60 d-none d-md-block" style={{ textAlign: 'left' }}>KEMAHASISWAAN</h2>
                                                        <h3 className="tf-heading mb60 d-md-none" style={{ textAlign: 'left' }}>KEMAHASISWAAN</h3>
                                                        <p className="description text-justify">
                                                            Kementerian Kemahasiswaan BEM SV UNS bertugas memfasilitasi aspirasi, menyediakan advokasi, dan mengembangkan potensi mahasiswa Sekolah Vokasi UNS. Kementerian ini terdiri dari dua direktorat jenderal:
                                                        </p>
                                                        <ul className="list-style mt-3 mb-4">
                                                            <li><strong>Kedirjenan Advokasi dan Kesejahteraan Mahasiswa:</strong> <br />Bertugas mewadahi dan memperjuangkan hak-hak mahasiswa serta mengupayakan peningkatan kesejahteraan mahasiswa Sekolah Vokasi UNS.</li>
                                                            <li><strong>Kedirjenan Kreasi Karya dan Potensi Mahasiswa:</strong> <br />Fokus pada pengembangan minat, bakat, dan potensi mahasiswa melalui berbagai kegiatan kreasi dan kompetisi karya.</li>
                                                        </ul>
                                                    </div>
                                                    <div>
                                                        <h3 className="title mb-2">Sosial Media</h3>
                                                        <ul className="social-item list-inline">
                                                            <li className="list-inline-item">
                                                                <Link
                                                                    href="https://www.instagram.com/kaemha.haha"
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    aria-label="Instagram Kemahasiswaan BEM SV UNS"
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
                                                    <h2 className="heading d-none d-md-block">PENGURUS INTI KEMAHASISWAAN</h2>
                                                    <h3 className="heading d-md-none">PENGURUS INTI KEMAHASISWAAN</h3>
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
                                                    <h2 className="heading d-none d-md-block">STAF KEMENTERIAN <span>KEMAHASISWAAN</span></h2>
                                                    <h3 className="heading d-md-none">STAF KEMENTERIAN <span>KEMAHASISWAAN</span></h3>
                                                    <p className="sub-heading">Tim yang bertanggung jawab atas advokasi, kesejahteraan, dan pengembangan potensi mahasiswa Sekolah Vokasi UNS</p>
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
                                                    <h2 className="heading d-none d-md-block">ARTIKEL <span>TERKAIT</span></h2>
                                                    <h3 className="heading d-md-none">ARTIKEL <span>TERKAIT</span></h3>
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
                                                    <p>Belum ada artikel terkait kemahasiswaan.</p>
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