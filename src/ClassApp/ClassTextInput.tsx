import { Component, ComponentProps } from "react";

export default class ClassTextInput extends Component<{
  label: string;
  inputProps: ComponentProps<"input">;
}> {
  render() {
    return (
      <div className="input-wrap">
        <label>{this.props.label}:</label>
        <input {...this.props.inputProps} />
      </div>
    );
  }
}
