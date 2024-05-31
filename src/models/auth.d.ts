export type UserLoginProps = {
  user: {
    username: string;
    password: string;
  };
  page: number;
};

export type UserSignupProps = {
  username: string;
  password: string;
  password_confirmation: string;
  email: string;
  customerName: string;
  phone: string;
  role: numbe;
};

export type ChangePasswordProps = {
  username: string;
  password: string;
  password_new: string;
};

export type ForgotPasswordProps = {
  email: string;
};

export type ResetPasswordProps = {
  id: string;
  token: string;
  newPassword: string;
};
