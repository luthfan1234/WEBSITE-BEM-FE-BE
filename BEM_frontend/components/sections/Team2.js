import Link from 'next/link';

export default function Team2() {
    const services = [
        { 
            name: "LAPOR PRES...", 
            image: "/assets/images/lapor.png", 
            href: "https://uns.id/Hotline_Ruang_Aman_SV",
            description: "Platform pelaporan aspirasi dan keluhan mahasiswa langsung ke Dekan. Sampaikan suaramu untuk perubahan kampus yang lebih baik." 
        },
        { 
            name: "HOTLINE RUANG AMAN", 
            image: "/assets/images/hotline.png", 
            href: "https://uns.id/Hotline_Ruang_Aman_SV",
            description: "Layanan untuk melaporkan keluhan terkait ruang aman." 
        },
    ];

    return (
        <section className="tf-section team tf-team-ss">
            <div className="icon">
                {/* SVG code stays the same */}
            </div>
            <div className="tf-container">
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="tf-heading mb60 wow fadeInUp">
                            <h2 className="heading">LAYANAN KELUHAN</h2>
                            <p>Silakan pilih layanan keluhan yang ingin Anda laporkan.</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        {services.map((service, index) => (
                            <div key={index} style={{ flex: '0 1 300px', maxWidth: '320px' }}>
                                <Link 
                                    href={service.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="tf-team kementerian-item"
                                    style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
                                >
                                    <div className="image" style={{ borderRadius: "0" }}>
                                        <img src={service.image} alt={service.name} />
                                    </div>
                                    <h4 className="name">
                                        {service.name}
                                    </h4>
                                    <p>{service.description}</p>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
