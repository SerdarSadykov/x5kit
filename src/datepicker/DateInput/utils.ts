import  {
  ChangeEventHandler,
  FocusEventHandler,
  InputHTMLAttributes,
  KeyboardEventHandler,
  useContext,
  useEffect,
  useState,
} from 'react';
import {isValid, parse, startOfDay, startOfToday} from 'date-fns';

import {BaseCalendarValue} from 'calendar';
import {InputInternalProps,} from 'input';
import {DatepickerContext} from 'datepicker';

import {Segment} from './types';


const useSegments = () => {
  const {format, value, onChange} = useContext(DatepickerContext);

  const [segments, setSegmentsValue] = useState<Segment[]>([]);

  const setSegments = (newSegments: Segment[]) => {
    setSegmentsValue(newSegments);

    const newValue = [];
    const referenceDate = startOfToday();

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

      newValue.push(isValid(segmentDate) ? startOfDay(segmentDate) : undefined);
    }

    onChange(newValue as BaseCalendarValue);
  };

  useEffect(() => {
    const newSegments: Segment[] = [];

    const matches = format.matchAll(/([дdмmгy]{1,4})([^дdмmгy]*)/gi);

    for (const [, label, end] of matches) {
      const token = label.replaceAll(/д|м|г/gi, part => {
        switch (part.toLowerCase()) {
          case 'д':
            return 'd';
          case 'м':
            return 'm';
          case 'г':
            return 'y';
        }

        return part;
      });

      newSegments.push({token, label, end, value: ''});
    }

    setSegmentsValue(newSegments);
  }, [format]);

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
