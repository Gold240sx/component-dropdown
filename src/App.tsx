import { Select, SelectOption } from "./TSX/Components/Select";
import { useState } from "react";

const options = [
  { label: "Nissan", value: "240sx" },
  { label: "Nissan", value: "GTR" },
  { label: "Toyota", value: "Supra" },
  { label: "Dodge", value: "Durango" },
  { label: "Lotus", value: "Esprit" },
]

const options2 = [
  { label: "Nissan", value: "240sx", name: "S13" },
  { label: "Nissan", value: "GTR", name: "R35" },
  { label: "Toyota", value: "Supra", name: "MK4" },
  { label: "Dodge", value: "Durango", name: "POS" },
  { label: "Lotus", value: "Esprit", name: "IDK" },
]

const options3 = [
  { label: "Nissan", value: "240sx", name: "S13", price: "$2,500" },
  { label: "Nissan", value: "GTR", name: "R35", price: "$110,00"},
  { label: "Toyota", value: "Supra", name: "MK4", price: "$34,000"},
  { label: "Dodge", value: "Durango", name: "POS", price: "$900"},
  { label: "Lotus", value: "Esprit", name: "IDK", price: "$21,000"},
]

const options4 = [
  { manufacturer: "Nissan", 
    items:[
    { label: "Nissan", value: "240sx", name: "S13", price: "$2,500" },
    { label: "Nissan", value: "GTR", name: "R35", price: "$110,00"},
  ]},
  { manufacturer: "Toyota", 
    items: [
    { label: "Toyota", value: "Supra", name: "MK4", price: "$34,000"},
    { label: "Toyota", value: "Carolla", name: "Trueno", price: "$9,000"},
  ]}
]


function App() {
  // To auto select the first object, pass "options[0]" into tha useState initial Value
  //   Example: const [value3, setValue3] = useState<SelectOption | undefined> (options[0]);

  // Labeled Dropdowns
  const [value1, setValue1] = useState<SelectOption | undefined> ();
  const [value2, setValue2] = useState<SelectOption[]> ([]);

  // Valued Dropdowns
  const [value3, setValue3] = useState<SelectOption | undefined> ();
  const [value4, setValue4] = useState<SelectOption[]> ([]);

  // Named Dropdowns
  const [value5, setValue5] = useState<SelectOption | undefined> ();
  const [value6, setValue6] = useState<SelectOption[]> ([]);

  // Valued Dropdowns
  const [value7, setValue7] = useState<SelectOption | undefined> ();
  const [value8, setValue8] = useState<SelectOption[]> ([]);

  // Priced Dropdowns
  const [value9, setValue9] = useState<SelectOption | undefined> ();
  const [value10, setValue10] = useState<SelectOption[]> ([]);

   // Priced + Titled Dropdowns
   const [value11, setValue11] = useState<SelectOption | undefined> ();
   const [value12, setValue12] = useState<SelectOption[]> ([]);

  //============//
  // VARIATIONS //
  //============//

  // "values / named"
  // Also, by labeling the dropdown params w/ "values", the dropdown list can display 
  // the valus rather than the titles.

  // "titled"
  // Labeling the dropdown with titled outputs a different layout displaying 2 object 
  // details per dropdown.

  return (
    <>
      <h2>Labeled</h2>
      <Select options={options} value={value1} onChange={o => setValue1(o)} />
      <br />
      <Select multiple options={options} value={value2} onChange={o => setValue2(o)} />
      <br />

      <h2>Valued</h2>
      <Select valued options={options} value={value3} onChange={o => setValue3(o)} />
      <br />
      <Select valued multiple options={options} value={value4} onChange={o => setValue4(o)} />
      <br />

      <h2>Named</h2>
      <Select named options={options2} value={value5} onChange={o => setValue5(o)} />
      <br />
      <Select named multiple options={options2} value={value6} onChange={o => setValue6(o)} />
      <br /><br />

      <h1>TITLED</h1>
      <br />

      <h2>Titled + Valued</h2>
      <Select titled valued options={options} value={value7} onChange={o => setValue7(o)} />
      <br />
      <Select titled valued multiple options={options} value={value8} onChange={o => setValue8(o)} />
      <br /><br />

      <h1>Priced</h1>
      <br />

      <h2>Priced</h2>
      <Select priced options={options3} value={value9} onChange={o => setValue9(o)} />
      <br />
      <Select priced multiple options={options3} value={value10} onChange={o => setValue10(o)} />
      <br />

      <h1>TITLED + Priced</h1>
      <br />

      {/* <h2>Titled + Valued + Priced</h2>
      <Select titled priced valued options={options4} value={value11} onChange={o => setValue11(o)} />
      <br />
      <Select titled priced valued multiple options={options4} value={value12} onChange={o => setValue12(o)} />
      <br /> */}
    </>
  )
}

export default App

{/* <h4 className='item-title'>{v.manufacturer}</h4> */}