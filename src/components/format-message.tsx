import { JSX, memo } from 'react'

// @ts-expect-error Cannot find module
import en from '@/translations/en.json'

export interface FormatMessageProps {
  id: string
  value?: string
}

const valRegex = /{{\w+}}/g

function FormatMessage(props: FormatMessageProps): JSX.Element {
  const { id, value } = props
  let msg = en[id]

  if (valRegex.test(msg) && value) {
    msg = msg.replace(valRegex, value)
  }

  return msg
}

export default memo(FormatMessage)
