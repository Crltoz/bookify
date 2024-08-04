import { TextField } from "@mui/material";
import IconPicker from "./IconPicker";

const ProductFeature = ({ icon, name, onChangeIcon, onChangeName }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col col-lg-6">
          <IconPicker
            label="Feature icon"
            id="featureIcon"
            icon={icon}
            onChangeIcon={(value) => onChangeIcon(value)}
          />
        </div>
        <div className="col">
          <TextField
            fullWidth
            label="Nombre"
            id="featureName"
            value={name}
            onChange={(event) => onChangeName(event.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductFeature;
