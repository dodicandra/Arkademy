import React, { useContext, useReducer } from 'react';

import { ProdukType } from '../page/Home';

type Context = {
  dispatch: React.Dispatch<Action>;
  state: StateProduk;
};

const ProdukContext = React.createContext<Context>({} as Context);

type Forms = {
  type: 'set-form';
  payload: string;
  name: string;
};

type FormsInstan = {
  type: 'set-form-instan';
  payload: ProdukType;
};

type RessetForm = {
  type: 'reset-form';
};

type DeletItem = {
  type: 'delet-item';
  id: string;
};

type SetProduk = {
  type: 'set-produk';
  payload: ProdukType[];
};

type StateProduk = {
  produk: Partial<ProdukType>;
  produks: Partial<ProdukType[]>;
};

type Action = DeletItem | Forms | SetProduk | RessetForm | FormsInstan;

const reducer = (state: StateProduk, action: Action): StateProduk => {
  switch (action.type) {
    case 'set-form': {
      return {
        ...state,
        produk: {
          ...state.produk,
          [action.name]: action.payload,
        },
      };
    }
    case 'set-form-instan': {
      return {
        ...state,
        produk: {
          ...action.payload,
        },
      };
    }
    case 'reset-form':
      return {
        ...state,
        produk: {
          harga: 0,
          jumlah: 0,
          keterangan: '',
          namaProduk: '',
        },
      };
    case 'set-produk': {
      return {
        ...state,
        produks: action.payload,
      };
    }
    case 'delet-item': {
      let newProduk = [...state.produks!].filter((id) => id?.id_produk !== action.id);
      return {
        ...state,
        produks: newProduk,
      };
    }
    default:
      throw new Error('tidak ada action');
  }
};

const ProdukProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    produk: {
      keterangan: '',
      namaProduk: '',
      harga: 0,
      jumlah: 0,
    },
    produks: [],
  });

  return <ProdukContext.Provider value={{ state, dispatch }}>{children}</ProdukContext.Provider>;
};

export const useProduk = () => useContext(ProdukContext);

export default ProdukProvider;
