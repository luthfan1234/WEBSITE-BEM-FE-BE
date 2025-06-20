'use client'
import { useState } from 'react'
export default function Accordion1() {
    const [isActive, setIsActive] = useState(1)

    const handleClick = (key) => {
        setIsActive(prevState => prevState === key ? null : key)
    }
    return (
        <>
            <div className="tf-flat-accordion2">
                <div className="flat-toggle2 active">
                    <h6  className={isActive === 1 ? "toggle-title active" : "toggle-title"} onClick={() => handleClick(1)}>Apa itu BEM SV UNS?</h6>
                    <div className="toggle-content" style={{ display: `${isActive === 1 ? "block" : "none"}` }}>
                        <p>BEM SV UNS adalah Badan Eksekutif Mahasiswa di lingkungan Sekolah Vokasi Universitas Sebelas Maret yang berperan sebagai organisasi kemahasiswaan tingkat sekolah untuk menampung aspirasi, mengembangkan potensi, serta menyelenggarakan program kerja akademik dan non-akademik.
                        </p>
                    </div>
                </div>
                <div className="flat-toggle2">
                    <h6  className={isActive === 2 ? "toggle-title active" : "toggle-title"} onClick={() => handleClick(2)}>Apa arti dari Abhinama Jayakarsa?</h6>
                    <div className="toggle-content" style={{ display: `${isActive === 2 ? "block" : "none"}` }}>
                        <p>Urna vitae erat et lacus, consectetur ac nulla vestibulum lobortis. Nulla dapibus urna volutpat venenatis, risus faucibus.
                        </p>
                    </div>
                </div>
                <div className="flat-toggle2">
                    <h6  className={isActive === 3 ? "toggle-title active" : "toggle-title"} onClick={() => handleClick(3)}>Apakah BEM SV UNS terbuka untuk kolaborasi eksternal?</h6>
                    <div className="toggle-content" style={{ display: `${isActive === 3 ? "block" : "none"}` }}>
                        <p>Ya, BEM SV UNS membuka peluang kolaborasi dengan organisasi mahasiswa, UKM, instansi kampus, maupun mitra eksternal dalam berbagai bidang seperti kegiatan sosial, edukasi, kewirausahaan, dan lain-lain.
                        </p>
                    </div>
                </div>
                 <div className="flat-toggle2">
                    <h6  className={isActive === 4 ? "toggle-title active" : "toggle-title"} onClick={() => handleClick(4)}>Bagaimana cara menyampaikan aspirasi ke BEM?</h6>
                    <div className="toggle-content" style={{ display: `${isActive === 4 ? "block" : "none"}` }}>
                        <p>Mahasiswa dapat menyampaikan aspirasi melalui kotak aspirasi yang tersedia di sekretariat BEM SV UNS, melalui formulir online di website resmi, atau melalui direct message di media sosial resmi BEM SV UNS.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
