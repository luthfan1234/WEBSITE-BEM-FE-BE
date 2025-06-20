import Link from 'next/link';


export default function Team3() {
    return (
        <section className="tf-section team tf-team-ss">
            <div className="icon">
                {/* SVG code stays the same */}
            </div>
            <div className="tf-container">
                <div className="row justify-content-center">
                    <div className="col-md-12 ">
                        <div className="tf-heading mb60 wow fadeInUp">
                            <h2 className="heading">KEMENTERIAN</h2>
                        </div>
                    </div>
                    {[
                        { name: "MANAJEMEN KABINET", image: "/assets/images/logo_kementerian/MENKAB.PNG", href: "/manajemen_kabinet" },
                        { name: "POSDM", image: "/assets/images/logo_kementerian/POSDM.PNG", href: "/posdm" },
                        { name: "KEMAHASISWAAN", image: "/assets/images/logo_kementerian/KEMAHASISWAAN.PNG", href: "/kemahasiswaan" },
                        { name: "RELASI DAN JEJARING", image: "/assets/images/logo_kementerian/RELASI.PNG", href: "/relasi_jejaring" },
                        { name: "SOSIAL MASYARAKAT", image: "/assets/images/logo_kementerian/SOSMA.PNG", href: "/sosial_masyarakat" },
                        { name: "PENGETAHUAAN DAN PERGERAKAN", image: "/assets/images/logo_kementerian/PP.PNG", href: "/pengetahuan_pergerakan" },
                        { name: "MEDIA DAN KOMUNIKASI", image: "/assets/images/logo_kementerian/MEDKOM.PNG", href: "/media_komunikasi" },
                    ].map((team, index) => (
                        <div key={index} className="col-lg-3 col-md-3 col-sm-5 col-12 ">
                            <div className="tf-team kementerian-item" >
                                <div className="image" style={{ borderRadius: "0" }}>
                                    <img src={team.image} alt={team.name} />
                                </div>
                                <h4 className="name">
                                    <Link href={team.href} className="kementerian-link">
                                        {team.name}
                                    </Link>
                                </h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
