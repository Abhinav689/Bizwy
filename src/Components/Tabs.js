import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from 'react-bootstrap/Card';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import './Tabs.css';
import Rating from '@mui/material/Rating';
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
    
    <Box sx={{ width: '51%', marginLeft: '45rem', marginTop: '39rem' }}>
      <Box sx={{ borderBottom: 2, borderColor: 'divider', color: 'blue' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Description" {...a11yProps(0)} />
          <Tab label="Nutrition Information" {...a11yProps(1)} />
          <Tab label="Reviews" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Card style={{
          width: '49rem',
          border: '5px ',
          marginRight: '1rem',
          marginTop: '-1.5rem',
          marginLeft: '-1.35rem',
          height: '25rem',
          overflow: 'hidden',
          boxShadow: '0 4px 4px 2px rgba(0, 0, 0, 0.5), 0 1px 3px rgba(0, 0, 0, 0.9)' // Modified box shadow
        }}>
          <Card.Body>
            <Card.Text style={{ paddingLeft: '1rem', marginTop: "1rem", marginRight: '1rem', textAlign: 'justify' }} >
              
Chicken biryani is a cherished dish that hails from the Indian subcontinent, celebrated for its rich flavors and aromatic spices. It embodies a harmonious fusion of tender chicken, fragrant basmati rice, and a plethora of spices meticulously layered and cooked to perfection.

At the heart of chicken biryani lies its intricate blend of spices. A melange of cumin, coriander, turmeric, garam masala, cinnamon, cardamom, cloves, and bay leaves imbue the dish with its distinctive taste and aroma. Marinated chicken, often with yogurt and spices, undergoes a process of slow cooking until succulent and infused with flavor.

The preparation of chicken biryani is a meticulous affair, typically involving layering parboiled rice with the cooked chicken and spices. Fried onions, mint leaves, and occasionally saffron are interspersed between the layers, adding depth and complexity to the dish. Dum cooking, a traditional method of slow cooking in steam, further enhances the melding of flavors.

Variations of chicken biryani abound, reflecting the diverse culinary traditions across regions. Hyderabadi biryani boasts fiery spices and saffron-infused milk, while Lucknowi biryani exudes subtlety with hints of saffron and rose water. Kolkata biryani incorporates potatoes alongside chicken, while Malabar biryani introduces coconut milk for a unique twist.
            </Card.Text>
          </Card.Body>
        </Card>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Card style={{
          width: '49rem',
          border: '5px ',
          marginRight: '2rem',
          marginTop: '-1.5rem',
          height: '25rem',
          marginLeft: '-1.35rem',
          overflow: 'hidden',
          boxShadow: '0 4px 4px 2px rgba(0, 0, 0, 0.5), 0 1px 3px rgba(0, 0, 0, 0.9)' // Modified box shadow
        }}>
          <Card.Body>
            <ul style={{ marginTop: '1rem' }}>
              <li style={{ margin: '0.5rem' }}>292 calories</li>
              <li style={{ margin: '0.5rem' }}>9.4 grams of total fat</li>
              <li style={{ margin: '0.5rem' }}>1.7 grams of saturated fat</li>
              <li style={{ margin: '0.5rem' }}>48 milligrams of cholesterol</li>
              <li style={{ margin: '0.5rem' }}>419 milligrams of sodium</li>
              <li style={{ margin: '0.5rem' }}>31 grams of total carbohydrates</li>
              <li style={{ margin: '0.5rem' }}>1.4 grams of dietary fiber</li>
              <li style={{ margin: '0.5rem' }}>3.2 grams of sugars</li>
              <li style={{ margin: '0.5rem' }}>20 grams of protein</li>
              <li style={{ margin: '0.5rem' }}>461.7 milligrams of potassium</li>
            </ul>
          </Card.Body>
        </Card>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>

        <Card style={{
          width: '49rem',
          border: '5px ',
          marginRight: '2rem',
          marginTop: '-1.5rem',
          height: '25rem',
          marginLeft: '-1.35rem',
          overflow: 'hidden',
          boxShadow: '0 4px 4px 2px rgba(0, 0, 0, 0.5), 0 1px 3px rgba(0, 0, 0, 0.9)' // Modified box shadow
        }}>
          <Card.Body>
            <div className='profile'>
      <AccountCircleIcon />
      <p>Customer 1</p>
      </div>
      <div className='rate'>
      <Rating className="read-only" value={5} readOnly style={{fontSize:"1rem" , marginLeft:"3rem"}} />
      </div>
      <div className='review' >
        <p>Absolutely delicious chicken biryani! Flavorful spices, tender chicken, and perfect rice texture. A delightful culinary experience, highly recommended for all biryani lovers.</p>
      </div>
      <div className='profile'>
      <AccountCircleIcon />
      <p>Customer 2</p>
      </div>
      <div className='rate'>
      <Rating className="read-only" value={4} readOnly style={{fontSize:"1rem" , marginLeft:"3rem"}} />
      </div>
      <div className='review' >
        <p>Absolutely delicious chicken biryani! Flavorful spices, tender chicken, and perfect rice texture. A delightful culinary experience, highly recommended for all biryani lovers.</p>
      </div>
      <div className='profile'>
      <AccountCircleIcon />
      <p>Customer 3</p>
      </div>
      <div className='rate'>
      <Rating className="read-only" value={3} readOnly style={{fontSize:"1rem" , marginLeft:"3rem"}} />
      </div>
      <div className='review' >
        <p>Absolutely delicious chicken biryani! Flavorful spices, tender chicken, and perfect rice texture. A delightful culinary experience, highly recommended for all biryani lovers.</p>
      </div>
          </Card.Body>
        </Card> 
        </CustomTabPanel >


    </Box>
    </>
  );
}
