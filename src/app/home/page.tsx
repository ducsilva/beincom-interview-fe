"use client";

import withAuth from "@/hoc/withAuth";

const Home = () => {

    return (
        <div className="mt-16">
            Home
        </div>
    );
};

export default withAuth(Home)