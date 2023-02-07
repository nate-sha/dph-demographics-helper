import PropType from 'prop-types';
import { TextField as MuiTextField } from '@mui/material';
import CopyToClipboard from './CopyToClipboard';

const TextField = ({ value, ...props }) => {
  return (
    <MuiTextField
      value={value}
      size="small"
      sx={{
        width: 175
      }}
      {...props}
      InputProps={{
        endAdornment: <CopyToClipboard text={value} />
      }}
    />
  );
};

TextField.propTypes = {
  value: PropType.number.isRequired
};

export default TextField;
