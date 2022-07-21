import React from 'react'
import {
  component,
  fields,
  NotEditable,
} from '@keystone-6/fields-document/component-blocks'

/**
 * Naming the export componentBlocks is important because the Admin UI
 * expects to find the components like on the componentBlocks export.
 */
export const componentBlocks = {
  name: component({
    preview: (props) => (
      <NotEditable style={{ display: 'block', fontSize: 12 }}>
        Vraag {props.fields.askGender.value ? '' : 'niet '}
        om geslacht.
      </NotEditable>
    ),
    label: 'Naam',
    schema: {
      askGender: fields.checkbox({
        label: 'Vraag om geslacht',
        defaultValue: true,
      }),
    },
  }),
  address: component({
    preview: (props) => (
      <NotEditable style={{ display: 'block', fontSize: 12 }}>
        {props.fields.isRequired.value ? 'Verplicht' : 'Optioneel'} veld.
      </NotEditable>
    ),
    label: 'Adres',
    schema: {
      isRequired: fields.checkbox({
        label: 'is-required',
        defaultValue: true,
      }),
    },
  }),
}
