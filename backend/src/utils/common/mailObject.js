import ENV from "../../config/serverConfig.js";

export const workspaceJoinMail = function (workspace) {
  return {
    from: ENV.MAIL_ID,
    subject: "You have been added to a workspace",
    text: `Congratulations! You have been added to the workspace ${workspace.name}`,
  };
};
export const verifyEmailMail = function (verificationToken) {
  return {
    from: ENV.MAIL_ID,
    subject: "Welcome to the app. Please verify your email",
    text: `
      Welcome to the app. Please verify your email by clicking on the link below:
     ${ENV.APP_LINK}/verify/${verificationToken}
    `,
  };
};
