import GlobalStyle from '../styles';
import useLocalStorageState from "use-local-storage-state"; 

function MyApp({ Component, pageProps }) {

  const [serviceCards] = useLocalStorageState("serviceCards", { defaultValue: [] });

  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} serviceCards={serviceCards} />
    </>
  );
}


export default MyApp;
