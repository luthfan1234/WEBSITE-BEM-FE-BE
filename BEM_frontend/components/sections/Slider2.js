'use client'
import Link from "next/link"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    loop: true,
    slidesPerView: 1,
    spaceBetween: 0,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    speed: 1000,
    effect: "fadeInRight",
}

export default function Slider2() {
    return (
        <>
            <section className="tf-slider home2">
                <div className="swiper-container slider-home-2 ">
                    <Swiper {...swiperOptions} className="swiper-wrapper">
                        <SwiperSlide>
                            <div className="slider-item">
                                <div className="tf-slider-item style-2">
                                    <div className="overlay"><img src="/assets/images/slider/slider2.png" alt="BEM SV UNS" /></div>
                                    <div className="content-inner">
                                        <h1 className="tf-heading mb60 d-none d-md-block">BEM SV UNS 2025</h1>
                                        <h2 className="tf-heading d-md-none">BEM SV UNS 2025</h2>
                                        <p className="sub-heading">Badan Eksekutif Mahasiswa Sekolah Vokasi Universitas Sebelas Maret</p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="slider-item">
                                <div className="tf-slider-item style-2">
                                    <div className="overlay"><img src="/assets/images/slider/slider1.png" alt="BEM SV UNS" /></div>
                                    <div className="content-inner">
                                        <h1 className="tf-heading mb60 d-none d-md-block">SUARA MAHASISWA</h1>
                                        <h2 className="tf-heading d-md-none">SUARA MAHASISWA</h2>
                                        <p className="sub-heading">Menjadi Wadah Aspirasi dan Pengembangan Potensi Mahasiswa Sekolah Vokasi</p>
                                        <div className="btn-slider ">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </section>
        </>
    )
}
