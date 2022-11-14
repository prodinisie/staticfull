import Head from "next/head";
// import Footer from "@components/Footer";
import Dashboard from "@components/dashboard";


export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>PIM STATIC</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap" rel="stylesheet" />
      </Head>
      <main>
        <h1>
          DASHBOARD
        </h1>
        <Dashboard />
      </main>
      {/* <Footer /> */}
    </div >
  );
}






// import { GetServerSideProps } from 'next';
// import { withSSRSession, useAuth } from '@frontegg/nextjs';
// export default function MyPage({ products }) {
//   const { user } = useAuth();
//   //baseUrl should be your FRONTEGG_APP_URL from .env.local
//   const baseUrl = 'FRONTEGG_APP_URL'
//   const logout = () => {
//     window.location.href = `${baseUrl}/account/logout`;
//   };
//   return (
//     <div>
//       <h1>My Page</h1>
//       {products}
//       <div>
//         <img src={user?.profilePictureUrl} alt={user?.name} />
//       </div>
//       <div>
//         <span>Logged in as: {user?.name}</span>
//         <div className="container">
//           <Head>
//             <title>PIM STATIC</title>
//             <link rel="icon" href="/favicon.ico" />
//           </Head>
//           <main>
//             <h1>
//               PIM STATIC
//             </h1>
//             <>
//               {
//                 links.map((linky, idx) => {
//                   let d = {
//                     id: idx,
//                     name: linky,
//                   };
//                   return (
//                     <>
//                       <Stack direction="row" spacing={1}>
//                         <Link href={linky} >
//                           <Chip key={d.id} label={d.name} />
//                         </Link>
//                       </Stack>
//                     </>
//                   )
//                 })
//               }
//             </>
//           </main>
//           <Footer />
//         </div >
//       </div>
//       <div>
//         <button onClick={logout}>Log out</button>
//       </div>
//     </div>
//   );
// }
// export const getServerSideProps = withSSRSession(
//   async (context, session) => {
//     //     const { data } = await fetch('{external}/product', {
//     //      headers: {
//     //        Authorization: 'bearer ' + session.accessToken,
//     //      },
//     //    });
//     return { props: {} };
//   }
// );