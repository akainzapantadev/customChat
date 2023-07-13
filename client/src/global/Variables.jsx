const renderUrl = import.meta.env.VITE_REACT_APP_RENDER_URL;
const localUrl = import.meta.env.VITE_REACT_APP_LOCAL_URL;
const mode = import.meta.env.VITE_REACT_APP_MODE;
const link = mode === "dev" ? localUrl : renderUrl;

export const global = {
  renderUrl,
  localUrl,
  mode,
  link,
};

export default global;
