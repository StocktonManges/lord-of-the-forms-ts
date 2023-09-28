import { Component } from "react";
import { ClassForm } from "./ClassForm";
import { UserInformation } from "../types";
import { ProfileInformation } from "../ProfileInformation";

export class ClassApp extends Component<
  Record<string, never>,
  UserInformation
> {
  state: UserInformation = {
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    phone: "",
  };
  render() {
    return (
      <>
        <h2>Class</h2>
        <ProfileInformation userData={this.state} />
        <ClassForm
          updateParentState={(userData: UserInformation) => {
            this.setState({
              firstName: userData.firstName,
              lastName: userData.lastName,
              email: userData.email,
              city: userData.city,
              phone: userData.phone,
            });
          }}
        />
      </>
    );
  }
}
