import React, { useState } from 'react'
import Link from 'next/link'

function Footer() {
    const [logoError, setLogoError] = useState(false);

    return (
        <>
            <footer className="footer">
                {/* ...existing code... */}
                <div className="footer-bottom">
                    <div className="tf-container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="content-footer-bottom">
                                    <div className="logo-footer">
                                        {logoError ? (
                                            <div className="text-white fs-4 fw-bold">BEM SV UNS</div>
                                        ) : (
                                            <img 
                                                src="/assets/images/logo/logo-footer.png" 
                                                alt="Logo BEM SV UNS"
                                                onError={() => setLogoError(true)}
                                            />
                                        )}
                                    </div>
                                    {/* ...existing code... */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer