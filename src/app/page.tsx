"use client"
import { Header, MetaDataCom, ScrollToTop } from "@/components";
import withAuth from "@/hoc/withAuth";
import { Metadata } from "next";

const metadata: Metadata = {
    title: "Home - Beincom",
    description: "This is Home page for Beincom",
};

const Home = () => {
    return <>
        <MetaDataCom
            seoDescription={metadata.description}
            seoTitle={metadata.title}
        />
        <Header />
        <div className="flex flex-row mt-16">
            <div className="sidebar">Home</div>
        </div>
        <ScrollToTop />
    </>
}

export default withAuth(Home)