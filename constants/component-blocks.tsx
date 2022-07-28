import React from 'react'
import {
  component,
  ComponentBlock,
  fields,
  FormField,
  NotEditable,
} from '@keystone-6/fields-document/component-blocks'

enum Input {
  NAME = 'Naam',
  ADDRESS = 'Adres',
  CONTACT = 'Contact',
  COMMENTS = 'Opmerkingen',
  DROPDOWN = 'Dropdown',
  CHECKBOX = 'Checkbox',
}

interface Option {
  label: string
  value: string
}

function getInputs(): Option[] {
  return Object.entries(Input).map(([key, name]) => ({
    label: name,
    value: key.toLowerCase(),
  }))
}

function getOptions(
  formField: Input
): Record<string, FormField<boolean | string, undefined>> {
  switch (formField) {
    case Input.CONTACT:
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
    case Input.DROPDOWN:
      return {
        label: fields.text({
          label: 'Label',
        }),
        options: fields.text({
          label: 'Opties',
        }),
        isRequired: fields.checkbox({
          label: 'Verplicht',
          defaultValue: false,
        }),
      }
    case Input.CHECKBOX:
      return {
        label: fields.text({
          label: 'Label',
        }),
        text: fields.text({
          label: 'Text',
        }),
        isRequired: fields.checkbox({
          label: 'Verplicht',
          defaultValue: false,
        }),
      }
    default:
      return {
        isRequired: fields.checkbox({
          label: 'Verplicht',
          defaultValue: formField === Input.NAME,
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
  form: component({
    preview: (props) => {
      const elements = props?.fields?.items?.elements
      const hasItems: boolean = elements && elements.length > 0

      return (
        <NotEditable style={{ fontSize: 14, display: 'block' }}>
          {hasItems ? 'Geselecteerde items:' : 'Selecteer items'}
          {hasItems && (
            <ul>
              {elements.map((element, index) => {
                const value = element.fields.type.discriminant
                const label = getInputs().filter(
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
              options: getInputs(),
              defaultValue: 'name',
            }),
            {
              name: fields.object(getOptions(Input.NAME)),
              address: fields.object(getOptions(Input.ADDRESS)),
              contact: fields.object(getOptions(Input.CONTACT)),
              comments: fields.object(getOptions(Input.COMMENTS)),
              dropdown: fields.object(getOptions(Input.DROPDOWN)),
              checkbox: fields.object(getOptions(Input.CHECKBOX)),
            }
          ),
        })
      ),
    },
  }),
}
