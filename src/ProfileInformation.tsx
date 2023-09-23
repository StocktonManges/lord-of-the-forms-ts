import { UserInformation } from "./types";
import { capitalize, formatPhoneNumber } from "./utils/transformations";

export const InfoRow = ({ label, value }: { label: string; value: string }) => {
  return (
    <div>
      <span style={{ marginRight: 5 }}>
        <b>{label}:</b>
      </span>
      <span>{value}</span>
    </div>
  );
};
export const ProfileInformation = ({
  userData,
}: {
  userData: UserInformation;
}) => {
  const { email, firstName, lastName, phone, city } = userData;
  if (Object.values(userData).includes("")) {
    return (
      <>
        <u>
          <h3>Your Submitted User Information</h3>
        </u>
        <div className="user-info">
          <div>No information provided</div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <u>
          <h3>Your Submitted User Information</h3>
        </u>
        <div className="user-info">
          <InfoRow label="Email" value={email} />
          <InfoRow label="First Name" value={capitalize(firstName)} />
          <InfoRow label="Last Name" value={capitalize(lastName)} />
          <InfoRow label="City" value={capitalize(city)} />
          <InfoRow label="Phone" value={formatPhoneNumber(phone)} />
        </div>
      </>
    );
  }
};
