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
                <div className="flat-toggle2">
                    <h6 className={`toggle-title ${isActive === 1 ? "active" : ""}`} onClick={() => handleClick(1)}>
                        Apa itu BEM SV UNS?
                    </h6>
                    <div className="toggle-content text-justify" style={{ display: isActive === 1 ? "block" : "none" }}>
                        <p>
                            BEM SV UNS adalah Badan Eksekutif Mahasiswa di lingkungan Sekolah Vokasi Universitas Sebelas Maret yang berperan sebagai organisasi kemahasiswaan tingkat sekolah untuk menampung aspirasi, mengembangkan potensi, serta menyelenggarakan program kerja akademik dan non-akademik.
                        </p>
                    </div>
                </div>
                <div className="flat-toggle2">
                    <h6 className={`toggle-title ${isActive === 2 ? "active" : ""}`} onClick={() => handleClick(2)}>
                        Apa arti dari Abhinama Jayakarsa?
                    </h6>
                    <div className="toggle-content text-justify" style={{ display: isActive === 2 ? "block" : "none" }}>
                        <p>
                            <strong>Abhinama</strong>: Mempunyai harapan yang tinggi demi meningkatkan visi dan misi dari BEM Sekolah Vokasi supaya lebih unggul<br/>
                            <strong>Jayakarsa</strong>: Menuju Sekolah Vokasi yang jaya dan rukun satu sama lain demi menciptakan kebahagiaan dan kegembiraan
                        </p>
                    </div>
                </div>
                <div className="flat-toggle2">
                    <h6 className={`toggle-title ${isActive === 3 ? "active" : ""}`} onClick={() => handleClick(3)}>
                        Apakah BEM SV UNS terbuka untuk kolaborasi eksternal?
                    </h6>
                    <div className="toggle-content text-justify" style={{ display: isActive === 3 ? "block" : "none" }}>
                        <p>
                            Ya, BEM SV UNS membuka peluang kolaborasi dengan organisasi mahasiswa, UKM, instansi kampus, maupun mitra eksternal dalam berbagai bidang seperti kegiatan sosial, edukasi, kewirausahaan, dan lain-lain.
                        </p>
                    </div>
                </div>
                <div className="flat-toggle2">
                    <h6 className={`toggle-title ${isActive === 4 ? "active" : ""}`} onClick={() => handleClick(4)}>
                        Bagaimana cara menyampaikan aspirasi ke BEM?
                    </h6>
                    <div className="toggle-content text-justify" style={{ display: isActive === 4 ? "block" : "none" }}>
                        <p>
                            Mahasiswa dapat menyampaikan aspirasi melalui pengurus BEM SV UNS, melalui formulir online di website resmi, atau melalui direct message di media sosial resmi BEM SV UNS.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
