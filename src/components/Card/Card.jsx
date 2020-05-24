import styled from 'styled-components';
import { BORDER_COLOR, SHADOW_COLOR } from '../Theme/Theme';

const Card = styled.div`
  font-size: 16px;
  font-weight: 400;
  padding: 24px;
  background-color: white;
  min-width: 50px;
  min-height: 50px;
  border-radius: 4px;
  border-width: 1px;
  border-style: solid;
  border-color: ${BORDER_COLOR};
  box-shadow: ${SHADOW_COLOR} 0px 4px 12px 0px;
`;

export default Card;
