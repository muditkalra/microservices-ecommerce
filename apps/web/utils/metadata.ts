import type { Metadata } from "next";

export const baseMetadata: Metadata = {
    title: "Bazaar | Shopping App",
    description: "Bazaar is a next-generation, microservices-based e-commerce platform built using multiple frameworks and databases, all orchestrated with a Turborepo monorepo",
    keywords: ["Ecommerce", "microservices","kafka", "distributed system","nextjs","express","hono","fastify"],
    authors: [{ name: "Mudit kalra" }],
    creator: "Mudit kalra",
    manifest: '/manifest.json',
    // Open Graph
    openGraph: {
        title: "Bazaar | Shopping App",
        description: "Bazaar is a next-generation, microservices-based e-commerce platform built using multiple frameworks and databases, all orchestrated with a Turborepo monorepo",
        url: "https://microservices-ecommerce-web.vercel.app",
        siteName: "bazaar",
        images: [
            {
                url: "/og/og-image.png",
                width: 1200,
                height: 630,
                alt: "bazaar preview",
            },
        ],
        locale: "en_IN",
        type: "website",
    },

    // Twitter
    twitter: {
        card: "summary_large_image",
        title: "Bazaar | Shopping App",
        description: "Bazaar is a next-generation, microservices-based e-commerce platform built using multiple frameworks and databases, all orchestrated with a Turborepo monorepo",
        images: ["/og/og-image.png"], 
    },

    // Search Engine Bot Instructions
    robots: {
        index: true,
        follow: true,
    },
};