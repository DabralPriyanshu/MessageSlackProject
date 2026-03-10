import ENV from "../../config/serverConfig.js";

export const workspaceJoinMail = function (workspace) {
  return {
    from: ENV.MAIL_ID,
    subject: "You have been added to a workspace",
    text: `Congratulations! You have been added to the workspace ${workspace.name}`,
  };
};




