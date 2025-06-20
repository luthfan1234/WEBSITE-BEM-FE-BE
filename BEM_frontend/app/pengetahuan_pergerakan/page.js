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
        name: "Veri Nugroho",
        position: "Menteri Pengetahuan dan Pergerakan",
        image: "/assets/images/pp/1.png",
        instagram: "https://www.instagram.com/verinugroho",
    },
    {
        id: 2,
        name: "Nikmah Laisa Fatihah",
        position: "Dirjen Kesetaraan Gender",
        image: "/assets/images/pp/2.png",
        instagram: "https://www.instagram.com/nikmahlaisaf",
    },
    {
        id: 3,
        name: "Jannatika Finna Al Aufa",
        position: "Dirjen Kajian Strategis",
        image: "/assets/images/pp/3.png",
        instagram: "https://www.instagram.com/jannatikafinna",
    },
    {
        id: 4,
        name: "Muhammad Iqbal Saputra",
        position: "Dirjen Aksi Kreatif dan Propaganda",
        image: "/assets/images/pp/4.png",
        instagram: "https://www.instagram.com/iqbalsaputra",
    },
];

const staffData = [
    {
        title: "Kedirjenan Kesetaraan Gender",
        members: [
            { name: "Thyas Auralia", role: null },
            { name: "Greska Wiranatha", role: null },
            { name: "Aurora Chandra", role: null },
            { name: "Arlita Vika Anggraini", role: null },
            { name: "Juniartha Dias Sagita", role: null },
            { name: "Isna Anggrainy", role: null },
        ],
    },
    {
        title: "Kedirjenan Kajian Strategis",
        members: [
            { name: "Khairunnisa Alya Rahmadyani", role: null },
            { name: "Sinta Permata Yuliana", role: null },
            { name: "Azizah Putri Sukmaningrum", role: null },
            { name: "Shinta Dwi Apriliani", role: null },
            { name: "William Saputra D Santos", role: null },
            { name: "Eva Putri Murtiyanto", role: null },
        ],
    },
    {
        title: "Kedirjenan Aksi Kreatif dan Propaganda",
        members: [
            { name: "Wahyu Annisa Laras", role: null },
            { name: "Abring Yazid Ioa", role: null },
            { name: "Irham Dwi Saputra", role: null },
            { name: "Leony Kartika Sari", role: null },
            { name: "Rustam Aji", role: null },
            { name: "Satria Yusuf Nur Fadhlulloh", role: null },
        ],
    },
];

export default function Team() {
    const [relatedArticles, setRelatedArticles] = useState([]);
    const [isLoadingArticles, setIsLoadingArticles] = useState(true);

    useEffect(() => {
        fetchPengetahuanPergerakanArticles();
    }, []);

    const fetchPengetahuanPergerakanArticles = async () => {
        try {
            setIsLoadingArticles(true);
            const allArticles = await articlesApi.getArticles();
            
            // Filter articles by pengetahuan pergerakan tags
            const ppArticles = getArticlesByMinistry(allArticles, 'pengetahuan_pergerakan');
            
            // Get latest 3 articles
            const latestArticles = ppArticles
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(0, 3);
            
            setRelatedArticles(latestArticles);
        } catch (error) {
            console.error('Error fetching pengetahuan pergerakan articles:', error);
            setRelatedArticles([]);
        } finally {
            setIsLoadingArticles(false);
        }
    };

    return (
        <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Pengetahuan dan Pergerakan">
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
                                                    src="/assets/images/pp/keg1.png"
                                                    alt="Pengetahuan dan Pergerakan BEM SV UNS"
                                                    loading="lazy"
                                                />
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="slider-item">
                                                <img
                                                    src="/assets/images/pp/keg2.png"
                                                    alt="Tim Pengetahuan dan Pergerakan"
                                                    loading="lazy"
                                                />
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="slider-item">
                                                <img
                                                    src="/assets/images/pp/keg3.png"
                                                    alt="Kegiatan Pengetahuan dan Pergerakan"
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
                                        <h2 className="tf-heading mb60" style={{textAlign: 'left'}}>PENGETAHUAN DAN PERGERAKAN</h2>
                                        <p className="description text-justify">
                                            Kementerian Pengetahuan dan Pergerakan BEM SV UNS bertugas memfasilitasi pengembangan wawasan dan mendorong aksi nyata mahasiswa dalam merespon isu-isu strategis. Kementerian ini terdiri dari tiga direktorat jenderal:
                                        </p>
                                        <ul className="list-disc list-inside mt-3 mb-4">
                                            <li>
                                                <strong>Kedirjenan Kesetaraan Gender:</strong>
                                                <br />Bertugas mengkaji dan mengadvokasi isu-isu kesetaraan gender di lingkungan kampus dan masyarakat melalui berbagai program dan kampanye.
                                            </li>
                                            <li>
                                                <strong>Kedirjenan Kajian Strategis:</strong>
                                                <br />Fokus pada pengembangan dan diseminasi kajian-kajian strategis terkait isu-isu sosial, politik, ekonomi, dan pendidikan yang relevan dengan konteks mahasiswa.
                                            </li>
                                            <li>
                                                <strong>Kedirjenan Aksi Kreatif dan Propaganda:</strong>
                                                <br />Bertanggung jawab mengembangkan metode kreatif untuk mengkomunikasikan ide, gagasan, dan advokasi kepada mahasiswa dan masyarakat umum.
                                            </li>
                                        </ul>

                                    </div>
                                    <div>
                                        <h3 className="title mb-2">Sosial Media</h3>
                                        <ul className="social-item list-inline">
                                            <li className="list-inline-item">
                                                <Link
                                                    href="https://www.instagram.com/pergerakans"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label="Instagram Pengetahuan dan Pergerakan BEM SV UNS"
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
                                    <h2 className="heading">PENGURUS INTI PENGETAHUAN DAN PERGERAKAN</h2>
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
                                    <h2 className="heading">STAF KEMENTERIAN <span>PENGETAHUAN DAN PERGERAKAN</span></h2>
                                    <p className="sub-heading">Tim yang bertanggung jawab atas pengembangan wawasan dan aksi strategis mahasiswa Sekolah Vokasi UNS</p>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="tf-card-box h-100">
                                    <div className="card-content">
                                        <div className="row">
                                            {staffData.map((bureau, index) => (
                                                <div key={index} className="col-md-4 mb-4">
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
                                                    <p>Belum ada artikel terkait pengetahuan dan pergerakan.</p>
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