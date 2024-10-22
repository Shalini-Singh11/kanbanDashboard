import React from 'react';
import {Box} from '@mui/material';
import {flagIconStyles} from "./style"

const FlagIcon = ({ color }) => {
  return (
    <Box
    component="span"
    sx={{...flagIconStyles, backgroundColor: color}}
  />
  );
};

export default FlagIcon;
