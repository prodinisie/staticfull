// import { withFronteggApp } from '@frontegg/nextjs';
import '@styles/globals.css'
import LabelBottomNavigation from "@components/BottomNavigation";

export default function CustomApp({ Component, pageProps }) {
  return (<>
    <Component {...pageProps} />
    <LabelBottomNavigation />
  </>
  )


}

// export default withFronteggApp(CustomApp,
//   {
//     hostedLoginBox: false,
//     authOptions: {
//       // keepSessionAlive: true // Uncomment this in order to maintain the session alive
//     }
//   });


