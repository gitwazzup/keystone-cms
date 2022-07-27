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
          defaultValue: formField === 'name',
        }),
      }
  }
}

/**
 * Naming the export componentBlocks is important because the Admin UI
 * expects to find the components like on the componentBlocks export.
 */
export const componentBlocks: Record<string, ComponentBlock> = {
  title: component({
    preview: (props) => <h1>{props.fields.title.value}</h1>,
    label: 'Titel',
    schema: {
      title: fields.text({
        label: 'Titel',
      }),
    },
  }),
  step: component({
    preview: (props) => {
      console.log(props.fields)
      const elements = props?.fields?.items?.elements
      const hasItems: boolean = elements && elements.length > 0

      return (
        <NotEditable style={{ fontSize: 14, display: 'block' }}>
          {hasItems ? 'Geselecteerde items:' : 'Selecteer items'}
          {hasItems && (
            <ul>
              {elements.map((element, index) => {
                const value = element.fields.type.discriminant
                const label = inputTypes.filter(
                  (field: Option) => field.value === value
                )[0].label
                return <li key={index}>{label}</li>
              })}
            </ul>
          )}
        </NotEditable>
      )
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
