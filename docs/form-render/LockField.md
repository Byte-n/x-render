---
order: -1
toc: OTHER
title: 锁定字段值
mobile: false
group:
  title: 其他
  order: 5
---

```jsx
/**
 * transform: true
 * defaultShowCode: false
 */
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import FormRender, { useForm } from 'form-render';
import schema from './schema/lockField';
import { LockOutlined, LockTwoTone, UnlockOutlined } from '@ant-design/icons';
import { Button } from 'antd';

export default () => {
  const form = useForm();

  const onFinish = (formData) => {
    console.log('formData:', formData);
  };
  const [pathMap, setPathMap] = useState({});
  const globalProps = useMemo(() => {
    const updateLock = (path, lock) => {
      setPathMap({ ...pathMap, [path]: lock });
    }
    return { locks: { paths: pathMap, updateLock } };
  }, [pathMap, setPathMap]);
  return (
    <FormRender
      form={form}
      schema={schema}
      onFinish={onFinish}
      maxWidth={360}
      footer={true}
      globalProps={globalProps}
      widgets={{ BatchUpdateFormFieldLabel }}
      ProxyComponent={ProxyComponent}

    />
  );
}

function ProxyComponent (props) {
  const { Widget, opt, name } = props;
  if ('BatchUpdateFormFieldLabel' === name) {
    return <Widget {...opt} />;
  }
  const { addons: { dataPath, globalProps: { locks } } } = opt;
  if (locks.paths[dataPath]) {
    return <LockOutlined size="small" />;
  }
  return <Widget {...opt} />;
}

function BatchUpdateFormFieldLabel (props) {
  const { schema, addons } = props;
  const { globalProps: { locks: { paths, updateLock } }, dataPath } = addons;
  const lock = paths[dataPath];
  const btn = useRef();
  const click = useCallback(() => updateLock(dataPath, !lock), [lock, updateLock, dataPath]);
  const Comp = lock ? LockOutlined : UnlockOutlined;
  return (
    <div style={{ display: 'flex', gap: '0.5em', marginRight: '0.5em' }}>
      <label>
        {/*这样写可以用到ant中的css样式*/}
        {schema.title}
      </label>
      <Comp
        size="small"
        style={{ color: lock ? 'red' : 'green' }}
        onClick={click}
      />
    </div>
  );
};
```
