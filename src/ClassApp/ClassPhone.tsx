import { Component } from "react";

export default class ClassPhone extends Component<{
  phoneInputProps: React.ComponentProps<"input">;
}> {
  render() {
    return <input {...this.props.phoneInputProps} />;
  }
}
