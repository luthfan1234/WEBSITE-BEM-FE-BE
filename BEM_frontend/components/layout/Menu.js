'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Menu() {
    const pathname = usePathname()
    const [currentMenuItem, setCurrentMenuItem] = useState("")

    useEffect(() => {
        setCurrentMenuItem(pathname)
    }, [pathname])

    const checkCurrentMenuItem = (path) => currentMenuItem === path ? "current-menu-item" : ""
    const checkParentActive = (paths) => paths.some(path => currentMenuItem.startsWith(path)) ? "current-menu-item" : ""

    return (
        <>
            <ul id="menu-primary-menu" className="menu">
                <li className={`menu-item ${checkCurrentMenuItem("/")}`}>
                    <Link href="/">BERANDA</Link>
                </li>
                
                <li className={`menu-item ${checkCurrentMenuItem("/tentang-kami")}`}>
                    <Link href="/tentang-kami">TENTANG KAMI</Link>
                </li>
                
                <li className={`menu-item menu-item-has-children ${checkParentActive([
                    "/kemahasiswaan", 
                    "/pengetahuan_pergerakan", 
                    "/media_komunikasi", 
                    "/sosial_masyarakat", 
                    "/relasi_jejaring", 
                    "/posdm",
                    "/manajemen_kabinet",
                    "/posdm"
                ])}`}>
                    <Link href="#">KEMENTERIAN</Link>
                    <ul className="sub-menu">
                        <li className={`menu-item ${checkCurrentMenuItem("/manajemen_kabinet")}`}>
                            <Link href="/manajemen_kabinet">MANAJEMEN KABINET</Link>
                        </li>
                        <li className={`menu-item ${checkCurrentMenuItem("/posdm")}`}>
                            <Link href="/posdm">POSDM</Link>
                        </li>
                        <li className={`menu-item ${checkCurrentMenuItem("/kemahasiswaan")}`}>
                            <Link href="/kemahasiswaan">KEMAHASISWAAN</Link>
                        </li>
                        <li className={`menu-item ${checkCurrentMenuItem("/relasi_jejaring")}`}>
                            <Link href="/relasi_jejaring">RELASI & JEJARING</Link>
                        </li>
                        <li className={`menu-item ${checkCurrentMenuItem("/sosial_masyarakat")}`}>
                            <Link href="/sosial_masyarakat">SOSIAL MASYARAKAT</Link>
                        </li>
                         <li className={`menu-item ${checkCurrentMenuItem("/pengetahuan_pergerakan")}`}>
                            <Link href="/pengetahuan_pergerakan">PENGETAHUAN & PERGERAKAN</Link>
                        </li>
                        <li className={`menu-item ${checkCurrentMenuItem("/media_komunikasi")}`}>
                            <Link href="/media_komunikasi">MEDIA & KOMUNIKASI</Link>
                        </li>
                    </ul>
                </li>
                
                <li className={`menu-item ${checkCurrentMenuItem("/artikel")}`}>
                    <Link href="/artikel">ARTIKEL</Link>
                </li>
                
                <li className={`menu-item ${checkCurrentMenuItem("/kontak")}`}>
                    <Link href="/kontak">KONTAK</Link>
                </li>
            </ul>
        </>
    )
}

