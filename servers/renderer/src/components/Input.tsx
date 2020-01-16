import { useState } from 'react'
import styled, { css } from 'styled-components'

export type InputStatus = 'normal' | 'danger' | 'success'

interface IInputProps {
  type?: 'text' | 'email' | 'password' | 'number'
  id?: string
  name?: string
  value?: string
  placeholder?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  title?: string
  caption?: React.ReactNode
  status: InputStatus,
  autoComplete?: string
  autoCapitalize?: string
  fontSize?: string
  height?: string
}
export default function Input(props: IInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  return (
    <InputContainer>
      {props.title &&
        <InputTitle
          status={props.status}
        >
          {props.title}
        </InputTitle>
      }
      <Inner>
        <InputElement
          type={
            props.type === 'password'
              ? isPasswordVisible ? 'text' : 'password'
              : props.type
          }
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          required
          placeholder={props.placeholder}
          status={props.status}
          autoComplete={props.autoComplete}
          autoCapitalize={props.autoCapitalize}
          fontSize={props.fontSize}
          height={props.height}
        />
      </Inner>
      {props.caption &&
        <Caption
          status={props.status}
        >
          {props.caption}
        </Caption>
      }
    </InputContainer>
  )
}

export const InputContainer = styled.div`
  margin-bottom: .875rem;

  &:last-child {
    margin-bottom: 0;
  }
`

interface IInputTitleProps {
  status: InputStatus
}
export const InputTitle = styled.div<IInputTitleProps>`
  align-items: flex-end;
  color: #343a40;
  display: flex;
  font-size: .6875rem;
  font-weight: 500;
  margin-bottom: .4375rem;
  line-height: 1.5;

  ${(props) => props.status === 'danger' && css`
    color: #f03e3e;
  `}

  ${(props) => props.status === 'success' && css`
    color: #37b24d;
  `}

  svg {
    margin-right: .4em;
  }
`

interface ICaptionProps {
  status: InputStatus
}
const Caption = styled.div<ICaptionProps>`
  color: #868e96;
  font-size: .575rem;
  margin-top: .375rem;
  line-height: 1.4;
  word-break: keep-all;

  ${(props) => props.status === 'danger' && css`
    color: #e03131;
  `}

  ${(props) => props.status === 'success' && css`
    color: #37b24d;
  `}

  a {
    text-decoration: none;
    margin-left: .325em;
    color: #343a40;
  }
`

const Inner = styled.div`
  position: relative;
`

interface IInputElementProps {
  isIcon?: boolean
  status: InputStatus
  fontSize?: string
  height?: string
}
const InputElement = styled.input<IInputElementProps>`
  appearance: none;
  box-shadow: inset 0 0 0 1px #ced4da;
  border: 0;
  border-radius: .125rem;
  font-size: ${(props) => props.fontSize || '.8125rem'};
  flex: 1;
  height: ${(props) => props.height || '2.1875rem'};
  line-height: ${(props) => props.height || '2.1875rem'};
  outline: none;
  padding: 0 .625rem;
  transition: background-color .3s, box-shadow .3s;
  width: 100%;

  ${(props) => props.type === 'password' && css`
    padding-right: 2.35rem;
  `}

  ${(props) => props.isIcon && css`
    padding-left: 2.35rem;
  `}

  &:focus,
  &:valid {
    background-color: #fff;
    box-shadow: inset 0 0 0 1px #495057, inset 0 1px .1875rem #f1f3f5;
  }

  &::placeholder {
    color: #ced4da;
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    appearance: none;
    margin: 0;
  }

  ${(props) => props.status === 'danger' && css`
    box-shadow: inset 0 0 0 1px #f03e3e;

    &:focus,
    &:valid {
      box-shadow: inset 0 0 0 1px #f03e3e, inset 0 1px .1875rem #f1f3f5;
    }
  `}

  ${(props) => props.status === 'success' && css`
    box-shadow: inset 0 0 0 1px #37b24d;

    &:focus,
    &:valid {
      box-shadow: inset 0 0 0 1px #37b24d, inset 0 1px .1875rem #f1f3f5;
    }
  `}
`
