// import React, { useState} from 'react'; 
// import DropDownPicker from 'react-native-dropdown-picker';

// const DropDown = () => {
//   const [open, setOpen] = useState(false);
//   const [value, setValue] = useState(null);
//   const [items, setItems] = useState([
//     {label: 'IVF', value: 'ivf'},
//     {label: 'Miscarriage', value: 'miscarriage'},
//     {label: 'Support', value: 'support'},
//   ]);

//   return (
//     <DropDownPicker
//       open={open}
//       value={value}
//       placeholder="What best describes your story?"
//       items={items}
//       setOpen={setOpen}
//       setValue={setValue}
//       setItems={setItems}
//     />
//   );
// }

// export default DropDown

import React, { useState} from 'react'; 
import DropDownPicker from 'react-native-dropdown-picker';

const DropDown = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'IVF', value: 'ivf'},
    {label: 'Miscarriage', value: 'miscarriage'},
    {label: 'Support', value: 'support'},
  ]);

  return (
    <DropDownPicker
      open={open}
      value={value}
      placeholder="What best describes your story?"
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
    />
  );
}

export default DropDown

