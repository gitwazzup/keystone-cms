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
        label: 'Verplicht veld',
        defaultValue: true,
      }),
    },
  }),
  contact: component({
    preview: (props) => (
      <NotEditable style={{ display: 'block', fontSize: 12 }}>
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          <li>
            E-mail is een{' '}
            {props.fields.mailIsRequired.value ? 'verplicht' : 'optioneel'}{' '}
            veld.
          </li>
          <li>
            Telefoon is een{' '}
            {props.fields.phoneIsRequired.value ? 'verplicht' : 'optioneel'}{' '}
            veld.
          </li>
        </ul>
      </NotEditable>
    ),
    label: 'Contact',
    schema: {
      mailIsRequired: fields.checkbox({
        label: 'Verplicht e-mail',
        defaultValue: true,
      }),
      phoneIsRequired: fields.checkbox({
        label: 'Verplicht telefoon',
        defaultValue: false,
      }),
    },
  }),
  comments: component({
    preview: (props) => (
      <NotEditable style={{ display: 'block', fontSize: 12 }}>
        {props.fields.isRequired.value ? 'Verplicht' : 'Optioneel'} veld.
      </NotEditable>
    ),
    label: 'Opmerkingen',
    schema: {
      isRequired: fields.checkbox({
        label: 'Verplicht',
        defaultValue: false,
      }),
    },
  }),
}
