import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { IconButton, Tooltip } from '@mui/material';
import { FileCopy } from '@mui/icons-material';

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
      <IconButton onClick={copyToClipboard}>
        <FileCopy />
      </IconButton>
    </Tooltip>
  );
};

CopyToClipboard.propTypes = {
  text: PropTypes.number.isRequired
};

export default CopyToClipboard;
