import React from 'react';

import dayjs from 'dayjs';
import relative from 'dayjs/plugin/relativeTime';

import { EditIcon } from '@chakra-ui/icons';
import { Box, Button, Heading, IconButton, Text } from '@chakra-ui/react';

import { ProdukType } from '../page/Home';
import { format } from '../utils/fromatNumber';

dayjs.extend(relative);

interface CardProps {
  data: ProdukType;
  onClickEdit?: () => void;
  onDelet?: () => void;
}

const Card: React.FC<CardProps> = ({ data, onClickEdit, onDelet }) => {
  return (
    <Box
      paddingLeft="3"
      paddingRight="3"
      paddingTop="1"
      paddingBottom="1"
      borderRadius="md"
      margin="5"
      bg="teal.300"
      key={data?.id_produk}
    >
      <Heading>{data?.namaProduk}</Heading>
      <Text letterSpacing="1.5" fontSize="2xl">
        {data?.keterangan}
      </Text>
      <Box d="flex" flexDirection="row">
        <Text margin="2">Rp - {format(data?.harga.toString()!)}</Text>
        <Text margin="2">Stok {data?.jumlah}</Text>
      </Box>
      <Box d="flex" justifyContent="space-between" flexDirection="row">
        <Box p="3">
          <Text fontSize="xs">{dayjs(data?.createdAt).fromNow()}</Text>
        </Box>
        <Box>
          {onClickEdit ? (
            <IconButton
              onClick={onClickEdit}
              marginRight="6"
              aria-label="edit button"
              variant="outline"
              icon={<EditIcon />}
            />
          ) : null}
          {onDelet ? (
            <Button onClick={onDelet} colorScheme="red" size="md">
              Delet
            </Button>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};
export default Card;
