import React, { useCallback, useEffect } from 'react';

import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

import {
  Button, Container, Input,
  NumberInput, NumberInputField,
} from '@chakra-ui/react';

import Card from '../components/Card';
import { useProduk } from '../hooks/Provider';
import { ProdukType } from './Home';

interface EditPageProps {}

const EditPage: React.FC<EditPageProps> = () => {
  const param = useParams<{ id: string }>();
  const { dispatch, state } = useProduk();

  const {
    location: { state: produk },
    goBack,
  } = useHistory<ProdukType>();

  const onSubmit = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      try {
        await axios.put('/produk/update', { ...state.produk, id_produk: param.id });
        dispatch({ type: 'reset-form' });
        goBack();
      } catch (err) {
        console.log(err);
      }
    },
    [dispatch, goBack, param.id, state.produk]
  );

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: 'set-form', payload: event.currentTarget.value, name: event.currentTarget.name });
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch({ type: 'set-form-instan', payload: produk });
  }, [dispatch, produk]);

  return (
    <Container>
      <Card data={produk} />
      <Container margin="10" centerContent>
        <form>
          <Input
            value={state.produk.namaProduk}
            name="namaProduk"
            onChange={onChange}
            marginBottom="2"
            placeholder="nama produk"
          />
          <Input
            value={state.produk.keterangan}
            name="keterangan"
            marginBottom="2"
            onChange={onChange}
            placeholder="keterangan"
          />
          <NumberInput value={state.produk.harga?.toString()} marginBottom="2">
            <NumberInputField onChange={onChange} name="harga" placeholder="harga" />
          </NumberInput>
          <NumberInput value={state.produk.jumlah?.toString()} size="md" min={0} marginBottom="2">
            <NumberInputField name="jumlah" onChange={onChange} placeholder="jumlah" />
          </NumberInput>
          <Button onClick={onSubmit} type="button" colorScheme="teal" size="md">
            save
          </Button>
        </form>
      </Container>
    </Container>
  );
};
export default EditPage;
