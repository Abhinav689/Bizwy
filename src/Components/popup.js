// In SimpleDialog component
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { blue } from '@mui/material/colors';
import { Radio, RadioGroup, FormControlLabel } from '@mui/material';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Location from './Assets/location.png'
import Time from './Assets/time.png'
import './popup.css'


const SimpleDialog = ({ onClose, selectedValue, open, setSelectedValue, branches, onBranchSelect }) => {
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    setSelectedValue(value);
    onClose(value);
    const selectedBranch = branches.find(branch => branch.email === value);
    if (selectedBranch) {
      onBranchSelect(selectedBranch);
    }
  };

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Our Other Branches</DialogTitle>
      <List>
        {branches.map((branch) => (
          <ListItemButton
            key={branch.email}
            onClick={() => handleListItemClick(branch.email)}
            selected={branch.email === selectedValue}
          >
            <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
              <FastfoodIcon />
            </Avatar>
             <ListItemText
              primary={branch.email}
             secondary={`${branch.distance}, ${branch.time}`} // Include distance and time
            />
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              value={selectedValue}
              onChange={handleRadioChange}
            >
              <FormControlLabel value={branch.email} control={<Radio />} />
            </RadioGroup>
          </ListItemButton>
        ))}
      </List>
    </Dialog>
  );
};

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
  setSelectedValue: PropTypes.func.isRequired,
  branches: PropTypes.array.isRequired,
  onBranchSelect: PropTypes.func.isRequired, // Add onBranchSelect prop
};

const SimpleDialogDemo = ({ branches }) => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(branches.length > 0 ? branches[0].email : "");
  const [selectedBranch, setSelectedBranch] = useState(branches.length > 0 ? branches[0] : null);
  const [deliveryTime, setDeliveryTime] = useState(branches.length > 0 ? branches[0].time : "");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    if (value) {
      setSelectedValue(value);
    }
  };

  const handleBranchSelect = (branch) => {
    setSelectedBranch(branch);
    setDeliveryTime(branch.time); // Update delivery time when branch is selected
  };

  return (
    <>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        setSelectedValue={setSelectedValue}
        branches={branches}
        onBranchSelect={handleBranchSelect}
      />
      {selectedBranch && (
        <div className="popup">
          <div className="popup_content">
            <p className="popup_text">
            <img src={Location} alt="" style={{width:"20px",height:"20px", marginTop:"-5rem",marginLeft:"-2.5rem"}}/> {selectedBranch.email} - {selectedBranch.location}
            </p>
           
            <img src={Time} style={{width:"20px",height:"20px",marginLeft:"-3rem",marginTop:"-10rem"}}/>
            <p style={{marginTop:"-1.4rem" ,marginLeft:"-1.5rem" , fontfamily: "Basis_Grotesque_Pro", fontWeight: "400", fontSize:" 13px", lineHeight: "16px" , WebkitFontSmoothing:"antialiased", }}>  Delivery Time: {deliveryTime}</p> {/* Display delivery time */}
            <Button onClick={handleClickOpen}>
              <ArrowDropDownIcon className="icons" style={{ position:"absolute",color: '#1BABEE', marginTop: '-7.5rem', marginLeft: '11.5rem' }} />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default SimpleDialogDemo;
export { SimpleDialogDemo };
