import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { ButtonPurchaseStyle, RegisterInputStyle } from '../styleds';

const ariaLabel = { 'aria-label': 'description' };

const PurchaseButton = (props) => {
  const handleChange = (event) => {
    props.handleChange(event);
  };
  const handlePurchase = () => {
    // props.handlePurchase();
  };
  return (
    <Grid item sx={props.sx}>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mt: 3,
          mb: 4,
          border: '1px solid rgba(255, 255, 255, 0.24)',
          borderRadius: '50px',
          padding: '0px 4px 0px 24px',
          maxWidth: '400px',
          height: '54px',
        }}
      >
        <RegisterInputStyle
          {...(!props.isNumber && { error: true })}
          placeholder="Amount of DAI"
          inputProps={ariaLabel}
          disableUnderline={true}
          onChange={handleChange}
          inputRef={props.inputRef}
        />
        <ButtonPurchaseStyle variant="contained" onClick={handlePurchase}>
          Buy pSDA
        </ButtonPurchaseStyle>
      </Box>
    </Grid>
  );
};

export default PurchaseButton;
