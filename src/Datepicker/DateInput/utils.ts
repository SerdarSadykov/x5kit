import {useContext, useEffect, useRef, useState} from 'react';
import {format, isValid, parse} from 'date-fns';

import {startOfDay, useUpdateEffect} from 'common';

import {DatepickerContext} from 'Datepicker';

import type {InputInternalProps} from 'Input';
import type {BaseCalendarValue} from 'Calendar';
import type {ChangeEventHandler, FocusEventHandler, InputHTMLAttributes, KeyboardEventHandler} from 'react';

type Segment = {
  label: string;
  token: string;
  end: string;
  value: string;
};

const parseSegments = (formatStr: string) => {
  const newSegments: Segment[] = [];

  const matches = formatStr.matchAll(/([дdмmгy]{1,4})([^дdмmгy]*)/gi);

  for (const [, label, end] of matches) {
    const token = label.replace(/д|м|г/gi, part => {
      switch (part.toLowerCase()) {
        case 'д':
          return 'd';
        case 'м':
        case 'm':
          return 'M';
        case 'г':
          return 'y';
      }

      return part;
    });

    newSegments.push({token, label, end, value: ''});
  }

  return newSegments;
};

const useSegments = () => {
  const {formatStr, value, onChange, referenceDate} = useContext(DatepickerContext);

  const inputValue = useRef<BaseCalendarValue>();

  const [segments, setSegmentsValue] = useState<Segment[]>(() => parseSegments(formatStr));

  const setSegments = (newSegments: Segment[]) => {
    setSegmentsValue(newSegments);

    const newValue: BaseCalendarValue = [undefined, undefined];

    for (let i = 0; i < newSegments.length; i += 3) {
      const [segmentFormat, segmentValue] = newSegments.slice(i, i + 3).reduce(
        (acc, item) => {
          acc[0] += item.token;
          acc[1] += item.value;

          return acc;
        },
        ['', '']
      );

      const segmentDate = parse(segmentValue, segmentFormat, referenceDate);

      newValue[i / 3] = isValid(segmentDate) ? startOfDay(segmentDate) : undefined;
    }

    inputValue.current = newValue;

    onChange(newValue);
  };

  useEffect(() => {
    if (value.join() === inputValue.current?.join()) {
      return;
    }

    const newSegments = [...segments];

    for (const indx in newSegments) {
      const segment = newSegments[indx];
      const segmentDate = value[+indx >= 3 ? 1 : 0];

      segment.value = segmentDate ? format(segmentDate, segment.token) : '';
    }

    setSegmentsValue(newSegments);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useUpdateEffect(() => {
    setSegmentsValue(parseSegments(formatStr));
  }, [formatStr]);

  return {segments, setSegments};
};

export const useInputComponent = (inputProps: InputInternalProps['inputProps']) => {
  const {segments, setSegments} = useSegments();

  const [step, setStepValue] = useState<number>(-1);
  const [inputValue, setInputValue] = useState<string>('');

  const setStep = (newStep: number) => {
    const maxStep = segments.length - 1;

    if (newStep < 0) {
      newStep = 0;
    } else if (newStep >= maxStep) {
      newStep = maxStep;
    }

    setStepValue(newStep);
  };

  const onFocus: FocusEventHandler<HTMLInputElement> = e => {
    inputProps?.onFocus?.(e);

    setStepValue(0);
  };

  const onBlur: FocusEventHandler<HTMLInputElement> = e => {
    inputProps?.onBlur?.(e);

    setInputValue('');
    setStepValue(-1);
  };

  const onKeyDown: KeyboardEventHandler = ({key}) => {
    if (key === 'ArrowLeft' && step > 0) {
      setStep(step - 1);
      return;
    }

    if (key === 'ArrowRight') {
      setStep(step + 1);
      return;
    }

    if (key === 'Backspace' && !inputValue) {
      const newSegments = [...segments];

      if (segments[step].value) {
        newSegments[step].value = '';
      } else {
        newSegments[step ? step - 1 : 0].value = '';
        setStep(step - 1);
      }

      setSegments(newSegments);
      setInputValue('');

      return;
    }

    if (key === 'Escape') {
      (window.document.activeElement as HTMLInputElement)?.blur();
    }
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = ({target}) => {
    const newValue = target.value.replace(/[^\d]+/, '');

    const newSegments = [...segments];
    newSegments[step].value = newValue;

    setSegments(newSegments);

    const isStepEnd = newValue.length >= newSegments[step].label.length;

    if (isStepEnd) {
      setInputValue('');
      setStep(step + 1);
      return;
    }

    setInputValue(target.value);
  };

  const componentProps: InputHTMLAttributes<HTMLInputElement> = {
    ...inputProps,

    onChange,
    onKeyDown,
    onFocus,
    onBlur,

    value: inputValue,
  };

  return {step, componentProps, segments};
};
