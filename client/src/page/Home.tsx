import React, { useCallback, useEffect } from 'react';

import axios from 'axios';
import { useHistory } from 'react-router-dom';

import { Container } from '@chakra-ui/react';

import Card from '../components/Card';
import Forms from '../components/Forms';
import { useProduk } from '../hooks/Provider';

interface HomeProps {}

export type ProdukType = {
  namaProduk: string;
  id_produk: string;
  keterangan: string;
  harga: number;
  jumlah: number;
  createdAt?: string | Date;
};

const Home: React.FC<HomeProps> = () => {
  const { dispatch, state } = useProduk();

  let history = useHistory();

  const getDataProduk = useCallback(async () => {
    try {
      const respon = await axios.get<{ produk: ProdukType[] }>('/produk');
      dispatch({ type: 'set-produk', payload: respon.data.produk });
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);

  const delet = useCallback(
    async (id: string) => {
      try {
        await axios.delete('/produk/delet', { data: { id_produk: id } });
        dispatch({ type: 'delet-item', id: id });
      } catch (err) {
        console.log(err);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    getDataProduk();
  }, [getDataProduk]);

  return (
    <Container maxW="xl">
      <Forms onComplete={getDataProduk} />
      {state.produks?.map((val) => (
        <Card
          data={val!}
          key={val?.id_produk}
          onClickEdit={() => history.push({ pathname: `/produk/${val?.id_produk}/edit`, state: { ...val } })}
          onDelet={() => delet(val?.id_produk!)}
        />
      ))}
    </Container>
  );
};
export default Home;
