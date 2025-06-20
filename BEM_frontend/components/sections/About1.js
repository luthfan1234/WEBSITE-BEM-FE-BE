import CounterUp from "../elements/CounterUp"

export default function About2() {
    return (
        <>
            <section className="tf-section tf-about">
                <div className="tf-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="icon">
                                <svg width={208} height={208} viewBox="0 0 208 208" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g filter="url(#filter0_f_2337_5328)">
                                        <path d="M88.0594 196L88.0594 142.485L50.2119 180.333L27.6674 157.788L65.5149 119.941L12 119.941L12 88.0594L65.5149 88.0594L27.6674 50.2119L50.2119 27.6673L88.0594 65.5148L88.0594 12L119.941 12L119.941 65.5149L157.788 27.6673L180.333 50.2119L142.485 88.0594L196 88.0594L196 119.941L142.485 119.941L180.333 157.788L157.788 180.333L119.941 142.485L119.941 196L88.0594 196Z" fill="url(#paint0_linear_2337_5328)" />
                                    </g>
                                    <defs>
                                        <filter id="filter0_f_2337_5328" x={0} y={0} width={208} height={208} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                            <feFlood floodOpacity={0} result="BackgroundImageFix" />
                                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                            <feGaussianBlur stdDeviation={6} result="effect1_foregroundBlur_2337_5328" />
                                        </filter>
                                        <linearGradient id="paint0_linear_2337_5328" x1={196} y1={104} x2={12} y2={104} gradientUnits="userSpaceOnUse">
                                            <stop offset={0} stopColor="var(--primary-color35)" />
                                            <stop offset={1} stopColor="var(--primary-color35)" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                            <div className="icon-2">
                                <svg width={302} height={302} viewBox="0 0 302 302" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g filter="url(#filter0_f_2337_5282)">
                                        <path d="M234.678 38.4808L198.329 110.138L274.714 85.1672L289.589 130.668L213.203 155.638L284.86 191.988L263.205 234.677L191.548 198.328L216.518 274.713L171.018 289.588L146.047 213.202L109.698 284.859L67.0084 263.204L103.358 191.547L26.9721 216.517L12.0979 171.017L88.4837 146.046L16.8268 109.697L38.4818 67.0074L110.139 103.357L85.1682 26.9711L130.669 12.0969L155.639 88.4827L191.989 16.8258L234.678 38.4808Z" fill="url(#paint0_linear_2337_5282)" />
                                    </g>
                                    <defs>
                                        <filter id="filter0_f_2337_5282" x="0.0976562" y="0.0966797" width="301.49" height="301.491" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                            <feFlood floodOpacity={0} result="BackgroundImageFix" />
                                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                            <feGaussianBlur stdDeviation={6} result="effect1_foregroundBlur_2337_5282" />
                                        </filter>
                                        <linearGradient id="paint0_linear_2337_5282" x1="27.6543" y1="88.352" x2="274.032" y2="213.333" gradientUnits="userSpaceOnUse">
                                            <stop offset={0} stopColor="var(--primary-color35)" />
                                            <stop offset={1} stopColor="var(--primary-color35)" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>

                            <div className="tf-heading wow fadeInUp">
                                <h2 className="heading">TENTANG KAMI</h2>
                                <p className="sub-heading">
                                    Badan Eksekutif Mahasiswa Sekolah Vokasi Universitas Sebelas Maret (BEM SV UNS) merupakan organisasi mahasiswa di tingkat sekolah vokasi yang berfungsi sebagai lembaga eksekutif. BEM SV UNS menjadi wadah aspirasi, pengembangan minat dan bakat, serta pelaksana program kerja yang mendukung kemajuan mahasiswa Sekolah Vokasi UNS dalam bidang akademik maupun non-akademik.
                                </p>
                            </div>

                            <div className="counter-wrap wow fadeInUp" data-wow-delay="0.2s">
                                <div className="tf-counter">
                                    <h6>Total Program Kerja</h6>
                                    <div className="content">
                                        <CounterUp count={50} />+
                                    </div>
                                </div>
                                <div className="tf-counter wow fadeInUp" data-wow-delay="0.3s">
                                    <h6>Jumlah Anggota Aktif</h6>
                                    <div className="content">
                                        <CounterUp count={140} />+
                                    </div>
                                </div>
                            </div>

                            {/* STEP CARDS */}
                            <div className="row d-flex flex-wrap">
                                {[
                                    {
                                        number: "01",
                                        title: "Agent of Change",
                                        desc: "Sebagai lembaga yang dinamika, BEM bertindak sebagai penggerak inovasi dan pembaruan, mendorong perubahan positif di lingkungan kampus dan masyarakat."
                                    },
                                    {
                                        number: "02",
                                        title: "FASILITATOR ASPIRASI MAHASISWA",
                                        desc: "BEM berperan sebagai jembatan antara mahasiswa dan pihak kampus, menyampaikan aspirasi dan kebutuhan mahasiswa untuk menciptakan lingkungan akademik yang lebih baik."
                                    },
                                    {
                                        number: "03",
                                        title: "SINERGI ORGANISASI",
                                        desc: "BEM mendorong kolaborasi antar organisasi mahasiswa untuk menciptakan sinergi dalam mencapai tujuan bersama, serta meningkatkan kualitas program kerja yang dihasilkan."
                                    },
                                    {
                                        number: "04",
                                        title: "PENGABDIAN MASYARAKAT",
                                        desc: "BEM berkomitmen untuk melakukan pengabdian kepada masyarakat melalui berbagai program dan kegiatan yang bermanfaat, serta berkontribusi dalam menyelesaikan permasalahan sosial di lingkungan sekitar."
                                    }
                                ].map((item, index) => (
                                    <div key={index} className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12 d-flex">
                                        <div className="tf-step wow fadeInUp h-100 w-100" data-wow-delay={`${0.2 + index * 0.1}s`}>
                                            <div className="step-title">
                                                <div className="sub-number">{item.number}</div>
                                                <h3>{item.title}</h3>
                                            </div>
                                            <p style={{ textAlign: "justify" }}>{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
