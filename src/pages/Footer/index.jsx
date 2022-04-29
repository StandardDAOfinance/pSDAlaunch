import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import SvgIcon from '@mui/material/SvgIcon';
import facepaint from 'facepaint';
import { ReactComponent as linkedinIcon } from '../../assets/images/linkedin-brands.svg';
import { ReactComponent as discordIcon } from '../../assets/images/discord-brands.svg';
import { ReactComponent as mediumIcon } from '../../assets/images/medium-brands.svg';
import { ReactComponent as twitterIcon } from '../../assets/images/twitter-brands.svg';
import Countdown from 'react-countdown';

const mq = facepaint(['@media(min-width: 600px)']);

const fontBlinker = { fontFamily: 'Blinker', fontStyle: 'normal', fontWeight: 'bold' };

const BoxStyle = styled(Box)`
  ${mq({
    marginTop: '20px',
    marginBottom: '20px',
  })}
`;
const TypographyTimerTitleStyle = styled(Typography)({
  ...fontBlinker,
  fontWeight: 600,
  fontSize: '20px',
  opacity: 0.72,
});
const TypographyTimerTitleStartedStyle = styled(Typography)({
  ...fontBlinker,
  fontWeight: 600,
  fontSize: '20px',
  color: '#FFCD3E',
});

const TypographyTimerTimeStyle = styled(Typography)({
  ...fontBlinker,
  fontSize: '28px',
  color: '#90caf9',
  width: '160px',
});
const Footer = (props) => {
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return (
        <Box sx={{ display: 'flex', direction: 'row', alignItems: 'center' }} gutterBottom>
          <TypographyTimerTitleStartedStyle>Pre-Sale started!</TypographyTimerTitleStartedStyle>
        </Box>
      );
    } else {
      return (
        <Box sx={{ display: 'flex', direction: 'row', alignItems: 'center' }} gutterBottom>
          <TypographyTimerTitleStyle>Pre-Sale starts in&nbsp;&nbsp;</TypographyTimerTitleStyle>
          <TypographyTimerTimeStyle>
            {hours}h&nbsp;:&nbsp;{minutes}m&nbsp;:&nbsp;{seconds}s
          </TypographyTimerTimeStyle>
        </Box>
      );
    }
  };

  const handleTimerEnd = () => {
    return true;
  };

  return (
    <BoxStyle>
      <Container>
        <Grid container direction="row" justifyContent="center" alignItems="center">
          <Grid item container md={6} direction="row" justifyContent="center" alignItems="center">
            <Link
              href="https://www.linkedin.com/company/standarddao"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ display: 'flex', direction: 'row', alignItems: 'center', padding: '5px' }}
            >
              <SvgIcon component={linkedinIcon} inheritViewBox sx={{ fontSize: 40 }} />
            </Link>
            <Link
              href="https://twitter.com/StandardDAO"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ display: 'flex', direction: 'row', alignItems: 'center', padding: '5px' }}
            >
              <SvgIcon component={twitterIcon} inheritViewBox sx={{ fontSize: 40 }} />
            </Link>
            <Link
              href="https://standarddao.medium.com/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ display: 'flex', direction: 'row', alignItems: 'center', padding: '5px' }}
            >
              <SvgIcon component={mediumIcon} inheritViewBox sx={{ fontSize: 40 }} />
            </Link>
            <Link
              href="https://discord.gg/zh3FGaGX6H"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ display: 'flex', direction: 'row', alignItems: 'center', padding: '5px' }}
            >
              <SvgIcon component={discordIcon} inheritViewBox sx={{ fontSize: 40 }} />
            </Link>
          </Grid>
          <Grid item container md={6} direction="row" justifyContent="center" alignItems="center">
            <Countdown
              date={1651190400000}
              renderer={renderer}
              onComplete={handleTimerEnd}
            ></Countdown>
          </Grid>
        </Grid>
      </Container>
    </BoxStyle>
  );
};

export default Footer;
