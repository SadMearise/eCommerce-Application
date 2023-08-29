import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function RadioButtonsGroup({ label, fields }: { label: string; fields: string[] }) {
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">{label}</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
      >
        {fields.map((field, id) => (
          <FormControlLabel
            // eslint-disable-next-line react/no-array-index-key
            key={id}
            value={field}
            control={<Radio />}
            label={field}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
