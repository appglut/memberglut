/**
 * Add-on extension registry (window.memberglutAdmin, printed by PHP before the screens load).
 *
 *   memberglutAdmin.registerSection('plan', { key, title, icon?, desc?, fields: [...] })   // settings | forms | plan | rule
 *   memberglutAdmin.registerRuleTarget({ value, label, fields: [{ key, label, type: 'text'|'number'|'select', options }] })
 *   memberglutAdmin.registerRuleCondition({ value, label, desc, fields: [...] })
 *   memberglutAdmin.registerFieldOption({ key, label, tip, type, options, types?, core?, render? })  // registration field editor
 *   memberglutAdmin.registerScreen(key, { component, active, wide })                              // add-on admin screens
 *   memberglutAdmin.registerMenuItem({ key, label, href, icon, after, pages })                    // side menu
 *   memberglutAdmin.registerToolbar(screen, { key, render: (ctx) => node })                       // header buttons: coupons, member
 *
 * Coupon fields: memberglutAdmin.registerSection('coupon', { key, title, fields }) + memberglut_coupon_settings_schema.
 *
 * Field values are saved with the screen; declare them on the server with memberglut_settings_schema,
 * memberglut_forms_schema, memberglut_plan_settings_schema or memberglut_rule_settings_schema.
 */
const reg = () => (typeof window !== 'undefined' && window.memberglutAdmin) || { sections: {}, ruleTargets: [], ruleConditions: [], fieldOptions: [] };

export const sectionsFor = (screen) => (screen && reg().sections[screen]) || [];
export const ruleTargets = () => reg().ruleTargets || [];
export const ruleConditions = () => reg().ruleConditions || [];
export const fieldOptions = () => reg().fieldOptions || [];
export const toolbarFor = (screen) => ((reg().toolbars || {})[screen]) || [];
