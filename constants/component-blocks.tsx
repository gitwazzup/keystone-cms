import React from 'react'
import {
  component,
  ComponentBlock,
  fields,
  FormField,
  NotEditable,
} from '@keystone-6/fields-document/component-blocks'

type Input = 'name' | 'address' | 'contact' | 'comments'

interface Option {
  label: string
  value: string
}

const inputTypes: Option[] = [
  {
    label: 'Naam',
    value: 'name',
  },
  {
    label: 'Adres',
    value: 'address',
  },
  {
    label: 'Contact',
    value: 'contact',
  },
  {
    label: 'Opmerkingen',
    value: 'comments',
  },
]

function getOptions(
  formField: Input
): Record<string, FormField<boolean, undefined>> {
  switch (formField) {
    case 'contact':
      return {
        mailIsRequired: fields.checkbox({
          label: 'Verplicht e-mail',
          defaultValue: true,
        }),
        phoneIsRequired: fields.checkbox({
          label: 'Verplicht telefoon',
          defaultValue: false,
        }),
      }
    default:
      return {
        [`${formField}isRequired`]: fields.checkbox({
          label: 'Verplicht',
          defaultValue: false,
        }),
      }
  }
}

/**
 * Naming the export componentBlocks is important because the Admin UI
 * expects to find the components like on the componentBlocks export.
 */
export const componentBlocks: Record<string, ComponentBlock> = {
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
  step: component({
    preview: (props) => {
      const elements = props?.fields?.items?.elements
      const hasItems = elements && elements.length > 0
      const content = hasItems ? (
        <div>
          <p>Geselecteerde items:</p>
          <ul>
            {elements.map((element, index) => {
              const value = element.fields.type.discriminant
              const label = inputTypes.filter(
                (field: Option) => field.value === value
              )[0].label
              return <li key={index}>{label}</li>
            })}
          </ul>
        </div>
      ) : (
        <p>Selecteer items.</p>
      )

      return <NotEditable style={{ fontSize: 14 }}>{content}</NotEditable>
    },
    label: 'Formulier',
    schema: {
      items: fields.array(
        fields.object({
          type: fields.conditional(
            fields.select({
              label: '',
              options: inputTypes,
              defaultValue: 'name',
            }),
            {
              name: fields.object(getOptions('name')),
              address: fields.object(getOptions('address')),
              contact: fields.object(getOptions('contact')),
              comments: fields.object(getOptions('comments')),
            }
          ),
        })
      ),
    },
  }),
}
