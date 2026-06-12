import React, { useState, useRef } from 'react';

import { TimePicker } from 'antd';
import type { NoUndefinedRangeValueType } from '@rc-component/picker';
import dayjs from 'dayjs';
import './demo.css';
const format = 'HH:mm:ss';

type Status = '' | 'error' | 'warning';

const App: React.FC = () => {
  const [startTime, setStartTime] = useState<dayjs.Dayjs>(
    dayjs('12:08:23', 'HH:mm:ss')
  );
  const [endTime, setEndTime] = useState<dayjs.Dayjs>(
    dayjs('12:08:23', 'HH:mm:ss')
  );
  const ref = useRef(null);
  const [status, setStatus] = useState<Status>('');
  const [wiggle, setWiggle] = useState('');

  function onChange(props: NoUndefinedRangeValueType) {
    let start: dayjs.Dayjs = dayjs(props[0]);
    let end: dayjs.Dayjs = dayjs(props[1]);
    if (start.isAfter(end)) {
      setStatus('warning');
      setWiggle('wiggle');
      return;
    }
    setStartTime(props[0]);
    setEndTime(props[1]);
  }
  function onFocus() {
    setStatus('');
  }
  return (
    <>
      <div>
        开始时间{startTime.format('YYYY-MM-DD HH:mm:ss')}
        <br />
        结束时间{endTime.format('YYYY-MM-DD HH:mm:ss')}
      </div>
      <div className={`time-wrapper ${wiggle}`} ref={ref}>
        <TimePicker.RangePicker
          order={false}
          value={[startTime, endTime]}
          defaultValue={[startTime, endTime]}
          onChange={onChange}
          format={format}
          status={status}
          onFocus={onFocus}
        />
      </div>
    </>
  );
};

export default App;
