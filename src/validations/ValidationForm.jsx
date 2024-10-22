// ============================  Validate for name ============================
export const validateName = (name) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!name) return "Name is required.";
    if (!nameRegex.test(name)) return "Name must contain only letters.";
    return "";
  };
  
  //============================ Validate email ============================
  export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required.";
    if (!emailRegex.test(email)) return "Please enter a valid email.";
    return "";
  };
  
  //============================ Validate username============================
  export const validateUsername = (username) => {
    const usernameRegex = /^[A-Za-z0-9]+$/;
    if (!username) return "Username is required.";
    if (!usernameRegex.test(username))
      return "Username must contain only letters and numbers.";
    return "";
  };
  
  //============================ Validate password ============================
  export const validatePassword = (password) => {
    if (!password) return "Password is required.";
    if (password.length < 6)
      return "Password must be at least 6 characters long.";
    return "";
  };
  
  //============================ Validate contact number ============================
  export const validateContactNumber = (contactNumber) => {
    const contactNumberRegex = /^[0-9]{0,10}$/;
    if (!contactNumber) return "";
    if (!contactNumberRegex.test(contactNumber))
      return "Contact number must be a number and up to 10 digits.";
    return "";
  };
  