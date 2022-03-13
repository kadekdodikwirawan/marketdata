/*
 *
 * HomePage
 *
 */

import React, { memo, useState } from 'react';
// import PropTypes from 'prop-types';
import pluginId from '../../pluginId';
import { Box } from '@strapi/design-system/Box';
import { Link } from '@strapi/design-system/Link';
import { Alert } from '@strapi/design-system/Alert';
import { Textarea } from '@strapi/design-system/Textarea';
import { Stack } from '@strapi/design-system/Stack';
import { Flex } from '@strapi/design-system/Flex';
import { Typography } from '@strapi/design-system/Typography';
import { Select, Option } from '@strapi/design-system/Select';
import { Button } from '@strapi/design-system/Button';
import { BaseHeaderLayout } from '@strapi/design-system/Layout';
import ArrowLeft from '@strapi/icons/ArrowLeft'
import CrossCircle from '@strapi/icons/CrossCircle';
import instance from '../../utils/axiosInstance';

const HomePage = () => {
  const [resi, setResi] = useState('');
  const [kurir, setKurir] = useState('jnt');
  const [isloading, setIsloading] = useState(false);
  const [respon, setRespon] = useState([])
  const [error, setError] = useState(null)
  const addQue = () => {
    const list_resi = resi.split("\n")
    list_resi.forEach(el => {
      instance.post('/resi-id/track', { resi: el, kurir: kurir })
        .then((res) => {
          setRespon(old => [...old, res.data])
        }).catch((e) => {
          setError(e)
        })
    });
  }
  return (
    <>
      <Box background="neutral100">
        <BaseHeaderLayout navigationAction={<Link startIcon={<ArrowLeft />} to="/">
          Go back
        </Link>} title="Resi ID" as="h2" />
      </Box>
      <Box padding={10}>
        {error != null ?
          <Alert closeLabel="Close alert" onClose={() => setError(null)} title={error.message} variant="danger">
            <p>{error.response.data.error.message} </p>
          </Alert>
          : ''}
        <Stack spacing={4} padding={3} size={1}>
          <Select id="select1" label="Pilih kurir" required placeholder="Pilih kurir" onClear={() => setKurir('jnt')} value={kurir} onChange={setKurir}>
            <Option value={'jnt'}>JNT</Option>
            <Option value={'jne'}>JNE</Option>
            <Option value={'sicepat'}>Sicepat</Option>
            <Option value={'idx'}>ID Express</Option>
          </Select>
        </Stack>
        <Stack spacing={4} padding={3} size={1}>
          <Textarea required placeholder="Masukan resi yang mau di traking" label="Resi" name="resi" hint="List Resi yang akan di traking, pisahkan dengan baris baru (Enter)"
            error={resi.indexOf(" ") > 0 ? 'Resi tidak boleh ada spasi' : undefined}
            onChange={e => setResi(e.target.value)}>
            {resi}
          </Textarea>
        </Stack>
        <Flex padding={3}>
          <Button onClick={addQue} disabled={isloading}>Tambah Traking</Button>
        </Flex>
        <Box padding={3}>
          <h2>Logs  {
            respon.length != 0 ? <CrossCircle onClick={() => setRespon([])} /> : ''
          }</h2> <br />
          {respon.length > 0 ?
            <div>
              {respon.map((val, idx) => {
                return <pre key={idx}>{idx} == {val.awb} {val.is_queue == 1 ? 'berhasil di traking' : ''} {val.is_delivered == 1 ? 'Paket sudah sampai tujuan' : ''}</pre>
              })}
            </div> :
            ''
          }
        </Box>
      </Box>
    </>
  );
};

export default memo(HomePage);
