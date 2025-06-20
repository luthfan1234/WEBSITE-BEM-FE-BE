import { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '@/services/api';

export default function Collection2() {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await api.getDepartments();
                setDepartments(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load departments');
                setLoading(false);
                console.error('Error fetching departments:', err);
            }
        };

        fetchDepartments();
    }, []);

    if (loading) return <div>Loading departments...</div>;
    if (error) return <div>{error}</div>;

    // If API fails, fallback to static data
    const departmentData = departments.length > 0 ? departments : [
        {
            id: 1,
            name: 'Sekretariat Kabinet',
            description: 'Mengelola administrasi dan koordinasi antar kementerian',
            image: '/assets/images/departments/sekretariat.jpg'
        },
        {
            id: 2,
            name: 'Kementerian Keuangan',
            description: 'Mengelola keuangan dan perencanaan anggaran organisasi',
            image: '/assets/images/departments/keuangan.jpg'
        },
        {
            id: 3,
            name: 'Kementerian Kominfo',
            description: 'Mengelola komunikasi dan informasi organisasi ke publik',
            image: '/assets/images/departments/kominfo.jpg'
        },
        {
            id: 4,
            name: 'Kementerian PSDM',
            description: 'Mengelola pengembangan sumber daya mahasiswa',
            image: '/assets/images/departments/psdm.jpg'
        },
        {
            id: 5,
            name: 'Kementerian Sosmas',
            description: 'Mengelola program pengabdian dan pemberdayaan masyarakat',
            image: '/assets/images/departments/sosmas.jpg'
        },
        {
            id: 6,
            name: 'Kementerian Adkesma',
            description: 'Mengelola advokasi dan kesejahteraan mahasiswa',
            image: '/assets/images/departments/adkesma.jpg'
        },
    ];

    return (
        <>
            <section className="tf-collection tf-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="tf-heading mb40 wow fadeInUp">
                                <h2 className="heading">KEMENTERIAN & DEPARTEMEN</h2>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="collection-wrapper">
                                {departmentData.map((dept, index) => (
                                    <div key={dept.id} className="collection-item wow fadeInUp" data-wow-delay={`0.${index + 1}s`}>
                                        <div className="collection-inner">
                                            <div className="collection-image">
                                                <img src={dept.image} alt={dept.name} />
                                            </div>
                                            <div className="collection-content">
                                                <h5 className="title"><Link href={`/department/${dept.id}`}>{dept.name}</Link></h5>
                                                <p>{dept.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
