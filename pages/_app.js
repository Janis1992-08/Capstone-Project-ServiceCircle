import GlobalStyle from '../styles';
import useLocalStorageState from "use-local-storage-state"; 


export default function MyApp({ Component, pageProps }) {

  const [serviceCards, setServiceCards] = useLocalStorageState("serviceCards", { defaultValue: [] });

  function handleServiceCards(newServiceCard) {
    setServiceCards((prevServiceCards) => [...prevServiceCards, newServiceCard]);
  };

  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} serviceCards={serviceCards} handleServiceCards={handleServiceCards} />
    </>
  );
}
