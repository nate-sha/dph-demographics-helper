import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { Button, Tooltip } from '@mui/material';

const CopyToClipboard = ({ text }) => {
  const { enqueueSnackbar } = useSnackbar();
  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    enqueueSnackbar('Copied', {
      variant: 'success',
      autoHideDuration: 1000
    });
  };

  return (
    <Tooltip title="Copy">
      <Button onClick={copyToClipboard}>{text}</Button>
    </Tooltip>
  );
};

CopyToClipboard.propTypes = {
  text: PropTypes.number.isRequired
};

export default CopyToClipboard;
