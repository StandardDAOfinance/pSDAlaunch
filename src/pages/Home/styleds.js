import facepaint from 'facepaint';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
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
    fontSize: ['24px', '48px'],
    marginTop: ['30px', '80px'],
  })}
`;
