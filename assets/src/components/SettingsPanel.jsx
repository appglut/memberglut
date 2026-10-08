import React, { useEffect, useState } from 'react';
import { __ } from '@wordpress/i18n';
import {
  Input, InputNumber, Button, Switch, Select, Tabs, Radio, DatePicker, ColorPicker, Space, Tag, Tooltip,
} from 'antd';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk, faCopy, faCheck, faTags } from '@fortawesome/free-solid-svg-icons';

/**
 * Generic settings screen: a side nav of sections, one card per section, optional tabs inside a section.
 * Used by Global Settings, the plan editor, the rule editor and Forms & Pages.
 *
 * A section: { key, title, icon, desc, fields: [...], subs: [{ key, title, desc, fields }], render: (ctx) => node, hint }
 * A field:   { key, type, label, tip, placeholder, options, show: (values) => bool, suffix, prefix, min, max, step, rows, divider }
 *
 * Field types: text, email, url, password, textarea, editor, number, price, select, multiselect, tags,
 * switch, radio, cards, date, color, duration, code, info, custom (with render).
 */

/** Pretty “copy to clipboard” chip used for shortcodes. */
export function CopyCode({ code }) {
  const [done, setDone] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(code).then(() => { setDone(true); setTimeout(() => setDone(false), 1500); });
  };
  return (
    <button type="button" className="mg-fs-code" onClick={copy} title={__( 'Click to copy', 'memberglut' )}>
      {code} <FontAwesomeIcon icon={done ? faCheck : faCopy} />
    </button>
  );
}

/** Smart tags shown under email bodies and messages. */
export function SmartTags({ tags, title }) {
  return (
    <div className="mg-fs-tags">
      <div className="mg-fs-tags-title"><FontAwesomeIcon icon={faTags} /> {title || __( 'Smart tags', 'memberglut' )} <span>{__( 'click to copy', 'memberglut' )}</span></div>
      <div className="mg-fs-chips">
        {tags.map((t) => (
          <Tooltip key={t.tag} title={t.label}>
            <button type="button" onClick={() => navigator.clipboard?.writeText(t.tag)}>{t.tag}</button>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}

export function FieldControl({ f, value, onChange, values }) {
  switch (f.type) {
    case 'switch':
      return <Switch checked={!!value} onChange={onChange} />;
    case 'select':
      return <Select value={value} onChange={onChange} options={f.options} placeholder={f.placeholder} style={{ width: '100%' }} showSearch={f.options && f.options.length > 8} optionFilterProp="label" />;
    case 'multiselect':
      return <Select mode="multiple" value={value || []} onChange={onChange} options={f.options} placeholder={f.placeholder} style={{ width: '100%' }} optionFilterProp="label" allowClear />;
    case 'tags':
      return <Select mode="tags" value={value || []} onChange={onChange} placeholder={f.placeholder} style={{ width: '100%' }} tokenSeparators={[',', ' ']} open={false} suffixIcon={null} />;
    case 'textarea':
      return <Input.TextArea rows={f.rows || 3} value={value} placeholder={f.placeholder} onChange={(e) => onChange(e.target.value)} />;
    case 'editor':
      return <Input.TextArea className="mg-editor" rows={f.rows || 6} value={value} placeholder={f.placeholder} onChange={(e) => onChange(e.target.value)} />;
    case 'code':
      return <Input.TextArea className="mg-code-input" rows={f.rows || 5} value={value} placeholder={f.placeholder} onChange={(e) => onChange(e.target.value)} spellCheck={false} />;
    case 'password':
      return <Input.Password value={value} placeholder={f.placeholder} autoComplete="new-password" onChange={(e) => onChange(e.target.value)} />;
    case 'number':
      return <InputNumber min={f.min} max={f.max} step={f.step} value={value} addonAfter={f.suffix} addonBefore={f.prefix} onChange={(v) => onChange(v ?? 0)} style={{ width: f.width || 200 }} />;
    case 'price':
      return <InputNumber min={0} step={0.01} precision={2} value={value} addonBefore={f.prefix || (values && values.currency_symbol) || '$'} onChange={(v) => onChange(v ?? 0)} style={{ width: 220 }} />;
    case 'duration':
      return (
        <Space.Compact style={{ width: '100%' }}>
          <InputNumber min={1} value={value?.length} onChange={(v) => onChange({ ...value, length: v ?? 1 })} style={{ width: 110 }} />
          <Select value={value?.unit} onChange={(u) => onChange({ ...value, unit: u })} style={{ flex: 1 }} options={f.units || UNITS} />
        </Space.Compact>
      );
    case 'radio':
      return (
        <Radio.Group value={value} onChange={(e) => onChange(e.target.value)} optionType="button" buttonStyle="solid">
          {f.options.map((o) => <Radio.Button key={o.value} value={o.value}>{o.label}</Radio.Button>)}
        </Radio.Group>
      );
    case 'cards':
      return (
        <div className="mg-choice-cards">
          {f.options.map((o) => (
            <button key={o.value} type="button" className={value === o.value ? 'active' : ''} onClick={() => onChange(o.value)}>
              {o.icon && <span className="ic"><FontAwesomeIcon icon={o.icon} /></span>}
              <span className="t">{o.label}</span>
              {o.desc && <span className="d">{o.desc}</span>}
            </button>
          ))}
        </div>
      );
    case 'date':
      return <DatePicker value={value ? dayjs(value) : null} onChange={(d) => onChange(d ? d.format('YYYY-MM-DD') : '')} style={{ width: 220 }} />;
    case 'color':
      return <ColorPicker value={value} onChange={(c) => onChange(c.toHexString())} showText />;
    case 'info':
      return <div className="mg-fs-help">{f.text}</div>;
    case 'custom':
      return f.render({ value, onChange, values });
    default:
      return <Input type={f.type === 'email' ? 'email' : 'text'} value={value} placeholder={f.placeholder} prefix={f.prefix} suffix={f.suffix} onChange={(e) => onChange(e.target.value)} />;
  }
}

export const UNITS = [
  { value: 'day', label: __( 'Day(s)', 'memberglut' ) },
  { value: 'week', label: __( 'Week(s)', 'memberglut' ) },
  { value: 'month', label: __( 'Month(s)', 'memberglut' ) },
  { value: 'year', label: __( 'Year(s)', 'memberglut' ) },
];

const WIDE_TYPES = ['textarea', 'editor', 'code', 'cards', 'custom'];

/** Rows of one section, filtered by their `show` condition. */
export function FieldRows({ fields, values, update }) {
  return fields.filter((f) => !f.show || f.show(values)).map((f) => {
    if (f.type === 'heading') {
      return <div key={f.key} className="mg-fs-subhead">{f.label}{f.tip && <span>{f.tip}</span>}</div>;
    }
    const wide = WIDE_TYPES.includes(f.type) || f.wide;
    return (
      <div key={f.key} className={`mg-fs-row ${f.type === 'switch' ? 'is-switch' : ''} ${wide ? 'is-wide' : ''} ${f.full ? 'is-full' : ''}`}>
        <div className="mg-fs-label">
          <div className="mg-fs-label-line"><label>{f.label}</label>{f.badge && <Tag color="pink" bordered={false}>{f.badge}</Tag>}</div>
          {f.tip && <div className="mg-fs-help">{f.tip}</div>}
        </div>
        <div className="mg-fs-control">
          <FieldControl f={f} value={values[f.key]} values={values} onChange={(v) => update(f.key, v)} />
          {f.after && <div className="mg-fs-after">{typeof f.after === 'function' ? f.after(values) : f.after}</div>}
        </div>
      </div>
    );
  });
}

/**
 * Full settings screen with title bar, save button, side nav and section card.
 */
export default function SettingsPanel({
  title, subtitle, titleExtra, back, sections, values, setValues, onSave, saving, saveLabel, initialSection, headerActions,
}) {
  const [dirty, setDirty] = useState(false);
  const [active, setActive] = useState(initialSection || new URLSearchParams(window.location.search).get('tab') || sections[0].key);
  const [subs, setSubs] = useState({});

  useEffect(() => {
    const warn = (e) => { if (dirty) { e.preventDefault(); e.returnValue = ''; } };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  const update = (key, value) => { setValues((v) => ({ ...v, [key]: value })); setDirty(true); };

  const save = async () => {
    const ok = await onSave(values);
    if (ok !== false) setDirty(false);
  };

  const section = sections.find((s) => s.key === active) || sections[0];
  const subSection = section.subs ? (section.subs.find((x) => x.key === subs[section.key]) || section.subs[0]) : null;
  const fields = (subSection || section).fields || [];
  const ctx = { values, update, setValues: (fn) => { setValues(fn); setDirty(true); } };

  return (
    <>
      <div className="mg-fs-top">
        {back && <a href={back.href} className="mg-fs-back">{back.label}</a>}
        <div className="mg-fs-titlebar">
          <div>
            <div className="mg-page-title">{title}</div>
            {subtitle && <div className="mg-page-subtitle">{subtitle}</div>}
            {titleExtra}
          </div>
          <div className="mg-fs-actions">
            {headerActions}
            {dirty && <span className="mg-fs-unsaved">{__( 'Unsaved changes', 'memberglut' )}</span>}
            <Button type="primary" size="large" loading={saving} disabled={!dirty} icon={<FontAwesomeIcon icon={faFloppyDisk} />} onClick={save} className="mg-save-btn">
              {saveLabel || __( 'Save settings', 'memberglut' )}
            </Button>
          </div>
        </div>
      </div>

      <div className="mg-fs-layout">
        <nav className="mg-fs-nav">
          {sections.map((s) => (
            <button key={s.key} type="button" className={s.key === section.key ? 'active' : ''} onClick={() => setActive(s.key)}>
              <span className="ic"><FontAwesomeIcon icon={s.icon} /></span>
              <span>{s.title}</span>
            </button>
          ))}
        </nav>

        <section className="mg-fs-card">
          <div className="mg-fs-card-head">
            <span className="ic"><FontAwesomeIcon icon={section.icon} /></span>
            <div>
              <h2>{section.title}</h2>
              <p>{section.desc}</p>
            </div>
          </div>

          {section.subs && (
            <Tabs activeKey={subSection.key} onChange={(k) => setSubs((p) => ({ ...p, [section.key]: k }))} items={section.subs.map((x) => ({ key: x.key, label: x.title }))} />
          )}
          {subSection && subSection.desc && <div className="mg-fs-note" style={{ margin: '0 0 14px' }}>{subSection.desc}</div>}

          {section.renderTop && section.renderTop(ctx)}
          <FieldRows fields={fields} values={values} update={update} />
          {(subSection || section).render && (subSection || section).render(ctx)}

          {section.hint && <div className="mg-fs-note" style={{ margin: '4px 0 18px' }}>{section.hint}</div>}
        </section>
      </div>
    </>
  );
}
