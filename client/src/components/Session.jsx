function Session() {
  var currentDate = new Date();
  // eslint-disable-next-line no-constant-condition
  var logSession = null ? "" : JSON.parse(localStorage.getItem("logSession"));
  try {
    if (logSession.user.id && Date.parse(currentDate) < logSession.expiresAt) {
      return logSession;
    } else {
      localStorage.removeItem("logSession");
      // console.log("session expired");
      return 0;
    }
  } catch (error) {
    // console.log("no log session found");
    return 0;
  }
}

export const sessionUser = localStorage.getItem("logSession");

export default Session;
