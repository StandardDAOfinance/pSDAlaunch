import facepaint from 'facepaint';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const mq = facepaint(['@media(min-width: 600px)']);

const fontBlinker = { fontFamily: 'Blinker', fontStyle: 'normal', fontWeight: 'bold' };

export const BoxStyle = styled(Box)`
  ${mq({
    marginTop: ['40px', '50px'],
    marginBottom: '20px',
  })}
`;

export const TypographyTitleStyle = styled(Typography)`
  ${mq({
    ...fontBlinker,
    fontSize: ['30px', '48px'],
    marginTop: ['30px', '50px'],
  })}
`;
export const TypographyMintedTokensStyle = styled(Typography)`
  ${mq({
    ...fontBlinker,
    fontSize: ['24px', '36px'],
    marginTop: ['20px', '30px'],
    marginBottom: ['20px', '30px'],
  })}
`;

export const TypographyPriceStyle = styled(Typography)`
  ${mq({
    ...fontBlinker,
    fontSize: ['24px', '36px'],
  })}
`;

export const ButtonPurchaseStyle = styled(Button)`
  ${mq({
    ...fontBlinker,
    backgroundColor: '#FFD945',
    fontSize: ['20px', '30px'],
    textTransform: 'capitalize',
    borderRadius: ['24px', '36px'],
    padding: '6px 30px',
    marginTop: ['20px', '30px'],
    '&:hover': {
      backgroundColor: '#ffc107',
    },
  })}
`;
