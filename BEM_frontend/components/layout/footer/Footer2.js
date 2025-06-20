import Link from "next/link"

export default function Footer2() {
    return (
        <>
            <footer className="footer style-2">
                <div className="footer-inner">
                    <div className="tf-container">
                        <div className="row">
                            <div className="col-md-12">
                                <h2 className="title">BADAN EKSEKUTIF MAHASISWA</h2>
                                <p className="content">Sekolah Vokasi Universitas Sebelas Maret</p>
                                <div className="group-btn">
                                    <Link href="/contact" className="tf-button">HUBUNGI KAMI</Link>
                                </div>
                                <ul className="social-item">
                                    <li><Link href="#"><i className="fab fa-instagram" /></Link></li>
                                    <li><Link href="#"><i className="fab fa-twitter" /></Link></li>
                                    <li><Link href="#"><i className="fab fa-youtube" /></Link></li>
                                    <li><Link href="#"><i className="fab fa-linkedin" /></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bottom-inner">
                    <div className="tf-container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="bottom">
                                    <div className="content-left">
                                        <img src="/assets/images/logo/logo-bottom.png" alt="BEM SV UNS Logo" />
                                        <p className="copy-right">BEM SV UNS {new Date().getFullYear()} - Hak Cipta Dilindungi</p>
                                    </div>
                                    <ul className="menu-bottom">
                                        <li><Link href="/">Beranda</Link></li>
                                        <li><Link href="/about">Tentang Kami</Link></li>
                                        <li><Link href="/program">Program Kerja</Link></li>
                                        <li><Link href="/team">Struktur Organisasi</Link></li>
                                        <li><Link href="/faq">FAQ</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}
