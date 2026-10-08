/**
 * Add-on extension registry (window.memberglutAdmin, printed by PHP before the screens load).
 *
 *   memberglutAdmin.registerSection('plan', { key, title, icon?, desc?, fields: [...] })   // settings | forms | plan | rule
 *   memberglutAdmin.registerRuleTarget({ value, label, fields: [{ key, label, type: 'text'|'number'|'select', options }] })
 *   memberglutAdmin.registerRuleCondition({ value, label, desc, fields: [...] })
 *
 * Field values are saved with the screen; declare them on the server with memberglut_settings_schema,
 * memberglut_forms_schema, memberglut_plan_settings_schema or memberglut_rule_settings_schema.
 */
const reg = () => (typeof window !== 'undefined' && window.memberglutAdmin) || { sections: {}, ruleTargets: [], ruleConditions: [] };

export const sectionsFor = (screen) => (screen && reg().sections[screen]) || [];
export const ruleTargets = () => reg().ruleTargets || [];
export const ruleConditions = () => reg().ruleConditions || [];
