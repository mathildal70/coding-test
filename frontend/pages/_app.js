import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Import Bootstrap JS only in the browser
    import('bootstrap/dist/js/bootstrap.bundle.min');
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
