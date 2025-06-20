import Link from "next/link"

export default function Footer1() {
    return (
        <>
            <footer className="footer">
                <div className="footer-inner">
                    <div className="tf-container">
                        <div className="row">
                            <div className="col-xl-4 col-lg-3 col-md-12">
                                <div className="widget widget-infor">
                                    <div className="logo">
                                        <img id="logo_footer" src="/assets/images/logo/logo-footer.png" alt="BEM SV UNS" />
                                    </div>
                                    <p className="content">BEM SV UNS adalah organisasi mahasiswa yang berkomitmen untuk melayani dan menginspirasi.</p>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-12">
                                <div className="widget widget-menu">
                                    <div className="menu menu-1">
                                        <h6 className="widget-title">NAVIGASI</h6>
                                        <ul>
                                            <li><Link href="/">Beranda</Link></li>
                                            <li><Link href="/tentang">Tentang Kami</Link></li>
                                            <li><Link href="/artikel">Artikel</Link></li>
                                            <li><Link href="/kontak">Kontak</Link></li>
                                        </ul>
                                    </div>
                                    <div className="menu menu-2">
                                        <h6 className="widget-title">LINK PENTING</h6>
                                        <ul>
                                            <li><Link href="https://uns.ac.id/id/">Web UNS</Link></li>
                                            <li><Link href="https://vokasi.uns.ac.id/">Web Vokasi UNS</Link></li>
                                            <li><Link href="https://yanma.vokasi.uns.ac.id/">Web Layanan Vokasi</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bottom-inner">
                    <div className="tf-container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="bottom">
                                    <p className="copy-right">MEDIA KOMUNIKASI BEM SV UNS {new Date().getFullYear()} - Hak Cipta Dilindungi</p>
                                    <ul className="social-item">
                                        <li><Link href="https://twitter.com/BEMSVUNS"><i className="fab fa-twitter" /></Link></li>
                                        <li><Link href="https://instagram.com/bemsvuns"><i className="fab fa-instagram" /></Link></li>
                                        <li><Link href="https://www.youtube.com/@bemsvuns"><i className="fab fa-youtube" /></Link></li>
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
