const reg = () => typeof window !== "undefined" && window.memberglutAdmin || { sections: {}, ruleTargets: [], ruleConditions: [], fieldOptions: [] };
const sectionsFor = (screen) => screen && reg().sections[screen] || [];
const ruleTargets = () => reg().ruleTargets || [];
const ruleConditions = () => reg().ruleConditions || [];
const fieldOptions = () => reg().fieldOptions || [];
const toolbarFor = (screen) => (reg().toolbars || {})[screen] || [];
export {
  ruleTargets as a,
  fieldOptions as f,
  ruleConditions as r,
  sectionsFor as s,
  toolbarFor as t
};
