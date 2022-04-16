import "styles/ui/FormField.scss";


export const FormField = props => {
    return (
      <div className="form field">
        <label className="form label">
          {props.label}
        </label>
        <input
          className="form input"
          placeholder={props.innerLabel}
          value={props.value}
          type = {props.type}
          onChange={e => props.onChange(e.target.value)}
        />
      </div>
    );
  };