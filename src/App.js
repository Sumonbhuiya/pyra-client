import './App.css';
import { Box, Button, Checkbox, Container, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Step, StepConnector, stepConnectorClasses, StepLabel, Stepper, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Fragment, useState } from 'react';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import PersonIcon from '@mui/icons-material/Person';
import ImageIcon from '@mui/icons-material/Image';
import CheckIcon from '@mui/icons-material/Check';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// stepper line color and design set
const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 24,
    left: 'calc(-50% + 7px)',
    right: 'calc(50% + 6px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#283758',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#283758',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#838EA0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 45,
  height: 45,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundColor: '#3e3e3e',
    width: 50,
    height: 50,
  }),
  ...(ownerState.completed && {
    backgroundColor: '#0379ca',
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <LockOpenIcon />,
    2: <PersonIcon />,
    3: <ImageIcon />,
    4: <CheckIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

// stepper steps text
const steps = [
  'Account',
  'Personal',
  'Image',
  'Confirm',
];

function App() {
  const [success, setSuccess] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [value, setValue] = useState(new Date());
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);
  const [contact, setContact] = useState('');
  const [agree, setAgree] = useState('');

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
      setPhotoURL(event.target.files[0]);
    }
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('userName', userName);
    formData.append('email', email);
    formData.append('password', rePassword);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('gender', gender);
    formData.append('birthDate', birthDate);
    formData.append('address', address);
    formData.append('phone', phone);
    formData.append('image', photoURL);
    formData.append('contact', contact);
    formData.append('agree', agree);

    const url = `https://fast-brushlands-57419.herokuapp.com/users`;
    fetch(url, {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        if (data.insertedId) {
          setSuccess(true)
        }
      })
    e.preventDefault()
  }

  return (
    <div className="App">
      <Box className='page-bg'>
        <Box sx={{ height: '100%', width: '100%', background: 'rgba(221, 221, 221, 0.521)' }}>
          <Box sx={{ py: '30px' }}>
            <Container sx={{ background: 'rgba(250, 250, 250, 0.9)', borderRadius: '4px', p: '30px' }}>
              <h2 style={{ fontSize: '32px', color: '#0379ca', fontWeight: 'bold', padding: '50px 0', textAlign: 'center' }}>SignupForm - Multi Step Signup HTML5 Ajax Form</h2>
              <Box sx={{ width: { xs: '95%', sm: '50%' }, mx: 'auto' }}>
                {activeStep + 1 === 4 ?
                  <h3 style={{ backgroundColor: 'rgba(62, 62, 62, 0.9)', border: '1px solid rgba(62, 62, 62, 0.9)', borderRadius: '10px', color: '#fff', fontSize: '26px', fontWeight: 'bold', padding: '10px', margin: '50px 0', textAlign: 'center' }}>Step {activeStep + 1} of 4: Review & Submit</h3>
                  :
                  <h3 style={{ backgroundColor: 'rgba(62, 62, 62, 0.9)', border: '1px solid rgba(62, 62, 62, 0.9)', borderRadius: '10px', color: '#fff', fontSize: '26px', fontWeight: 'bold', padding: '10px', margin: '50px 0', textAlign: 'center' }}>Step {activeStep + 1} of 4</h3>
                }

                <Stepper activeStep={activeStep} alternativeLabel connector={<QontoConnector />}>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>

                <form onSubmit={handelSubmit}>
                  {/* first step */}
                  {activeStep === 0 &&
                    <>
                      <h3 style={{
                        color: '#0379ca', borderBottom: '5px solid #ddd', fontSize: '28px', fontWeight: 'bold',
                        maxWidth: '320px', margin: '50px auto', paddingBottom: '5px', textAlign: 'center'
                      }}>Account Information</h3>

                      <Box className="form-group" sx={{ display: 'block' }}>
                        {userName ?
                          <input className="form-control" name="uname" id="uname" type="text" defaultValue={userName} required data-error="Please enter UserName" onChange={e => setUserName(e.target.value)} />
                          :
                          <input className="form-control" name="uname" id="uname" type="text" placeholder="UserName*" required data-error="Please enter UserName" onChange={e => setUserName(e.target.value)} />
                        }
                        <Box className='input-icon'><i className="fas fa-user"></i></Box>
                      </Box>

                      <Box className="form-group" sx={{ display: 'block' }}>
                        {email ?
                          <input className="form-control" name="email" id="email" type="email" defaultValue={email} required data-error="Please enter valid email" onChange={e => setEmail(e.target.value)} />
                          :
                          <input className="form-control" name="email" id="email" type="email" placeholder="Email*" required data-error="Please enter valid email" onChange={e => setEmail(e.target.value)} />
                        }
                        <Box className='input-icon'><i className="fas fa-envelope"></i></Box>
                      </Box>

                      <Box className="form-group" sx={{ display: 'block' }}>
                        {password ?
                          <input className="form-control" name="pass" id="pass" type="password" defaultValue={password} required data-error="Please enter password" onChange={e => setPassword(e.target.value)} />
                          :
                          <input className="form-control" name="pass" id="pass" type="password" placeholder="Password* at least 6 character" required data-error="Please enter password" onChange={e => setPassword(e.target.value)} />
                        }
                        <Box className='input-icon'><i className="fas fa-key"></i></Box>
                      </Box>

                      <Box className="form-group" sx={{ display: 'block' }}>
                        {password ?
                          <input className="form-control" name="cpass" id="cpass" type="password" defaultValue={rePassword} required data-error="Please retype password" onChange={e => setRePassword(e.target.value)} />
                          :
                          <input className="form-control" name="cpass" id="cpass" type="password" placeholder="Confirm Password*" required data-error="Please retype password" onChange={e => setRePassword(e.target.value)} />
                        }
                        <Box className='input-icon'><i className="fas fa-key"></i></Box>
                      </Box>
                    </>
                  }

                  {/* second step */}
                  {activeStep === 1 &&
                    <>
                      <h3 style={{
                        color: '#0379ca', borderBottom: '5px solid #ddd', fontSize: '28px', fontWeight: 'bold',
                        maxWidth: '320px', margin: '50px auto', paddingBottom: '5px', textAlign: 'center'
                      }}>Personal Information</h3>

                      <Box className="form-group" sx={{ display: 'block' }}>
                        {firstName ?
                          <input className="form-control" name="fname" id="fname" type="text" defaultValue={firstName} required data-error="Please enter First Name" onChange={e => setFirstName(e.target.value)} />
                          :
                          <input className="form-control" name="fname" id="fname" type="text" placeholder="First Name*" required data-error="Please enter First Name" onChange={e => setFirstName(e.target.value)} />
                        }
                        <Box className='input-icon'><i className="fas fa-user"></i></Box>
                      </Box>

                      <Box className="form-group" sx={{ display: 'block' }}>
                        {lastName ?
                          <input className="form-control" name="lname" id="lname" type="text" defaultValue={lastName} required data-error="Please enter Last Name" onChange={e => setLastName(e.target.value)} />
                          :
                          <input className="form-control" name="lname" id="lname" type="text" placeholder="Last Name*" required data-error="Please enter Last Name" onChange={e => setLastName(e.target.value)} />
                        }
                        <Box className='input-icon'><i className="fas fa-user"></i></Box>
                      </Box>

                      <Box className="form-group" sx={{ display: 'block' }}>
                        <select className="form-control" name="gender" id="gender" defaultValue={gender} required data-error="Please Select Gender" onChange={e => setGender(e.target.value)}>
                          <option value="">--- Select Your Gender* ---</option>
                          <option value="Male">Male</option>
                          <option value="Femal">Female</option>
                        </select>
                        <Box className='input-icon'><i className="fas fa-venus"></i></Box>
                      </Box>

                      <Box className="form-group" sx={{ display: 'block' }}>
                        <h2 style={{ textAlign: 'left' }}><strong>Date of Birth*:</strong></h2>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            displayStaticWrapperAs="desktop"
                            openTo="day"
                            value={birthDate || value}
                            onChange={(newValue) => {
                              setValue(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} className="form-control" name='birthDate' onBlur={e => setBirthDate(e.target.value)} />}
                          />
                        </LocalizationProvider>
                      </Box>

                      <Box className="form-group" sx={{ display: 'block' }}>
                        {address ?
                          <input className="form-control" name="address" id="address" type="text" defaultValue={address} required data-error="Please enter address" onChange={e => setAddress(e.target.value)} />
                          :
                          <input className="form-control" name="address" id="address" type="text" placeholder="Address*" required data-error="Please enter address" onChange={e => setAddress(e.target.value)} />
                        }
                        <Box className='input-icon'><i className="fas fa-map-marker-alt"></i></Box>
                      </Box>

                      <Box className="form-group" sx={{ display: 'block' }}>
                        {phone ?
                          <input className="form-control" name="phone" id="phone" type="text" defaultValue={phone} required data-error="Please enter valid phone" onChange={e => setPhone(e.target.value)} />
                          :
                          <input className="form-control" name="phone" id="phone" type="text" placeholder="Phone*" required data-error="Please enter valid phone" onChange={e => setPhone(e.target.value)} />
                        }
                        <Box className='input-icon'><i className="fas fa-phone"></i></Box>
                      </Box>
                    </>
                  }

                  {/* third step */}
                  {activeStep === 2 &&
                    <>
                      <h3 style={{
                        color: '#0379ca', borderBottom: '5px solid #ddd', fontSize: '28px', fontWeight: 'bold',
                        maxWidth: '320px', margin: '50px auto', paddingBottom: '5px', textAlign: 'center'
                      }}>Upload Profile Image</h3>

                      <Box className="form-group" sx={{ display: 'block' }}>
                        <input type="file" id="attachedFile" className="img-form-control" placeholder="Browse to select file" onChange={onImageChange} />
                      </Box>

                      <Box className="form-group" sx={{ display: { md: 'flex' }, alignItems: 'center', textAlign: 'left' }}>
                        <h3 style={{ fontSize: '16px', margin: '0 18px 0 12px' }}>Prefered Contact Method*:</h3>
                        <FormControl component="fieldset">
                          <RadioGroup row aria-label="contact" name="type" sx={{ color: '#484848' }} defaultChecked={contact} onChange={e => setContact(e.target.value)}>
                            <FormControlLabel value="Email" control={<Radio />} label="Email" />
                            <FormControlLabel value="Phone" control={<Radio />} label="Phone" />
                          </RadioGroup>
                        </FormControl>
                      </Box>

                      <Box className="form-group" sx={{ display: 'block' }}>
                        <Box sx={{ textAlign: 'left', color: '#484848', my: 2 }} >
                          <Checkbox required onChange={() => setAgree('yes')} />
                          <span sx={{ textAlign: 'left', fontFamily: 'poppins', fontWeight: 300, fontSize: { xs: '14px', sm: '18px', md: '18px' }, lineHeight: { sm: '21.6px', md: '21.6px' }, color: '#484848' }} >
                            Aggre with terms & conditions
                          </span>
                        </Box>
                      </Box>
                    </>
                  }

                  {/* fourth step */}
                  {activeStep === 3 &&
                    <>
                      <h3 style={{
                        color: '#0379ca', borderBottom: '5px solid #ddd', fontSize: '28px', fontWeight: 'bold',
                        maxWidth: '320px', margin: '50px auto', paddingBottom: '5px', textAlign: 'center'
                      }}>Confirm Details</h3>

                      <Box>
                        <img style={{ border: '1px solid #ddd', borderRadius: '5px', width: '150px', height: '150px' }} src={image} alt="" />
                        <h3 style={{ fontSize: '1.75rem', margin: 0 }}>Profile Picture</h3>
                      </Box>

                      <h3 style={{ backgroundColor: 'rgba(62, 62, 62, 0.9)', border: '1px solid rgba(62, 62, 62, 0.9)', borderRadius: '10px', color: '#fff', fontSize: '22px', fontWeight: 'bold', padding: '10px', margin: '50px 0 30px 0', textAlign: 'center' }}>Account Information</h3>
                      <Grid container>
                        <Grid item xs={6}>
                          <Typography sx={{ color: '#0379ca', pr: '10px', textAlign: 'right', fontWeight: 'bold' }}>UserName:</Typography>
                          <Typography sx={{ color: '#0379ca', pr: '10px', my: '13px', textAlign: 'right', fontWeight: 'bold' }}>Email:</Typography>
                          <Typography sx={{ color: '#0379ca', pr: '10px', textAlign: 'right', fontWeight: 'bold' }}>Password:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography sx={{ color: '#484848', textAlign: 'left' }}>{userName}</Typography>
                          <Typography sx={{ color: '#484848', my: '13px', textAlign: 'left' }}>{email}</Typography>
                          <Typography sx={{ color: '#484848', textAlign: 'left' }}>{password}</Typography>
                        </Grid>
                      </Grid>

                      <h3 style={{ backgroundColor: 'rgba(62, 62, 62, 0.9)', border: '1px solid rgba(62, 62, 62, 0.9)', borderRadius: '10px', color: '#fff', fontSize: '22px', fontWeight: 'bold', padding: '10px', margin: '50px 0 30px 0', textAlign: 'center' }}>Personal Information:</h3>
                      <Grid container>
                        <Grid item xs={6}>
                          <Typography sx={{ color: '#0379ca', pr: '10px', textAlign: 'right', fontWeight: 'bold' }}>First Name:</Typography>
                          <Typography sx={{ color: '#0379ca', pr: '10px', my: '13px', textAlign: 'right', fontWeight: 'bold' }}>Last Name:</Typography>
                          <Typography sx={{ color: '#0379ca', pr: '10px', textAlign: 'right', fontWeight: 'bold' }}>Gender:</Typography>
                          <Typography sx={{ color: '#0379ca', pr: '10px', my: '13px', textAlign: 'right', fontWeight: 'bold' }}>Date of Birth:</Typography>
                          <Typography sx={{ color: '#0379ca', pr: '10px', textAlign: 'right', fontWeight: 'bold' }}>Address:</Typography>
                          <Typography sx={{ color: '#0379ca', pr: '10px', my: '13px', textAlign: 'right', fontWeight: 'bold' }}>Phone:</Typography>
                          <Typography sx={{ color: '#0379ca', pr: '10px', textAlign: 'right', fontWeight: 'bold' }}>Prefered Contact Method:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography sx={{ color: '#484848', textAlign: 'left' }}>{firstName}</Typography>
                          <Typography sx={{ color: '#484848', my: '13px', textAlign: 'left' }}>{lastName}</Typography>
                          <Typography sx={{ color: '#484848', textAlign: 'left' }}>{gender}</Typography>
                          <Typography sx={{ color: '#484848', my: '13px', textAlign: 'left' }}>{birthDate}</Typography>
                          <Typography sx={{ color: '#484848', textAlign: 'left' }}>{address}</Typography>
                          <Typography sx={{ color: '#484848', my: '13px', textAlign: 'left' }}>{phone}</Typography>
                          <Typography sx={{ color: '#484848', mb: '20px', textAlign: 'left' }}>{contact}</Typography>
                        </Grid>
                      </Grid>

                      <Box sx={{ display: 'flex' }}>
                        <h3 style={{ fontSize: '16px', textAlign: 'left', paddingRight: '10px' }}>Solve The Math <span style={{ fontWeight: 'normal' }}>12 + 5 = </span> </h3>
                        <input name="sum" id="sum" type="text" style={{ padding: '8px 10px', fontSize: '16px', fontWeight: 'normal', width: '100px' }} required />
                      </Box>

                      <Box sx={{ display: 'flex', p: '8px 0 12px 0' }}>
                        <h3 style={{ fontSize: '16px', textAlign: 'left' }}>Aggre with terms & conditions: </h3>
                        {agree === 'yes' ?
                          <Checkbox checked disabled />
                          :
                          <Checkbox disabled />
                        }
                      </Box>
                    </>
                  }

                  {/* buttons */}
                  <Fragment>
                    {success === true ?
                      <Typography sx={{ fontSize: '1.75rem', color: 'rgb(25,135,84)', textAlign: 'center', fontWeight: 'bold' }}>You have finished all steps of this html form successfully</Typography>
                      :
                      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        {activeStep === 0 ?
                          <Box sx={{ mr: 1 }}>
                            <Button id='btn-disable' color="inherit">Are you ready!</Button>
                          </Box>
                          :
                          <Button
                            color="inherit"
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                            id="next-btn">
                            <span className="fas fa-arrow-left" style={{ paddingRight: '6px' }}></span> Back
                          </Button>
                        }

                        {activeStep === steps.length - 1 ?
                          <Button id="next-btn" type='submit'>
                            Submit
                          </Button>
                          :
                          <Button onClick={handleNext} id="next-btn">
                            Next <span className="fas fa-arrow-right" style={{ paddingLeft: '6px' }}></span>
                          </Button>
                        }
                      </Box>
                    }
                  </Fragment>
                </form>

              </Box>
            </Container >
          </Box>

          <Typography sx={{ pb: '15px', textAlign: 'center', color: 'rgba(0, 0, 0, 0.8)' }}>© 2022 SignupForm. <a href="https://1.envato.market/AYdWK" style={{ color: '#0d6efd' }} target="_blank">MGScoder</a> All rights reserved. <a href="https://1.envato.market/29W0g" style={{ color: '#0d6efd' }} target="_blank">Buy SignupForm Script</a></Typography>
        </Box>
      </Box>
    </div >
  );
}

export default App;
