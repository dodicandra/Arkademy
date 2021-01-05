import React, { useCallback, useEffect } from 'react';

import axios from 'axios';
import dayjs from 'dayjs';
import relative from 'dayjs/plugin/relativeTime';

import { EditIcon } from '@chakra-ui/icons';
import {
  Box, Button, Container,
  Heading, IconButton, Text,
} from '@chakra-ui/react';

import Forms from '../components/Forms';
import { useProduk } from '../hooks/Provider';
import { format } from '../utils/fromatNumber';

dayjs.extend(relative);

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
        <Box
          paddingLeft="3"
          paddingRight="3"
          paddingTop="1"
          paddingBottom="1"
          borderRadius="md"
          margin="5"
          bg="teal.300"
          key={val?.id_produk}
        >
          <Heading>{val?.namaProduk}</Heading>
          <Text letterSpacing="1.5" fontSize="2xl">
            {val?.keterangan}
          </Text>
          <Box d="flex" flexDirection="row">
            <Text margin="2">Rp - {format(val?.harga.toString()!)}</Text>
            <Text margin="2">Stok {val?.jumlah}</Text>
          </Box>
          <Box d="flex" justifyContent="space-between" flexDirection="row">
            <Box p="3">
              <Text fontSize="xs">{dayjs(val?.createdAt).fromNow()}</Text>
            </Box>
            <Box>
              <IconButton
                onClick={() => dispatch({ type: 'set-form-instan', payload: val! })}
                marginRight="6"
                aria-label="edit button"
                variant="outline"
                icon={<EditIcon />}
              />
              <Button onClick={() => delet(val?.id_produk!)} colorScheme="red" size="md">
                Delet
              </Button>
            </Box>
          </Box>
        </Box>
      ))}
    </Container>
  );
};
export default Home;
