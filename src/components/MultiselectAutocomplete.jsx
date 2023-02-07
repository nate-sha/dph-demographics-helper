import PropTypes from 'prop-types';
import { Autocomplete as MuiAutocomplete, TextField, Checkbox } from '@mui/material';

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const MultiselectAutocomplete = ({
  name,
  options,
  value,
  error,
  errorText,
  loading,
  disabled,
  handleChange,
  open,
  onOpen,
  onClose,
  label,
  size
}) => (
  <MuiAutocomplete
    fullWidth
    id={name}
    name={name}
    loading={loading}
    limitTags={1}
    open={open}
    onOpen={onOpen}
    onClose={onClose}
    value={value}
    disabled={disabled}
    options={!loading ? options : []}
    multiple
    onChange={handleChange}
    isOptionEqualToValue={(option, value) => option.name === value.name}
    getOptionLabel={(option) => option.name}
    renderOption={(props, option, { selected }) => (
      <li {...props}>
        <Checkbox icon={icon} checkedIcon={checkedIcon} checked={selected} />
        {option.name}
      </li>
    )}
    renderInput={(params) => (
      <TextField
        {...params}
        error={error || false}
        helperText={errorText || ''}
        size={size || 'small'}
        label={label}
      />
    )}
  />
);

MultiselectAutocomplete.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  value: PropTypes.array,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
  open: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  label: PropTypes.string.isRequired,
  size: PropTypes.string,
  error: PropTypes.bool,
  errorText: PropTypes.string
};

export default MultiselectAutocomplete;
