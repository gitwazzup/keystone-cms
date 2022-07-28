import React from 'react'
import {
  component,
  ComponentBlock,
  fields,
  FormField,
  NotEditable,
} from '@keystone-6/fields-document/component-blocks'

enum InputLabel {
  NAME = 'Naam',
  ADDRESS = 'Adres',
  CONTACT = 'Contact',
  COMMENTS = 'Opmerkingen',
  DROPDOWN = 'Dropdown',
  CHECKBOX = 'Checkbox',
  TEXT = 'Tekst veld',
}

interface Input {
  label: string
  value: string
}

function getInputs(): Input[] {
  return Object.entries(InputLabel).map(([key, name]) => ({
    label: name,
    value: key.toLowerCase(),
  }))
}

function getOptions(
  formField: InputLabel
): Record<string, FormField<boolean | string, undefined>> {
  switch (formField) {
    case InputLabel.CONTACT:
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
    case InputLabel.DROPDOWN:
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
    case InputLabel.CHECKBOX:
    case InputLabel.TEXT:
      return {
        label: fields.text({
          label: 'Label',
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
          defaultValue: formField === InputLabel.NAME,
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
              {elements.map((element, index: number) => {
                const value: string = element.fields.type.discriminant
                const label: string = getInputs().filter(
                  (field: Input) => field.value === value
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
              name: fields.object(getOptions(InputLabel.NAME)),
              address: fields.object(getOptions(InputLabel.ADDRESS)),
              contact: fields.object(getOptions(InputLabel.CONTACT)),
              comments: fields.object(getOptions(InputLabel.COMMENTS)),
              dropdown: fields.object(getOptions(InputLabel.DROPDOWN)),
              checkbox: fields.object(getOptions(InputLabel.CHECKBOX)),
              text: fields.object(getOptions(InputLabel.TEXT)),
            }
          ),
        })
      ),
    },
  }),
}
