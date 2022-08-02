import { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import '../styles/globals.css';
function App({ Component, pageProps }: AppProps) {
  
  const [render, SetRender] = useState(false)
    
  useEffect(() => {
    SetRender(typeof window !== 'undefined')
  }, [])

  return (
    <div suppressHydrationWarning>
      {render && <Component {...pageProps} />}
    </div>
  );
}
export default App;
