import styled, { css } from 'app/styled-components';

export const BorderRadius = styled<
  {
    hasUrl: boolean;
  },
  'div'
>('div')`
  transition: 0.3s ease all;
  border-radius: 4px;
  border: 1px solid #4f5459;
  font-size: 0.75rem;
  margin-right: 1rem;

  display: flex;

  ${props =>
    props.hasUrl &&
    css`
      &:hover {
        background-color: #4f5459;
      }
    `};
`;

export const Text = styled.span`
  display: inline-block;
  font-weight: 0.875rem;

  color: rgba(255, 255, 255, 0.6);
  border-radius: 4px;
  padding: 3px 5px;
`;

export const Icon = styled.span`
  display: inline-block;
  padding: 3px 5px;
  background-color: #4f5459;
  border-radius: 2px;
  color: ${props => props.theme.background};
`;

export const StyledA = styled.a`
  text-decoration: none;
`;
