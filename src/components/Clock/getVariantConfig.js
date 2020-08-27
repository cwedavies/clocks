import all from "../../clocks";

const getVariantConfig = (name) => ({ ...all.fancy, ...all[name] });

export default getVariantConfig;
