type PageProps = {};

// dynamicParams by default is true - if you want to prerender part of your most popular e-commerce pages and allow access to other pages by demand
// export const dynamicParams = false; // if you are working with something like blog and you want to prerender all of your pages by generateStaticParams. Returns 404 if you try to access pages that doesn't exist

// Streaming with Suspense only in server components with force-dynamic

// import "server-only"; by npm i server-only to prevent importing server only functions to client components

export default function Page({}: PageProps) {
  return <></>;
}
