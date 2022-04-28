import facepaint from 'facepaint';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';

const mq = facepaint(['@media(min-width: 600px)']);

const fontBlinker = { fontFamily: 'Blinker', fontStyle: 'normal', fontWeight: 'bold' };

export const BoxStyle = styled(Box)`
  ${mq({
    marginTop: ['40px', '30px'],
    marginBottom: '20px',
  })}
`;

export const TypographyTitleStyle = styled(Typography)`
  ${mq({
    ...fontBlinker,
    fontSize: ['36px', '48px'],
    marginTop: ['30px', '20px'],
    textAlign: 'center',
  })}
`;
export const TypographyInfoStyle = styled(Typography)`
  ${mq({
    ...fontBlinker,
    fontSize: ['16px', '20px'],
    marginTop: ['15px', '30px'],
    textAlign: 'center',
  })}
`;
export const TypographyMintedTokensStyle = styled(Typography)`
  ${mq({
    ...fontBlinker,
    fontSize: ['24px', '36px'],
    marginTop: ['20px', '20px'],
    marginBottom: ['20px', '20px'],
    textAlign: 'center',
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
    fontSize: '18px',
    color: '#105759',
    textTransform: 'none',
    borderRadius: '24px',
    padding: '6px 20px',
    '&:hover': {
      backgroundColor: '#1a9299',
    },
  })}
`;

export const RegisterInputStyle = styled(Input)({
  ...fontBlinker,
  fontSize: '16px',
  lineHeight: '19px',
});
