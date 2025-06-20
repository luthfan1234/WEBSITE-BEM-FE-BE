import Layout from "@/components/layout/Layout"
export default function Contact() {

    return (
        <>

            <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="HUBUNGI KAMI">
                <section className="tf-contact ">
                    <div className="tf-container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="tf-infor-wrap">
                                    <div className="tf-infor">
                                        <div className="icon">
                                            <img src="/assets/images/svg/location.svg" alt="Image" />
                                        </div>
                                        <h3 className="title">Lokasi</h3>
                                        <a href="https://goo.gl/maps/xyz" className="btn-call">Jalan Kolonel Sutarto Nomor 150K, Jebres, Surakarta City, Central Java 57126</a>
                                    </div>
                                    <div className="tf-infor">
                                        <div className="icon">
                                            <img src="/assets/images/svg/email.svg" alt="Image" />
                                        </div>
                                        <h3 className="title">Email</h3>
                                        <a href="mailto:bemsvuns@gmail.com" className="btn-call">bemsvuns@gmail.com</a>
                                    </div>
                                    <div className="tf-infor">
                                        <div className="icon">
                                            <img src="/assets/images/svg/phone.svg" alt="Image" />
                                        </div>
                                        <h3 className="title">Telepon</h3>
                                        <a href="https://wa.me/6285129999462" className="btn-call">+62 851-2999-9462</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-xl-6 col-lg-8 col-md-9">
                                <div className="tf-heading">
                                    <h2 className="heading">Hubungi Kami</h2>
                                    <p className="sub-heading">Jika ada pertanyaan, jangan ragu untuk menghubungi kami</p>
                                </div>
                                <form action="/contact/contact-process.php" method="post" id="commentform" className="comment-form">
                                    <div className="form-inner">
                                        <fieldset className="name">
                                            <input type="text" id="name" placeholder="Nama" className="tb-my-input" name="name" tabIndex={2} aria-required="true" required />
                                        </fieldset>
                                        <fieldset className="email">
                                            <input type="email" id="email" placeholder="Masukkan email Anda" className="tb-my-input" name="email" tabIndex={2} aria-required="true" required />
                                        </fieldset>
                                        <fieldset className="phone">
                                            <input type="tel" id="phone" placeholder="Nomor Telepon" className="tb-my-input" name="phone" tabIndex={2} aria-required="true" required />
                                        </fieldset>
                                        <fieldset className="message">
                                            <textarea id="message" name="message" rows={4} placeholder="Pesan" tabIndex={4} aria-required="true" required />
                                        </fieldset>
                                    </div>
                                    <div className="btn-submit"><button className="tf-button style-2" type="submit">KIRIM PESAN</button></div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

            </Layout>
        </>
    )
}
