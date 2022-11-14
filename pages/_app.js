import '@styles/globals.css'
import LabelBottomNavigation from "@components/BottomNavigation";
import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import BreadCrumbs from '@components/BreadCrumbs';
import styles from '../styles/globals.css';
import { Grid } from '@mui/material';
const queryClient = new QueryClient();


export default function CustomApp({ Component, pageProps }) {

  let router = useRouter();
  let { query, pathname } = router;
  let urlPath = pathname.split('/').filter(f => f.length > 0)
  let entityTypeName = urlPath && typeof urlPath !== 'undefined' ? urlPath[0] : '';
  const crumbs = [
    { label: 'PIM', href: '/' },
    { label: entityTypeName, href: '/' + entityTypeName },
  ];

  if (urlPath.length > 1) {
    if (query.id) {
      crumbs.push({
        label: query.id,
        href: '/' + entityTypeName + '/' + query.id
      })
    }
  };


  return (
    <div
      className={styles.main}
    >
      <QueryClientProvider client={queryClient}>
        <br />
        <div
          style={{
            paddingLeft: '1rem',
          }}
        >

          <BreadCrumbs
            crumbs={crumbs}
          />
        </div>
        <br />
        <br />
        <Component {...pageProps} />
        <LabelBottomNavigation />
      </QueryClientProvider>
    </div>
  )
}

// import { withFronteggApp } from '@frontegg/nextjs';
// export default withFronteggApp(CustomApp,
//   {
//     hostedLoginBox: false,
//     authOptions: {
//       // keepSessionAlive: true // Uncomment this in order to maintain the session alive
//     }
//   });


