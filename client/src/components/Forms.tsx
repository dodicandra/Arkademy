import React, { useCallback } from 'react';

import axios from 'axios';

import {
  Button, Container, Input,
  NumberInput, NumberInputField,
} from '@chakra-ui/react';

import { useProduk } from '../hooks/Provider';

interface FormsProps {
  onComplete: () => void;
}

const Forms: React.FC<FormsProps> = ({ onComplete }) => {
  const { dispatch, state } = useProduk();

  const onSubmit = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      try {
        await axios.post('/produk/create', { ...state.produk });
        dispatch({ type: 'reset-form' });
        onComplete();
      } catch (err) {
        console.log(err);
      }
    },
    [dispatch, onComplete, state.produk]
  );

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: 'set-form', payload: event.currentTarget.value, name: event.currentTarget.name });
    },
    [dispatch]
  );

  return (
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
        <NumberInput value={state.produk.harga?.toString()} defaultValue={0} marginBottom="2">
          <NumberInputField onChange={onChange} name="harga" placeholder="harga" />
        </NumberInput>
        <NumberInput value={state.produk.jumlah?.toString()} size="md" defaultValue={0} min={0} marginBottom="2">
          <NumberInputField name="jumlah" onChange={onChange} placeholder="jumlah" />
        </NumberInput>
        <Button onClick={onSubmit} type="button" colorScheme="teal" size="md">
          submit
        </Button>
      </form>
    </Container>
  );
};
export default Forms;
