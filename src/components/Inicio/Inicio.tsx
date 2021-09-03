import { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';

const Inicio = () => {
  interface urlShort {
    url?: string;
  }

  const [urlLong, setUrlLong] = useState<string>('');
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [urlShort, setUrlShort] = useState<urlShort>({});
  const [loader, setLoader] = useState(false);
  const [visible, setVisible] = useState(true);

  const token: string = '144623f32ea1b53c4af93ae22c9fa7d0a5d949d0';
  const urlFetch: string = ' https://api-ssl.bitly.com/v4/shorten';

  useEffect(() => {
    if (urlShort.url) {
      setLoader(false);
    }
  }, [urlShort.url]);

  const changeUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      const regex = /^(https?:\/\/)(\w{3,}).+\.(\w{2,}).*/gm;
      if (e.target.value.trim() !== '' && regex.test(e.target.value)) {
        setButtonDisabled(false);
        setUrlLong(e.target.value);
      } else {
        setButtonDisabled(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const pruebaFetch = async (): Promise<void> => {
    setLoader(true);
    const config = {
      method: 'POST',
      body: JSON.stringify({
        long_url: urlLong,
        domain: 'bit.ly',
      }),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(urlFetch, config);
    const data = await response.json();
    setVisible(true);
    setUrlShort({ url: await data.link });
    setLoader(false);
  };

  const closeModal = () => {
    setVisible(false);
    setLoader(false);
  };

  return (
    <div>
      <h1>Ingresa el Link</h1>
      <br />
      <input
        type='text'
        placeholder='https://www.ejemplo.com/pagine1/archive/proyec/'
        onChange={changeUrl}
      />
      <button disabled={buttonDisabled} onClick={pruebaFetch}>
        Acortar Link
      </button>
      <button onClick={closeModal}>Cerrar</button>
      {loader ? (
        <Loader />
      ) : urlShort.url && visible ? (
        <Modal link={urlShort.url} />
      ) : null}
    </div>
  );
};

export default Inicio;
