//import { useState } from 'react';
import App from 'next/app';
import GlobalStyle from '../styles';
import useLocalStorageState from "use-local-storage-state"; 

function MyApp({ Component, pageProps }) {
  const [serviceCards, setServiceCards] = useLocalStorageState("serviceCards", { defaultValue: [] });

  const handleServiceCardsChange = (newServiceCards) => {
    setServiceCards(newServiceCards);
  };

  return (
    <>
      <GlobalStyle /> {/* Hier werden deine globalen Stile gerendert */}
      <Component {...pageProps} serviceCards={serviceCards} onServiceCardsChange={handleServiceCardsChange} />
    </>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default MyApp;
