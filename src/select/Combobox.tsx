import React, { FC, useState, useRef, useEffect, useCallback, MouseEvent, ChangeEvent } from 'react'
import { Input } from '../Input'
import { DropdownInnerRefMethods } from '../Dropdown'
import { SelectBase } from './SelectBase'
import { DoubleAdornment } from './SelectAdornment'
import { SelectProps } from './types'
import { getQaAttribute } from '../utils'
import { filterOptions, getDifferentProps } from './helpers'
import { StyledSelect, selectClasses } from './styles'

export const Combobox: React.FC<SelectProps> = (props) => {
  const {
    value: valueFromProps,
    size,
    disabled = false,
    isOpen = false,
    qa = 'combobox',
    onOpen,
    onChange,
    onFilterChange,
    onClearClick,
  } = props
  const value = valueFromProps ?? ''
  const { inputProps, selectBaseProps, commonProps } = getDifferentProps(props)
  const getQA = getQaAttribute(qa)
  const dropdownRef = useRef<DropdownInnerRefMethods>()
  const inputRef = useRef<HTMLInputElement>(null)

  const [options, setOptions] = useState(props.options)
  const [opened, setOpened] = useState(isOpen && !disabled)
  const [inputValue, setInputValue] = useState('')
  const [isFilterMode, setFilterMode] = useState(false)

  useEffect(() => {
    if (!isFilterMode) {
      const found = options.find((option) => option.value === value)
      setInputValue(found?.name || '')
    }
    if ((isFilterMode && !!inputValue.length) || isOpen) {
      dropdownRef.current.open()
    } else {
      setTimeout(() => dropdownRef.current.close(), 100)
    }
  }, [options, isFilterMode, inputValue, value, isOpen])

  const handleDropdownChange = (opened: boolean) => {
    setOpened(opened)
    onOpen && onOpen(opened)
  }

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event
    setFilterMode(true)
    setInputValue(target.value)
    if (!onFilterChange) {
      setOptions(filterOptions(props.options, target.value))
      return
    }
    onFilterChange(event)
    setOptions(props.options)
  }

  const handleClearClick = (event: MouseEvent<SVGElement>) => {
    if (disabled) return
    event.stopPropagation()
    setInputValue('')
    setOptions(props.options)
    onClearClick(event)
  }

  const handleInputClick = (event: MouseEvent<HTMLInputElement>) => {
    if (disabled) event.stopPropagation()
  }

  const innerOnChange = useCallback(
    (event, option) => {
      setFilterMode(false)
      onChange(event, option)
    },
    [onChange],
  )

  const ComboboxInput = (
    <Input
      {...commonProps}
      qa={getQA('input', disabled && 'disabled')}
      inputRef={inputRef}
      value={inputValue}
      inputProps={{ className: selectClasses.input }}
      endAdornment={
        <DoubleAdornment opened={opened} clearable={!!inputValue.length} size={size} onClick={handleClearClick} />
      }
      onClick={handleInputClick}
      onChange={handleFilterChange}
      {...inputProps}
    />
  )

  return (
    <StyledSelect opened={opened}>
      <SelectBase
        {...commonProps}
        getQA={getQA}
        highlighted
        multiple={false}
        value={value}
        options={options}
        action={ComboboxInput}
        innerRef={dropdownRef}
        onChange={innerOnChange}
        inputValue={inputValue}
        onDropdownChange={handleDropdownChange}
        {...selectBaseProps}
      />
    </StyledSelect>
  )
}
