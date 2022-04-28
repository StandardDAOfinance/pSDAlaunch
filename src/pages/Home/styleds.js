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
export const TypographyInfoStyle = styled(Typography)`
  ${mq({
    ...fontBlinker,
    fontSize: ['16px', '20px'],
    marginTop: ['15px', '30px'],
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
    backgroundColor: '#6cbdc3',
    fontSize: ['18px', '24px'],
    color: '#105759',
    textTransform: 'none',
    borderRadius: ['24px', '36px'],
    padding: '5px 20px',
    marginTop: ['20px', '30px'],
    '&:hover': {
      backgroundColor: '#1a9299',
    },
  })}
`;
