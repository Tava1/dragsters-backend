import Router from 'express';
import { calcularPrecoPrazo } from 'correios-brasil';

const calculateShipping = Router();

calculateShipping.get('/:cepDestino', async (request, response) => {
  const { cepDestino } = request.params;

  const args = {
    sCepOrigem: '01001000',
    sCepDestino: cepDestino,
    nVlPeso: '30',
    nCdFormato: '1',
    nVlComprimento: '60',
    nVlAltura: '60',
    nVlLargura: '30',
    nCdServico: ['04014', '04510'],
    nVlDiametro: '0',
  };

  calcularPrecoPrazo(args).then(res => {
    response.json(res);
  });
});

export default calculateShipping;
