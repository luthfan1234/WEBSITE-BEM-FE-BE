import { Poppins, Bakbak_One } from 'next/font/google'
import "/public/assets/css/style.css"
import "/public/assets/css/responsive.css"
import "/public/assets/css/artikel-filter.css"
import "/public/assets/css/admin-form.css"
import { AuthProvider } from '@/contexts/AuthContext';

const poppins = Poppins({
    weight: ['300', '400', '500', '600', '700'],
    subsets: ['latin'],
    variable: "--poppins",
    display: 'swap',
});
const bakbak = Bakbak_One({
    weight: ['400'],
    subsets: ['latin'],
    variable: "--bakbak",
    display: 'swap',
});

export const metadata = {
    title: 'BEM SV | Official Website',
    description: 'Official website of BEM SV UNS, built with Next.js',
    icons: {
        icon: '/assets/images/logo.png',
        shortcut: '/assets/images/logo.png',
    }
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${poppins.variable} ${bakbak.variable} body header-fixed`}>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </body>
        </html>
    );
}