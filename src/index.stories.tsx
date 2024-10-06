/* eslint-disable @typescript-eslint/no-explicit-any */
import {linkTo} from '@storybook/addon-links';

import badgeMeta, {Badge} from './badge/Badge.stories';
import badgeDotMeta, {BadgeDot} from './badge/BadgeDot.stories';
import bannerMeta, {Banner, WithAction, WithActionNewLine} from './banner/Banner.stories';
import buttonMeta, {Button} from './button/Button.stories';
import iconButtonMeta, {IconButton} from './button/IconButton.stories';
import calendarMeta, {Calendar} from './calendar/Calendar.stories';
import rangeCalendarMeta, {RangeCalendar} from './calendar/RangeCalendar.stories';
import captionMeta, {Caption} from './caption/Caption.stories';
import checkboxMeta, {Checkbox} from './checkbox/Checkbox.stories';
import checkboxTreeMeta, {CheckboxTree} from './checkboxTree/CheckboxTree.stories';
import chipMeta, {Chip} from './chip/Chip.stories';
import datepickerMeta, {Datepicker} from './datepicker/Datepicker.stories';
import rangeDatepickerMeta, {RangeDatepicker} from './datepicker/RangeDatepicker.stories';
import dropdownMeta, {Dropdown} from './dropdown/Dropdown.stories';
import fileUploaderMeta, {FileUploader} from './fileUploader/FileUploader.stories';
import iconsMeta, {Icons} from './icons/Icons.stories';
import inputMeta, {Input, MasketInput} from './input/Input.stories';
import linkMeta, {Link} from './link/Link.stories';
import loaderMeta, {Loader} from './loader/Loader.stories';
import modalMeta, {Modal, ModalPopup} from './modal/Modal.stories';
import passwordInputMeta, {PasswordInput} from './passwordInput/PasswordInput.stories';
import radioMeta, {Radio} from './radio/Radio.stories';
import searchInputMeta, {SearchInput} from './searchInput/SearchInput.stories';
import segmentedControlMeta, {SegmentedControl} from './segmentedControl/SegmentedControl.stories';
import selectMeta, {Select, SelectFetch, SelectTree, SelectVirtualized} from './select/Select.stories';
import snackbarMeta, {Snackbar} from './snackbar/Snackbar.stories';
import sidebarMeta, {SidebarMenu} from './sidebarMenu/SidebarMenu.stories';
import switchMeta, {Switch} from './switch/Switch.stories';
import tabsMeta, {Tabs, TabList} from './tabs/Tabs.stories';
import textareaMeta, {Textarea} from './textarea/Textarea.stories';
import tooltipMeta, {Tooltip} from './tooltip/Tooltip.stories';
import typographyMeta, {Typography} from './typography/Typography.stories';

import type {Meta} from '@storybook/react/*';

export const All: React.FC = () => {
  return (
    <div style={{position: 'relative'}}>
      <SidebarMenu {...(sidebarMeta.args as any)} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          paddingLeft: 70,
          maxHeight: '100vh',
          overflow: 'auto',
        }}
      >
        <div>
          <Typography variant="h2">Все компоненты</Typography>
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2" onClick={linkTo('Badge')} style={{cursor: 'pointer'}}>
            Badge
          </Typography>
          <Badge {...badgeMeta.args} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2" onClick={linkTo('BadgeDot')} style={{cursor: 'pointer'}}>
            BadgeDot
          </Typography>
          <BadgeDot {...badgeDotMeta.args} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2" onClick={linkTo('Banner')} style={{cursor: 'pointer'}}>
            Banner
          </Typography>
          <Banner {...bannerMeta.args} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2" onClick={linkTo('Banner', 'with-action')} style={{cursor: 'pointer'}}>
            Banner with action
          </Typography>
          <Banner {...WithAction.args} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography
            as="h2"
            variant="h2"
            onClick={linkTo('Banner', 'with-action-new-line')}
            style={{cursor: 'pointer'}}
          >
            Banner with action new line
          </Typography>
          <Banner {...WithActionNewLine.args} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2" onClick={linkTo('Button')} style={{cursor: 'pointer'}}>
            Button
          </Typography>
          <Button {...(buttonMeta.args as any)} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2" onClick={linkTo('Button', 'icon-button')} style={{cursor: 'pointer'}}>
            IconButton
          </Typography>
          <IconButton {...(iconButtonMeta.args as any)} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2" onClick={linkTo('Chip')} style={{cursor: 'pointer'}}>
            Chip
          </Typography>
          <Chip {...chipMeta.args} />
        </div>
        <div>
          <Typography as="h2" variant="h2" onClick={linkTo('Dropdown')} style={{cursor: 'pointer'}}>
            Dropdown
          </Typography>
          <Dropdown {...(dropdownMeta.args as any)} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2" onClick={linkTo('Input')} style={{cursor: 'pointer'}}>
            Input
          </Typography>
          <Input {...(inputMeta.args as any)} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2" onClick={linkTo('Input', 'masket-input')} style={{cursor: 'pointer'}}>
            Input + mask
          </Typography>
          <Input {...(MasketInput.args as any)} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2" onClick={linkTo('Input', 'search-input')} style={{cursor: 'pointer'}}>
            SearchInput
          </Typography>
          <SearchInput {...(searchInputMeta.args as any)} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2" onClick={linkTo('Input', 'password-input')} style={{cursor: 'pointer'}}>
            PasswordInput
          </Typography>
          <PasswordInput {...(passwordInputMeta.args as any)} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2" onClick={linkTo('Textarea')} style={{cursor: 'pointer'}}>
            Textarea
          </Typography>
          <Textarea {...(textareaMeta.args as any)} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2">
            <span onClick={linkTo('Select')} style={{cursor: 'pointer'}}>
              Select
            </span>
          </Typography>
          <Select {...(selectMeta.args as any)} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2">
            <span onClick={linkTo('Select', 'select-tree')} style={{cursor: 'pointer'}}>
              Select tree
            </span>
          </Typography>
          <Select {...(SelectTree.args as any)} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2">
            <span onClick={linkTo('Select', 'select-fetch')} style={{cursor: 'pointer'}}>
              Select + async fetch options
            </span>
          </Typography>
          <SelectFetch {...(selectMeta.args as any)} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2">
            <span onClick={linkTo('Select', 'select-virtualized')} style={{cursor: 'pointer'}}>
              Select virtualized
            </span>
          </Typography>
          <Select {...(SelectVirtualized.args as any)} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2" onClick={linkTo('Radio')} style={{cursor: 'pointer'}}>
            Radio
          </Typography>
          <Radio {...radioMeta.args} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2" onClick={linkTo('Switch')} style={{cursor: 'pointer'}}>
            Switch
          </Typography>
          <Switch {...switchMeta.args} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2" onClick={linkTo('Checkbox')} style={{cursor: 'pointer'}}>
            Checkbox
          </Typography>
          <Checkbox {...checkboxMeta.args} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2" onClick={linkTo('CheckboxTree')} style={{cursor: 'pointer'}}>
            CheckboxTree
          </Typography>
          <CheckboxTree {...(checkboxTreeMeta.args as any)} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2" onClick={linkTo('Datepicker')} style={{cursor: 'pointer'}}>
            Datepicker
          </Typography>
          <Datepicker {...(datepickerMeta.args as any)} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography
            as="h2"
            variant="h2"
            onClick={linkTo('Datepicker', 'range-datepicker')}
            style={{cursor: 'pointer'}}
          >
            RangeDatepicker
          </Typography>
          <RangeDatepicker {...(rangeDatepickerMeta.args as any)} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2" onClick={linkTo('FileUploader')} style={{cursor: 'pointer'}}>
            FileUploader
          </Typography>
          <FileUploader {...(fileUploaderMeta.args as any)} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2" onClick={linkTo('Calendar')} style={{cursor: 'pointer'}}>
            Calendar
          </Typography>
          <Calendar {...(calendarMeta.args as any)} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2" onClick={linkTo('Calendar', 'range-calendar')} style={{cursor: 'pointer'}}>
            RangeCalendar
          </Typography>
          <RangeCalendar {...(rangeCalendarMeta.args as any)} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2" onClick={linkTo('Caption')} style={{cursor: 'pointer'}}>
            Caption
          </Typography>
          <Caption {...captionMeta.args} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2" onClick={linkTo('SegmentedControl')} style={{cursor: 'pointer'}}>
            SegmentedControl
          </Typography>
          <SegmentedControl {...(segmentedControlMeta.args as any)} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2" onClick={linkTo('Snackbar')} style={{cursor: 'pointer'}}>
            Snackbar
          </Typography>
          <Snackbar {...(snackbarMeta.args as any)} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2" onClick={linkTo('Tabs')} style={{cursor: 'pointer'}}>
            Tabs
          </Typography>
          <Tabs {...(tabsMeta.args as any)} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2" onClick={linkTo('Tabs', 'tab-list')} style={{cursor: 'pointer'}}>
            Tabs List
          </Typography>
          <TabList {...(tabsMeta.args as any)} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2" onClick={linkTo('Tooltip')} style={{cursor: 'pointer'}}>
            Tooltip
          </Typography>
          <Tooltip {...(tooltipMeta.args as any)} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2" onClick={linkTo('Link')} style={{cursor: 'pointer'}}>
            Link
          </Typography>
          <Link {...linkMeta.args} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2" onClick={linkTo('Loader')} style={{cursor: 'pointer'}}>
            Loader
          </Typography>
          <Loader {...loaderMeta.args} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2" onClick={linkTo('Modal')} style={{cursor: 'pointer'}}>
            Modal
          </Typography>
          <Modal {...(modalMeta.args as any)} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2" onClick={linkTo('Modal', 'modal-popup')} style={{cursor: 'pointer'}}>
            Modal Popup
          </Typography>
          <Modal {...(ModalPopup.args as any)} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2" onClick={linkTo('Typography')} style={{cursor: 'pointer'}}>
            Typography
          </Typography>
          <Typography {...typographyMeta.args} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2" onClick={linkTo('Icons')} style={{cursor: 'pointer'}}>
            Icons
          </Typography>
          <Icons {...iconsMeta.args} />
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof All> = {
  title: 'All',
  component: All,
  tags: ['!autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
