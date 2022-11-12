import '@styles/globals.css'
import LabelBottomNavigation from "@components/BottomNavigation";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

const queryClient = new QueryClient()

export default function CustomApp({ Component, pageProps }) {
  return (<>
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <LabelBottomNavigation />
    </QueryClientProvider>
  </>
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


