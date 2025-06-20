
import Layout from "@/components/layout/Layout"

import About1 from "@/components/sections/About1"
import Faq2 from "@/components/sections/Faq2"
import Slider2 from "@/components/sections/Slider2"
import Team3 from "@/components/sections/Team3"
import Blog from "@/components/sections/Blog"
export default function Home() {

    return (
        <>

            <Layout headerStyle={1} footerStyle={1}>
                <Slider2 />
                <About1 />
                <Team3 />
                <Blog />
                <Faq2 />
            </Layout>
        </>
    )
}