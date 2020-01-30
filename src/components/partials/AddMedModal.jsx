import React, { useState } from 'react';
// Styling
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
// Material UI Components
import AddIcon from '@material-ui/icons/Add';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CancelIcon from '@material-ui/icons/Cancel';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import TextField from '@material-ui/core/TextField';

// Set up styling
const useStyles = makeStyles(theme => ({
  blueAvatar: {
    color: blue[600],
    backgroundColor: blue[100],
  },
  blue: {
    color: blue[600],
    paddingLeft: '5px'
  },
  row: {
    textAlign: 'center'
  },
  spacer: {
    padding: '0 25px'
  }
}))

const meds = [{
  brand: 'Tylenol',
  generic: 'Acetamenophin'
}, {
  brand: 'Advil',
  generic: 'Ibuprofen'
}, {
  brand: 'Codeine',
  generic: 'Hydrocodone'
}, {
  brand: 'Midol',
  generic: 'Ibuprofen / Aspirin'
}, {
  brand: 'Glucophage',
  generic: 'Metformin'
}, {
  brand: 'Brilinta',
  generic: 'Ticagrelor'
}, {
  brand: 'Dupixent',
  generic: 'Dupilumab'
}]


const medications = [
  {
      brand: 'Altace',
      generic: 'ramipril',
      link: 'https://www.goodrx.com/altace',
      image: '/img/altace.JPG',
  },
 { 
     brand: 'Amaryl',
     generic: 'glimepiride',
     link: 'https://www.goodrx.com/amaryl',
     image: '/img/amaryl.JPG'
 },
 {
     brand: 'Ambien',
     generic: 'zolpidem',
     link: 'https://www.goodrx.com/ambien',
     image: '/img/ambien.JPG'
 },
 {
      brand: 'Ativan',
      generic: 'lorazepam',
      link: 'https://www.goodrx.com/ativan',
      image: '/img/ativan.JPG'
 },
 {
      brand: 'Calan SR',
      generic: 'verapamil SR',
      link: 'https://www.goodrx.com/calan-sr',
      image: '/img/calan-sr.JPG'
 },
 {
      brand: 'Cardizem',
      generic: 'diltiazem ER',
      link: 'https://www.goodrx.com/cardizem',
      image: '/img/cardizem.JPG'
 },
 {
      brand: 'Celexa',
      generic: 'citalopram',
      link: 'https://www.goodrx.com/celexa',
      image: '/img/celexa.JPG'
 },
 {
      brand: 'Coumadin',
      generic: 'warfarin',
      link: 'https://www.goodrx.com/coumadin',
      image: '/img/coumadin.JPG'
 },
 {
      brand: 'Diabeta',
      generic: 'glyburide',
      link: 'https://www.goodrx.com/diabeta',
      image: '/img/diabeta.JPG'
 },
 {
     brand: 'Efexor',
     generic: 'venlafaxine',
     image: '/img/effexor.JPG'
 },
 {
     brand: 'Flonase',
     generic: 'fluticasone',
     image: '/img/flonase.JPG'
 },
 {
     brand: 'Fosamax',
     generic: 'alendronate',
     image: '/img/fosamax.JPG'
 },
 {
     brand: 'Glucophage',
     generic: 'metformin',
     image: '/img/glucophage.JPG'
 },
 {
     brand: 'Glucotrol',
     generic: 'glipizide',
     image: '/img/glucotrol.JPG'
 },
 {
     brand: 'Hytrin',
     generic: 'terazosin',
     image: '/img/hytrin.JPG'
 },
 {
     brand: 'Imitrex',
     generic: 'sumatriptan',
     image: '/img/imitrex.JPG'
 },
 {
     brand: 'Lasix',
     generic: 'furosemide',
     image: '/img/lasix.JPG'
 },
 {
     brand: 'Lopid',
     generic: 'gemfibrozil',
     image: '/img/lopid.JPG'
 },
 {
     brand: 'Mevacor',
     generic: 'lovastatin',
     image: '/img/mevacor.JPG'
 },
 {
     brand: 'Micronase',
     generic: 'glyburide',
     image: '/img/micronase.JPG',
 },
 {
     brand: 'Norvasc',
     generic: 'amlodipine',
     image: '/img/norvasc.JPG'
 },
 {
     brand: 'Paxil',
     generic: 'paroxetine',
     image: '/img/paxil.JPG'
 },
 {
     brand: 'Pepcid',
     generic: 'famotidine',
     image: '/img/pepcid.JPG'
 },
 {
     brand: 'Pravachol',
     generic: 'pravastatin',
     image: '/img/pravachol.JPG'
 },
 {
     brand: 'Prilosec',
     generic: 'omeprazole',
     image: '/img/prilosec.JPG'
 },
 {
     brand: 'Prinivil',
     generic: 'lisinopril',
     image: '/img/prinivil.JPG'
 },
 {
     brand: 'Procardia',
     generic: 'nifedipine',
     image: '/img/procardia.JPG'
 },
 {
     brand: 'Procardia XL',
     generic: 'nifedipine XL',
     image: '/img/procardia-xl.JPG'
 },
 {
     brand: 'Proventil',
     generic: 'albuterol',
     image: '/img/proventil.JPG'
 },
 {
     brand: 'Prozac',
     generic: 'fluoxetine',
     image: '/img/prozac.JPG'
 },
 {
     brand: 'Retin-A',
     generic: 'tretinoin',
     image: '/img/retin-a.JPG'
 },
 {
     brand: 'Risperdal',
     generic: 'risperidone',
     image: '/img/risperdal.JPG'
 },
 {
     brand: 'sonata',
     generic: 'zaleplon',
     image: '/img/sonata.JPG'
 },
 {
     brand: 'synthroid',
     generic: 'levothyroxine',
     image: '/img/synthroid.JPG'
 },
 {
     brand: 'timoptic',
     generic: 'timolol',
     image: '/img/timoptic.JPG'
 },
 {
     brand: 'Toprol XL',
     generic: 'metoprolol ext-release',
     image: '/img/toprol-xl.JPG'
 },
 {
     brand: 'Tylenol with codeine',
     generic: 'acetaminophen w/codeine',
     image: '/img/tylenol-with-codeine.JPG'
 },
 {
     brand: 'Ultram',
     generic: 'tramadol',
     image: '/img/ultram.JPG'
 },
 {
     brand: 'Vasotec',
     generic: 'enalapril',
     image: '/img/vasotec.JPG'
 },
 {
     brand: 'Ventolin',
     generic: 'albuterol',
     image: '/img/ventolin.JPG'
 },
 {
     brand: 'Wellbutrin',
     generic: 'buproprion',
     image: '/img/wellbutrin.JPG'
 },
 {
     brand: 'Wellbutrin XL',
     generic: 'buproprion ext-release',
     image: '/img/wellbutrin-xl.JPG'
 },
 {
     brand: 'Xanax',
     generic: 'alprazolam',
     image: '/img/xanax.JPG'
 },
 {
     brand: 'Yasmin',
     generic: 'drospirenone/ethinyl estradiol',
     image: '/img/yasmin.JPG'
 },
 {
     brand: 'Zantac',
     generic: 'ranitidine',
     image: '/img/zantac.JPG'
 },
 {
     brand: 'Zestril',
     generic: 'lisinopril',
     image: '/img/zestril.JPG'
 },
 {
     brand: 'Zocor',
     generic: 'simvastatin',
     image: '/img/zocor.JPG'
 },
 {
     brand: 'Zolofot',
     generic: 'sertraline',
     image: '/img/zoloft.JPG'
 },
 {
     brand: 'Zovirax',
     generic: 'acyclovir',
     image: '/img/zovirax.JPG'
 }
]


function SimpleDialog(props) {
  const classes = useStyles()
  const { close, open } = props
  let [condition, setCondition] = useState('')
  let [medication, setMedication] = useState('')

  const handleClose = () => close()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Submitted', medication, condition)
    let token = localStorage.getItem('mernToken')
    console.log(token)
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="dialog-title" open={open}>
      <DialogTitle id="dialog-title">Medication Quick Add</DialogTitle>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <Autocomplete
            id="combo-box"
            onChange={(event, value) => setMedication(value ? value.generic : '')}
            options={medications}
            getOptionLabel={option => `${option.brand} (${option.generic})`}
            style={{ width: 300 }}
            renderInput={params => (
                <TextField {...params} label="Available Meds" variant="outlined" fullWidth />
            )}
            />
          </FormControl>
          <div>
            <FormControl fullWidth>
              <InputLabel htmlFor="component-outlined">Condition</InputLabel>
              <OutlinedInput id="component-outlined" value={condition} onChange={(e) => setCondition(e.target.value)} label="Condition" fullWidth />
            </FormControl>
          </div>
          <FormControl>
            <div className={classes.row}>
              <Button type="submit" color="primary" className={classes.spacer}>
                <AddCircleIcon />
                Add Med
              </Button>
              <Button onClick={handleClose} color="secondary">
                <CancelIcon />
                Cancel
              </Button>
            </div>
          </FormControl>
        </form>
    </Dialog>
  )
}

export default function AddMedModal() {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = value => {
    setOpen(false)
  }

  // TODO: Implement useEffect to fetch the actual medications.
  // Keep the medications array above as a default / fallback

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        <Avatar className={classes.blueAvatar}>
          <AddIcon /> 
        </Avatar>
        <span className={classes.blue}>New Medication</span>
      </Button>
      <SimpleDialog open={open} close={handleClose} />
    </div>
  )
}