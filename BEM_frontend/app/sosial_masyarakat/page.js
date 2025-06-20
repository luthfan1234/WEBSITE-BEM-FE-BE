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
        name: "Innaiyah Octaviani",
        position: "Menteri Sosial Masyarakat",
        image: "/assets/images/sosma/1.png",
        instagram: "https://www.instagram.com/innaiyahoctaviani",
    },
    {
        id: 2,
        name: "Afrisha Dwi Nur Rahmadhani",
        position: "Dirjen Pengabdian dan Pemberdayaan Masyarakat",
        image: "/assets/images/sosma/2.png",
        instagram: "https://www.instagram.com/afrishadwi",
    },
    {
        id: 3,
        name: "Alfia Fatimatuz Zahra",
        position: "Dirjen Sosial Lingkungan",
        image: "/assets/images/sosma/3.png",
        instagram: "https://www.instagram.com/alfiafatimatuz",
    },
];

const staffData = [
    {
        title: "Kedirjenan Pengabdian dan Pemberdayaan Masyarakat",
        members: [
            { name: "Farida Aprilia Sandi", role: null },
            { name: "Tyas Dwi Hapsari", role: null },
            { name: "Arum Setyo Rini", role: null },
            { name: "Sifa Lingga Bima Saputra", role: null },
            { name: "Martha Pramesti Ayuningtyas", role: null },
            { name: "Sabilla Az-Zahra", role: null },
            { name: "Lazzuardi Bintang Randyo Laksono", role: null },
            { name: "Zahra Annayla Putri Zallyanti", role: null },
        ],
    },
    {
        title: "Kedirjenan Sosial Lingkungan",
        members: [
            { name: "Muhammad Rama Pratama", role: null },
            { name: "Damarjati Kristiantoro", role: null },
            { name: "Zidni Aribah Annafi'ah", role: null },
            { name: "Nabil Muhammad Nugroho", role: null },
            { name: "Marva Kamilia Yasmin", role: null },
            { name: "Faruq Reygar Fauzan", role: null },
            { name: "Putri Pintada Lembah Manah", role: null },
            { name: "Nailul Muna Hijriati", role: null },
        ],
    },
];

export default function Team() {
    const [relatedArticles, setRelatedArticles] = useState([]);
    const [isLoadingArticles, setIsLoadingArticles] = useState(true);

    useEffect(() => {
        fetchSosialMasyarakatArticles();
    }, []);

    const fetchSosialMasyarakatArticles = async () => {
        try {
            setIsLoadingArticles(true);
            const allArticles = await articlesApi.getArticles();
            
            // Filter articles by sosial masyarakat tags
            const sosmaArticles = getArticlesByMinistry(allArticles, 'sosial_masyarakat');
            
            // Get latest 3 articles
            const latestArticles = sosmaArticles
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(0, 3);
            
            setRelatedArticles(latestArticles);
        } catch (error) {
            console.error('Error fetching sosial masyarakat articles:', error);
            setRelatedArticles([]);
        } finally {
            setIsLoadingArticles(false);
        }
    };

    return (
        <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Sosial Masyarakat">
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
                                                    src="/assets/images/sosma/keg1.png"
                                                    alt="Sosial Masyarakat BEM SV UNS"
                                                    loading="lazy"
                                                />
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="slider-item">
                                                <img
                                                    src="/assets/images/sosma/keg2.png"
                                                    alt="Tim Sosial Masyarakat"
                                                    loading="lazy"
                                                />
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="slider-item">
                                                <img
                                                    src="/assets/images/sosma/keg3.png"
                                                    alt="Kegiatan Sosial Masyarakat"
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
                                        <h2 className="tf-heading mb60" style={{textAlign: 'left'}}>SOSIAL MASYARAKAT</h2>
                                        <p className="description text-justify">
                                            Kementerian Sosial Masyarakat BEM SV UNS bertugas menjembatani hubungan antara kampus dengan masyarakat sekitar serta mengembangkan kepedulian sosial dan lingkungan di kalangan mahasiswa. Kementerian ini terdiri dari dua direktorat jenderal:
                                        </p>
                                        <ul className="list-style mt-3 mb-4">
                                            <li><strong>Kedirjenan Pengabdian dan Pemberdayaan Masyarakat:</strong> <br /> Bertugas mengembangkan program-program pengabdian dan pemberdayaan masyarakat sekitar kampus sebagai bentuk tanggung jawab sosial mahasiswa.</li>
                                            <li><strong>Kedirjenan Sosial Lingkungan:</strong> <br /> Fokus pada pengembangan kesadaran dan kepedulian mahasiswa terhadap isu-isu sosial dan lingkungan hidup melalui berbagai kegiatan dan kampanye.</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="title mb-2">Sosial Media</h3>
                                        <ul className="social-item list-inline">
                                            <li className="list-inline-item">
                                                <Link
                                                    href="https://www.instagram.com/sosmabemsv_uns"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label="Instagram Sosial Masyarakat BEM SV UNS"
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
                                    <h2 className="heading">PENGURUS INTI SOSIAL MASYARAKAT</h2>
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
                                    <h2 className="heading">STAF KEMENTERIAN <span>SOSIAL MASYARAKAT</span></h2>
                                    <p className="sub-heading">Tim yang bertanggung jawab atas pengembangan hubungan dengan masyarakat serta kepedulian sosial dan lingkungan</p>
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
                                                    <p>Belum ada artikel terkait sosial masyarakat.</p>
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