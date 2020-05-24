import styled, { css } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 95vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const MiddleContainer = styled.div`
  width: 350px;
  max-width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const Flex = styled.div`
  display: flex;

  ${({ justify }) =>
    justify &&
    css`
      justify-content: ${justify};
    `}

  ${({ align }) =>
    align &&
    css`
      align-items: ${align};
    `}
`;

export const Row = styled(Flex)`
  width: 100%;
  margin: 16px 0px;

  ${({ align }) =>
    css`
      align-items: ${align ?? 'center'};
    `}
`;

export const Column = styled(Flex)`
  flex-direction: column;

  ${({ width }) =>
    width &&
    css`
      width: ${width};
    `}
`;

export const Caption = styled.div`
  font-size: 12px;
  margin: 4px 0px;
`;
