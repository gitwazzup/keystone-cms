import React from 'react'
import {
  NotEditable,
  component,
  fields,
} from '@keystone-6/fields-document/component-blocks'

// naming the export componentBlocks is important because the Admin UI
// expects to find the components like on the componentBlocks export
export const componentBlocks = {
  personalInfo: component({
    preview: (props) => {
      return (
        <div
          style={{
            border: '1px dotted #CBD5E0',
            padding: 12,
          }}>
          <div style={{ color: '#4A5568' }}>{props.fields.content.element}</div>
          <div style={{ color: '#718096' }}>
            <input
              type="checkbox"
              contentEditable="false"
              checked={props.fields.showAddress.value}
              onChange={(event) =>
                props.fields.showAddress.onChange(event.target.checked)
              }
            />
            <label>Show address</label>
          </div>
        </div>
      )
    },
    label: 'Personal info',
    schema: {
      content: fields.child({
        kind: 'block',
        placeholder: 'Intro text...',
        formatting: { inlineMarks: 'inherit', softBreaks: 'inherit' },
        links: 'inherit',
      }),
      showAddress: fields.checkbox({
        label: 'Show address',
        defaultValue: true,
      }),
    },
    chromeless: true,
  }),
}
