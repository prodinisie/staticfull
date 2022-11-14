import Head from "next/head";
// import Footer from "@components/Footer";
import Dashboard from "@components/dashboard";
import BackgroundVideo from "@components/BackgroundVideo";
import { motion } from "framer-motion"
import React from "react";




export default function Home() {


  const [x, setX] = React.useState('0%');

  // React.useEffect(() => {
  //   setTimeout(() => {
  //     console.log('setting x to new value');
  //     setX('50%');
  //   }, 3000)
  // }, []);

  return (
    <div className="container">
      <Head>
        <title>PIM STATIC</title>
      </Head>

      <div style={{ top: 0 }}>


        <motion.div
          style={{
            display: 'flex',
            // top: '0px',
            // justifyContent: 'flex-start',
            alignItems: 'center',
            height: '400px',
            width: '100%',
            paddingLeft: '0%',
            position: 'absolute',
          }}
          layout
          transition={{ duration: 4 }}
          animate={{ paddingLeft: '33%' }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: '5rem',
              fontWeight: 800,
              letterSpacing: 18,
              color: 'rgb(80 80 80 / 0%)',
              // boxShadow: '1,2,3',
              borderRadius: '0%',
              zIndex: 99999,
              backgroundColor: 'rgb(20 20 20 / 82%)',
            }}
          >DDASHBOARDD
          </div>
        </motion.div>



        <motion.div
          style={{
            display: 'flex',
            // justifyContent: 'flex-start',
            // top: '0px',
            alignItems: 'center',
            height: '400px',
            width: '100%',
            position: 'absolute',
            paddingLeft: '0%',
          }}
          layout
          transition={{ duration: 4.5 }}
          animate={{ paddingLeft: '40%' }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: '5rem',
              fontWeight: 800,
              letterSpacing: 18,
              color: 'white',
              zIndex: 99999,
            }}
          >
            DASHBOARD
          </div>
        </motion.div>

        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '400px',
            top: '0px',
          }}
        >
          <BackgroundVideo />
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '400px',
            width: '100%',
            // position: 'absolute',
            paddingLeft: '0%',
          }}></div>
      </div >



      <div
        style={{
          width: '100%',
          position: 'relative',
        }}
      >
        <div
          style={{
            zIndex: 99999,
            width: '100%',
          }}
        >

          <Dashboard />

          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
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